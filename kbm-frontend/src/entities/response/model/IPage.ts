interface ISort {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}

interface IPageable {
	pageNumber: number;
	pageSize: number;
	offset: number;
	unpaged: boolean;
	paged: boolean;
	sort: ISort;
}

export interface IPage<T> {
	content: T[];
	pageable: IPageable;
	last: boolean;
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	sort: ISort;
	first: boolean;
	numberOfElements: number;
	empty: boolean;
}