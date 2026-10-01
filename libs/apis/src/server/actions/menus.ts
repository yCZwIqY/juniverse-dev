'use server';

import { revalidateTag } from 'next/cache';
import client from '../../http/client';
import type { MenuRequest } from 'shared-types';

export const createMenu = async (request: MenuRequest) => {
  try {
    const res = await client.post('/api/menus', request);
    revalidateTag('menus:tree');
    revalidateTag('menus:flat');
    return res;
  } catch (error) {
    console.error('[apis] createMenu failed', error);
  }
};

export const updateMenu = async (id: number, request: MenuRequest) => {
  try {
    const res = await client.patch(`/api/menus/${id}`, request);
    revalidateTag('menus:tree');
    revalidateTag('menus:flat');
    revalidateTag(`menus:${id}`);
    return res;
  } catch (error) {
    console.error('[apis] updateMenu failed', error);
  }
};

export const deleteMenu = async (id: number) => {
  try {
    const res = await client.del(`/api/menus/${id}`);
    revalidateTag('menus:tree');
    revalidateTag('menus:flat');
    revalidateTag(`menus:${id}`);
    return res;
  } catch (error) {
    console.error('[apis] deleteMenu failed', error);
  }
};
