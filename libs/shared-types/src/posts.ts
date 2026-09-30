import type { BaseResponse, PageResponse } from './common';
import type { MenuData } from './menus';

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
  status: 'PUBLISH' | 'DRAFT';
}

export type PostsResponse = PageResponse<PostData>;
export type PostResponse = BaseResponse<
  PostData & {
    next: Partial<PostData>;
    prev: Partial<PostData>;
  }
>;
export type RecentPostResponse = BaseResponse<PostData[]>;

export type PostFormData = {
  title: string;
  subtitle: string;
  content: string;
  menuId: number;
  tags: string[];
  status: 'PUBLISH' | 'DRAFT';
};

export type CreateCommentRequest = {
  content: string;
  authorId: string;
  authorName: string;
};
