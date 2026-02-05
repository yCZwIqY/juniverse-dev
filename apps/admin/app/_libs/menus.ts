'use server';

import { MenuRequest } from '@/app/menus/_models/menu';
import api from '@/utils/api';
import { revalidateTag } from 'next/cache';

export const updateMenu = async (id: number, request: MenuRequest) => {
  const res = await api.patch(`/api/menus/${id}`, request);
  revalidateTag('menus:tree');
  revalidateTag('menus:flat');
  return res;
};

export const createMenu = async (request: MenuRequest) => {
  const res = api.post('/api/menus', request);
  revalidateTag('menus:tree');
  revalidateTag('menus:flat');
  return res;
};
