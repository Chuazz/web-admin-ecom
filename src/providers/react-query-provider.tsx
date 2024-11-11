'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';
import { getQueryClient } from '../utils/query-client';

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export { ReactQueryProvider };
