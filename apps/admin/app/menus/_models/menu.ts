import { BaseResponse } from '@/app/_models/common';

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
