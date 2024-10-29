import { routes } from '@configs/routes';
import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
	jwt: {
		maxAge: 60 * 60 * 24 * 30,
	},
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

			return { ...user, ...token };
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					access_token: token.access_token,
					branch_token: token.branch_token,
					company_info: token.company_info,
					permissions: token.permissions,
					profile: token.profile,
					roles: token.roles,
				} as User,
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
				access_token: {},
				branch_token: {},
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
