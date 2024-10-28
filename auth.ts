import { routes } from '@configs/routes';
import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth;
		},
		async jwt({ token, user, trigger, session }) {
			if (trigger === 'update') {
				token = {
					...token,
					...session,
				};
			}

			return { ...token, ...user };
		},
		async session({ session, token }) {
			return {
				...session,
				user: token,
			};
		},
	},
	pages: {
		signIn: routes['login'],
		signOut: routes['login'],
	},
	providers: [
		Credentials({
			credentials: {
				accessToken: {},
				branchToken: {},
				profile: {},
				roles: {},
				permissions: {},
				company_info: {},
			},
			authorize: async (credentials) => {
				return credentials as User;
			},
		}),
	],
});
