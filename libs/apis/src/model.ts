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

export interface MenuData {
  id: number;
  name: string;
  depth: number;
  seqNo: number;
  children: MenuData[];
}

export type MenusResponse = BaseResponse<MenuData[]>;

export interface SelectedMenuData extends MenuData {
  parent?: MenuData;
}

export interface MenuRequest {
  name: string;
  parentId?: number;
}

export const defaultSelectedMenuData: SelectedMenuData = {
  id: 0,
  depth: 0,
  seqNo: 0,
  name: '',
  children: [],
  parent: undefined,
};
