type Option = {
	list: List[];
	name: string;
	sort: string;
	type: string;
	is_active: boolean;
};

type List = {
	name: string;
	sort: any;
};

export type ProductCategory = {
	id: number;
	mall_id: any;
	parent_id: any;
	parent_path: string;
	path: string;
	level: number;
	code: string;
	internal_code: string;
	name: string;
	short_description: any;
	description: any;
	image: string;
	type: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	properties: any[];
	options: Option[];
	branch_id: number;
	is_highlight: boolean;
	sort: string;
	product_industry_id: number;
	icon: string;
	parent_code: any;
	parent: any;
};
