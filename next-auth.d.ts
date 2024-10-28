import { CompanyInfo, User } from '@type/index';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			accessToken: string;
			branchToken: string;
			profile: User;
			roles: sting[];
			permissions: string[];
			company_info: CompanyInfo;
		} & DefaultSession['user'];
	}
}
