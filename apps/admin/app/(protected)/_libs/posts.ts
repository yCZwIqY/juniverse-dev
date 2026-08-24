'use server';

import { createPost as _createPost, updatePost as _updatePost, deletePost as _deletePost } from 'apis/actions';
import type { PostFormData } from 'apis';
import { revalidateFront } from '@/lib/revalidate-front';

export const createPost = async (post: PostFormData) => {
  const res = await _createPost(post);
  await revalidateFront(['posts', 'recent-posts']);
  return res;
};

export const updatePost = async (id: string, post: PostFormData) => {
  const res = await _updatePost(id, post);
  await revalidateFront(['posts', 'recent-posts', `post:${id}`]);
  return res;
};

export const deletePost = async (id: string) => {
  const res = await _deletePost(id);
  await revalidateFront(['posts', 'recent-posts', `post:${id}`]);
  return res;
};
