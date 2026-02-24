export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export type PageResponse<T> = BaseResponse<
  Pagination & {
    items: T[];
  }
>;
