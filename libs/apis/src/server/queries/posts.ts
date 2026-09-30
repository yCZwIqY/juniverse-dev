import 'server-only';
import client from '../../http/client';
import type { PostResponse, PostsResponse, RecentPostResponse } from 'shared-types';

export const getPosts = async (page: number, limit: number, menuId: number = 0, search: string = '', showAll = false) => {
  try {
    const { data } = await client.get<PostsResponse>(
      `/api/posts?page=${page}&limit=${limit}&menuId=${menuId}&q=${search}&showAll=${showAll}`,
      {},
      { next: { tags: ['posts'], revalidate: 300 } },
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
      { next: { tags: ['recent-posts'], revalidate: 300 } },
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
      { next: { revalidate: 300, tags: [`post:${id ?? 0}`] } },
    );
  } catch (error) {
    console.error('[apis] getPost failed', error);
  }
};
