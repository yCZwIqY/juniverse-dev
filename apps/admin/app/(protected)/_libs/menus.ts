'use server';

import { createMenu as _createMenu, updateMenu as _updateMenu, deleteMenu as _deleteMenu } from 'apis/actions';
import type { MenuRequest } from 'apis';
import { revalidateFront } from '@/lib/revalidate-front';

export const createMenu = async (request: MenuRequest) => {
  const res = await _createMenu(request);
  await revalidateFront(['menus:tree', 'menus:flat']);
  return res;
};

export const updateMenu = async (id: number, request: MenuRequest) => {
  const res = await _updateMenu(id, request);
  await revalidateFront(['menus:tree', 'menus:flat']);
  return res;
};

export const deleteMenu = async (id: number) => {
  const res = await _deleteMenu(id);
  await revalidateFront(['menus:tree', 'menus:flat']);
  return res;
};
