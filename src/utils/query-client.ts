import { defaultShouldDehydrateQuery, isServer, QueryClient } from '@tanstack/react-query';

const makeQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// 60 seconds
				staleTime: 60 * 1000,
				// staleTime: 0,
			},
			dehydrate: {
				// include pending queries in dehydration
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) || query.state.status === 'success',
			},
		},
	});
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) {
			browserQueryClient = makeQueryClient();
		}

		return browserQueryClient;
	}
};

export { getQueryClient, makeQueryClient };