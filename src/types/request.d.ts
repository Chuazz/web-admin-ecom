export type Meta = {
	current_page: number;
	previous_page: number;
	next_page: number;
	limit: number;
	total_item: number;
	total_page: number;
};

export type Response<T = unknown> = {
	data: T | null;
	message: string;
	success: boolean;
	meta: Meta | null;
	status: number;
};
