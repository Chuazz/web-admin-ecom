import { CompanyInfo, User } from '@type/index';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			access_token: string;
			branch_token: string;
			profile: User;
			roles: sting[];
			permissions: string[];
			company_info: CompanyInfo;
		} & DefaultSession['user'];
	}
}
