'use server';
import api from '@/utils/api';
import { PostFormData, PostResponse } from 'apis';
import { revalidateTag } from 'next/cache';

export const getPost = async (id: string) => {
  try {
    return await api.get<PostResponse>(
      `/api/posts/${id}`,
      {},
      {
        cache: 'force-cache',
        next: { tags: [`post:${id ?? 0}`] },
      },
    );
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
