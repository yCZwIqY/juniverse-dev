import 'server-only';
import client from '../../http/client';
import type { MenuResponse, MenusResponse } from 'shared-types';

export const getMenuList = async (type = 'tree') => {
  try {
    return await client.get<MenusResponse>(
      `/api/menus?type=${type}`,
      {},
      { cache: 'force-cache', next: { tags: [`menus:${type}`], revalidate: 60 * 60 } },
    );
  } catch (error) {
    console.error('[apis] getMenuList failed', error);
  }
};

export const getMenu = async (menuId: number) => {
  try {
    if (!menuId) return null;
    return await client.get<MenuResponse>(`/api/menus/${menuId}`, {}, { next: { tags: [`menus:${menuId}`], revalidate: 60 * 60 * 24 } });
  } catch (error) {
    console.error('[apis] getMenu failed', error);
  }
};
