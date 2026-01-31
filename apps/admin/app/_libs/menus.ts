'use server';

import { MenuRequest, MenusResponse } from '@/app/menus/_models/menu';
import api from '@/utils/api';
import { revalidateTag } from 'next/cache';

export const getMenuList = async () => {
  try {
    return await api.get<MenusResponse>(`/api/menus`, {
      method: 'GET',
      cache: 'force-cache',
      next: { tags: ['menus'] },
    });
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
