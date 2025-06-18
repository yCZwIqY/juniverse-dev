import { get, post, put, remove } from './client/apiClient';
import { Blog, Comments } from 'shared-types';

export const getBlogs = () => get<Blog[]>('blogs');
export const getBlog = (id: string) => get<Blog>(`blogs/${id}`);
export const createBlog = (blog: Blog) => post<Blog>('blogs', blog);
export const updateBlog = (id: string, blog: Blog) => put<Blog>(`blogs/${id}`, blog);
export const removeBlog = (id: string) => post<Blog>(`blogs/${id}`);

export const createComment = (comment: Comments) => post<Comments>('blogs/comments', comment);
export const updateComment = (id: string, comment: Comments) => put<Comments>(`blogs/comments/${id}`, comment);
export const removeComment = (id: string, comment: Comments) => remove<Comments>(`blogs/comments/${id}`, comment);
