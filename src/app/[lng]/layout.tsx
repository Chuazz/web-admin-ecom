import { ReactQueryProvider } from '@providers/react-query-provider';
import { Layout } from '@type/index';
import { dir } from 'i18next';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
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
				<SessionProvider>
					<ReactQueryProvider>
						{children}

						<Toaster />
					</ReactQueryProvider>
				</SessionProvider>
			</body>
		</html>
	);
};

export default RootLayout;
