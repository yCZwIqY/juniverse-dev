'use server';

import 'server-only';
import { revalidateTag } from 'next/cache';
import client from '../http/client';
import type { MenuRequest, MenuResponse, MenusResponse } from 'shared-types';

export const getMenuList = async (type = 'tree') => {
  try {
    return await client.get<MenusResponse>(
      `/api/menus?type=${type}`,
      {},
      {
        cache: 'force-cache',
        next: { tags: [`menus:${type}`], revalidate: 60 * 60 * 24 },
      },
    );
  } catch (error) {
    console.error('[apis] getMenuList failed', error);
  }
};

export const getMenu = async (menuId: number) => {
  try {
    if (!menuId) {
      return null;
    }
    return await client.get<MenuResponse>(`/api/menus/${menuId}`, {}, {
      next: {
        tags: [`menus:${menuId}`],
        revalidate: 60 * 60 * 24,
      },
    });
  } catch (error) {
    console.error('[apis] getMenu failed', error);
  }
};

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
