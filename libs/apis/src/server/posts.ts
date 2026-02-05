'use server';

import 'server-only';
import api from '../client/api';
import { CreateCommentRequest, PostFormData, PostResponse, PostsResponse, RecentPostResponse } from '../client/model';
import { revalidateTag } from 'next/cache';

export const getPosts = async (page: number, limit: number, menuId?: number, search?: string) => {
  try {
    const { data } = await api.get<PostsResponse>(
      `/api/posts?page=${page}&limit=${limit}&menuId=${menuId}&q=${search}`,
      {},
      {
        next: {
          tags: ['posts'],
          revalidate: 60,
        },
      },
    );
    return data;
  } catch {}
};

export const getRecentPosts = async () => {
  try {
    const { data } = await api.get<RecentPostResponse>(
      `/api/posts/recent`,
      {},
      {
        next: {
          tags: ['recent-posts'],
          revalidate: 60,
        },
      },
    );
    return data;
  } catch {}
};

export const getPost = async (id: string | number) => {
  try {
    return await api.get<PostResponse>(
      `/api/posts/${id}`,
      {},
      {
        cache: 'force-cache',
        next: { revalidate: 60, tags: [`post:${id ?? 0}`] },
      },
    );
  } catch {}
};

export const increaseView = async (id: string | number) => {
  try {
    await api.post(`/api/posts/${id}/views`);
    revalidateTag(`post:${id}`);
  } catch {}
};

export const createPost = async (post: PostFormData) => {
  try {
    const res = await api.post('/api/posts', post);
    revalidateTag('posts');
    return res;
  } catch {}
};

export const updatePost = async (id: string, post: PostFormData) => {
  try {
    const res = await api.patch(`/api/posts/${id}`, post);
    revalidateTag('posts');
    revalidateTag(`post:${id}`);
    return res;
  } catch {}
};

export const deletePost = async (id: string) => {
  try {
    const res = await api.del(`/api/posts/${id}`);
    revalidateTag('posts');
    return res;
  } catch {}
};

export const createComment = async (id: string | number, request: CreateCommentRequest) => {
  try {
    const res = await api.post(`/api/posts/${id}/comments`, request);
    revalidateTag('posts');
    revalidateTag(`post:${id}`);
    return res;
  } catch {}
};

export const deleteComment = async (postId: string | number, id: string | number) => {
  try {
    const res = await api.del(`/api/posts/${id}/comments/${id}`);
    revalidateTag('posts');
    revalidateTag(`post:${id}`);
    return res;
  } catch {}
};
