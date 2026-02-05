'use server';

import { CreateCommentRequest } from 'apis';
import api from 'apis/dist/client/api';
import { revalidateTag } from 'next/cache';

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
    const res = await api.del(`/api/posts/${postId}/comments/${id}`);
    revalidateTag('posts');
    revalidateTag(`post:${postId}`);
    return res;
  } catch {}
};
