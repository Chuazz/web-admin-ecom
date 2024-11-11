import { Loading } from '@components/ui';
import { ReactQueryProvider } from '@providers/index';
import { Layout } from '@type/index';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
	title: process.env.APP_NAME,
};

const RootLayout = ({ children, params }: Layout) => {
	return (
		<html
			lang={params.lng}
			dir={dir(params.lng)}
		>
			<head />

			<body>
				<NuqsAdapter>
					<ReactQueryProvider>
						<SessionProvider>
							<Suspense fallback={<Loading show={true} />}>{children}</Suspense>

							<Toaster />
						</SessionProvider>
					</ReactQueryProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
};

export default RootLayout;
