'use server';

import { createProject as _create, updateProject as _update, deleteProject as _delete } from 'apis';
import type { ProjectFormData } from 'apis';
import { revalidateFront } from '@/lib/revalidate-front';

export const createProject = async (data: ProjectFormData) => {
  const res = await _create(data);
  await revalidateFront(['projects']);
  return res;
};

export const updateProject = async (id: string | number, data: ProjectFormData) => {
  const res = await _update(id, data);
  await revalidateFront(['projects', `project:${id}`]);
  return res;
};

export const deleteProject = async (id: string | number) => {
  const res = await _delete(id);
  await revalidateFront(['projects', `project:${id}`]);
  return res;
};
