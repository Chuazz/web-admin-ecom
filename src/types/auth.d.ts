export type LoginResponse = {
	access_token: string;
	expired_at: number;
};

export type SelectBranchResponse = {
	branch_token: string;
	expired_at: number;
	user: User;
	roles: string[];
	permissions: string[];
	company_info: CompanyInfo;
};

export type User = {
	id: number;
	name: string;
	avatar: string;
	gender: string;
	date_of_birth: string;
	email_verified_at: string;
	phone_number_verified: number;
	presenter_id: number;
	created_at: string;
	__version: string;
};

export type CompanyInfo = {
	id: number;
	short_name: string;
	name: string;
	name_en: string;
	logo: string;
	address: string;
	status: string;
	created_at: string;
	updated_at: string;
};
