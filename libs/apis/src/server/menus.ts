'use server';

import { revalidateTag } from 'next/cache';
import api from '../client/api';
import { MenuRequest, MenuResponse, MenusResponse } from '../client';

export const getMenuList = async (type = 'tree') => {
  try {
    return await api.get<MenusResponse>(
      `/api/menus?type=${type}`,
      {},
      {
        cache: 'force-cache',
        next: { tags: [`menus:${type}`], revalidate: 60 * 60 * 24 },
      },
    );
  } catch {}
};

export const getMenu = async (menuId: number) => {
  try {
    if (!menuId) {
      return null;
    }
    return await api.get<MenuResponse>(`/api/menus/${menuId}`);
  } catch {}
};

export const updateMenu = async (id: number, request: MenuRequest) => {
  const res = await api.patch(`/api/menus/${id}`, request);
  revalidateTag('menus');
  return res;
};

export const createMenu = async (request: MenuRequest) => {
  const res = api.post('/api/menus', request);
  revalidateTag('menus');
  return res;
};
