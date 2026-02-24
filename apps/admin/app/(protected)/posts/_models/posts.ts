import { MenuData } from '@/app/(protected)/menus/_models/menu';
import { BaseResponse, PageResponse } from '@/app/(protected)/_models/common';

export interface CommentData {
  id: number;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostData {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  menuId: number;
  menu: MenuData;
  tags: string[];
  comments: CommentData[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export type PostsResponse = PageResponse<PostData>;
export type PostResponse = BaseResponse<PostData>;

export type PostFormData = {
  title: string;
  subtitle: string;
  content: string;
  menuId: number;
  tags: string[];
};
