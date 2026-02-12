'use server';

import 'server-only';
import api from '../client/api';
import {
  BaseResponse,
  DashboardPopularPost,
  DashboardRecentComment,
  DashboardSummaryResponse,
  DashboardTrafficResponse,
} from '../client/model';

export const getDashboardSummary = async () => {
  try {
    const { data } = await api.get<BaseResponse<DashboardSummaryResponse>>(
      '/api/dashboard/summary',
      {},
      {
        next: { revalidate: 60, tags: ['dashboard-summary'] },
      },
    );
    return data;
  } catch {}
};

export const getDashboardTraffic = async (range: 'day' | 'week' | 'month' | 'year') => {
  try {
    const { data } = await api.get<BaseResponse<DashboardTrafficResponse>>(
      '/api/dashboard/traffic',
      { range },
      {
        next: { revalidate: 60, tags: [`dashboard-traffic:${range}`] },
      },
    );
    return data;
  } catch {}
};

export const getDashboardPopularPosts = async (range: 'day' | 'week' | 'month' | 'year', limit = 10) => {
  try {
    const { data } = await api.get<BaseResponse<DashboardPopularPost[]>>(
      '/api/dashboard/popular-posts',
      { range, limit },
      {
        next: { revalidate: 60, tags: [`dashboard-popular:${range}`] },
      },
    );
    return data;
  } catch {}
};

export const getDashboardRecentComments = async (limit = 5) => {
  try {
    const { data } = await api.get<BaseResponse<DashboardRecentComment[]>>(
      '/api/dashboard/recent-comments',
      { limit },
      {
        next: { revalidate: 60, tags: ['dashboard-comments'] },
      },
    );
    return data;
  } catch {}
};
