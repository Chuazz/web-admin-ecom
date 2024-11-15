type Extra = {
	usage: unknown;
	package: Package;
	sold_qty: number;
	total_reviews: number;
};

type Package = {
	width: unknown;
	height: unknown;
	length: unknown;
	weight: unknown;
};

export type Product = {
	id: number;
	branch_id: number;
	mall_id: unknown;
	product_category_id: number;
	code: string;
	internal_code: string;
	name: string;
	short_description: unknown;
	description: string;
	type: string;
	image: string;
	images: string[];
	status: string;
	created_at: string;
	updated_at: string;
	price: number;
	tent_capacity_from: unknown;
	tent_capacity_to: unknown;
	properties: unknown[];
	is_include_gate_ticket: boolean;
	is_shift_price: boolean;
	location: unknown;
	extra: Extra;
	is_stock: boolean;
	is_for_cooking: boolean;
	unit_id: number;
	multi_units: unknown[];
	parent_id: unknown;
	options: unknown;
	product_type: string;
	accessories: unknown;
	is_default: unknown;
	toppings: unknown;
	combos: unknown[];
	is_combo: boolean;
	services: unknown;
	branch_area_id: number;
	product_industry_id: number;
	product_origin_id: number;
	is_typical_product: boolean;
	is_service: boolean;
	is_return_allowed: boolean;
	product_brand_id: number;
	manufacturer_id: number;
	is_selling_product: boolean;
	is_new_product: boolean;
	youtube_url: unknown;
	is_affiliate_product: boolean;
	rating: string;
	quantity: number;
	course_id: unknown;
	user_id: unknown;
	processing_status: unknown;
	document_file_id: unknown;
	is_document: boolean;
	quantity_being_sold: number;
	quantity_delivered: number;
	is_enable_listing: boolean;
	status_name: string;
	type_name: string;
	location_formatted: unknown;
	processing_status_name: unknown;
};
