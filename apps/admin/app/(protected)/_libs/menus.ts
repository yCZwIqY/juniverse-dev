'use server';

import { MenuRequest } from 'apis';
import api from '@/utils/api';
import { revalidateTag } from 'next/cache';
import { revalidateFront } from '@/lib/revalidate-front';

export const updateMenu = async (id: number, request: MenuRequest) => {
  const res = await api.patch(`/api/menus/${id}`, request);
  revalidateTag('menus:tree');
  revalidateTag('menus:flat');
  await revalidateFront(['menus:tree', 'menus:flat']);
  return res;
};

export const createMenu = async (request: MenuRequest) => {
  const res = await api.post('/api/menus', request);
  revalidateTag('menus:tree');
  revalidateTag('menus:flat');
  await revalidateFront(['menus:tree', 'menus:flat']);
  return res;
};

export const deleteMenu = async (id: number) => {
  const res = await api.del(`/api/menus/${id}`);
  revalidateTag('menus:tree');
  revalidateTag('menus:flat');
  await revalidateFront(['menus:tree', 'menus:flat']);
  return res;
};
