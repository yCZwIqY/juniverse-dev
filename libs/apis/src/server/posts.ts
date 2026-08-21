'use server';

import 'server-only';
import { revalidateTag } from 'next/cache';
import client from '../http/client';
import type { CreateCommentRequest, PostFormData, PostResponse, PostsResponse, RecentPostResponse } from 'shared-types';

export const getPosts = async (page: number, limit: number, menuId: number = 0, search: string = '', showAll = false) => {
  try {
    const { data } = await client.get<PostsResponse>(
      `/api/posts?page=${page}&limit=${limit}&menuId=${menuId}&q=${search}&showAll=${showAll}`,
      {},
      {
        next: {
          tags: ['posts'],
          revalidate: 300,
        },
      },
    );
    return data;
  } catch (error) {
    console.error('[apis] getPosts failed', error);
  }
};

export const getRecentPosts = async () => {
  try {
    const { data } = await client.get<RecentPostResponse>(
      `/api/posts/recent`,
      {},
      {
        next: {
          tags: ['recent-posts'],
          revalidate: 300,
        },
      },
    );
    return data;
  } catch (error) {
    console.error('[apis] getRecentPosts failed', error);
  }
};

export const getPost = async (id: string | number) => {
  try {
    return await client.get<PostResponse>(
      `/api/posts/${id}`,
      {},
      {
        next: { revalidate: 300, tags: [`post:${id ?? 0}`] },
      },
    );
  } catch (error) {
    console.error('[apis] getPost failed', error);
  }
};

export const increaseView = async (id: string | number) => {
  try {
    await client.post(`/api/posts/${id}/views`);
    revalidateTag(`post:${id}`);
  } catch (error) {
    console.error('[apis] increaseView failed', error);
  }
};

export const createPost = async (post: PostFormData) => {
  try {
    const res = await client.post('/api/posts', post);
    revalidateTag('posts');
    return res;
  } catch (error) {
    console.error('[apis] createPost failed', error);
  }
};

export const updatePost = async (id: string, post: PostFormData) => {
  try {
    const res = await client.patch(`/api/posts/${id}`, post);
    revalidateTag('posts');
    revalidateTag(`post:${id}`);
    return res;
  } catch (error) {
    console.error('[apis] updatePost failed', error);
  }
};

export const deletePost = async (id: string) => {
  try {
    const res = await client.del(`/api/posts/${id}`);
    revalidateTag('posts');
    return res;
  } catch (error) {
    console.error('[apis] deletePost failed', error);
  }
};

export const createComment = async (id: string | number, request: CreateCommentRequest) => {
  try {
    const res = await client.post(`/api/posts/${id}/comments`, request);
    revalidateTag('posts');
    revalidateTag(`post:${id}`);
    return res;
  } catch (error) {
    console.error('[apis] createComment failed', error);
  }
};

export const deleteComment = async (postId: string | number, id: string | number) => {
  try {
    const res = await client.del(`/api/posts/${postId}/comments/${id}`);
    revalidateTag('posts');
    revalidateTag(`post:${postId}`);
    return res;
  } catch (error) {
    console.error('[apis] deleteComment failed', error);
  }
};
