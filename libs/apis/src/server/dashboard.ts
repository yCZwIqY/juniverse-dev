'use server';

import 'server-only';
import client from '../http/client';
import type {
  BaseResponse,
  DashboardPopularPost,
  DashboardRecentComment,
  DashboardSummaryResponse,
  DashboardTrafficResponse,
} from 'shared-types';

export const getDashboardSummary = async () => {
  try {
    const { data } = await client.get<BaseResponse<DashboardSummaryResponse>>(
      '/api/dashboard/summary',
      {},
      {
        next: { revalidate: 60, tags: ['dashboard-summary'] },
      },
    );
    return data;
  } catch (error) {
    console.error('[apis] getDashboardSummary failed', error);
  }
};

export const getDashboardTraffic = async (range: 'day' | 'week' | 'month' | 'year') => {
  try {
    const { data } = await client.get<BaseResponse<DashboardTrafficResponse>>(
      '/api/dashboard/traffic',
      { range },
      {
        next: { revalidate: 60, tags: [`dashboard-traffic:${range}`] },
      },
    );
    return data;
  } catch (error) {
    console.error('[apis] getDashboardTraffic failed', error);
  }
};

export const getDashboardPopularPosts = async (range: 'day' | 'week' | 'month' | 'year', limit = 10) => {
  try {
    const { data } = await client.get<BaseResponse<DashboardPopularPost[]>>(
      '/api/dashboard/popular-posts',
      { range, limit },
      {
        next: { revalidate: 60, tags: [`dashboard-popular:${range}`] },
      },
    );
    return data;
  } catch (error) {
    console.error('[apis] getDashboardPopularPosts failed', error);
  }
};

export const getDashboardRecentComments = async (limit = 5) => {
  try {
    const { data } = await client.get<BaseResponse<DashboardRecentComment[]>>(
      '/api/dashboard/recent-comments',
      { limit },
      {
        next: { revalidate: 60, tags: ['dashboard-comments'] },
      },
    );
    return data;
  } catch (error) {
    console.error('[apis] getDashboardRecentComments failed', error);
  }
};
