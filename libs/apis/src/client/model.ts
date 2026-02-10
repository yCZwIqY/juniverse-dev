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

// MENU
export interface MenuData {
  id: number;
  name: string;
  depth: number;
  seqNo: number;
  children: MenuData[];
}

export type MenusResponse = BaseResponse<MenuData[]>;
export type MenuResponse = BaseResponse<MenuData>;

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

//POST
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
};

export type CreateCommentRequest = {
  content: string;
  authorId: string;
  authorName: string;
};

//PROJECT
export interface ProjectData {
  id: number;
  title: string;
  description: string;
  position: string;
  contribution: string;
  content: string;
  startDate?: string;
  endDate?: string;
  tags: string[];
  gitHubUrl: string;
  demoUrl: string;
  imageUrls: string[];
  isToy: boolean;
  sourceCode?: Record<string, string>;
}

export type ProjectsResponse = PageResponse<ProjectData>;
export type ProjectResponse = BaseResponse<ProjectData>;

export type ProjectFormData = {
  title: string;
  description: string;
  position: string;
  contribution: string;
  content: string;
  startDate: string;
  endDate: string;
  tags: string[];
  gitHubUrl?: string;
  demoUrl?: string;
  images?: File[];
  imageUrls?: string[];
  isToy: boolean;
  sourceCode?: Record<string, string>;
};
