'use server';

import { revalidateTag } from 'next/cache';
import client from '../../http/client';
import type { ProjectFormData } from 'shared-types';

const buildProjectFormData = (request: ProjectFormData) => {
  const formData = new FormData();
  Object.entries(request).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === 'images' && Array.isArray(value)) {
      value.forEach((file) => formData.append('images', file));
      return;
    }
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
      return;
    }
    if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
      return;
    }
    formData.append(key, String(value));
  });
  return formData;
};

export const createProject = async (request: ProjectFormData) => {
  try {
    const formData = buildProjectFormData(request);
    const res = await client.postFormdata(`/api/projects`, formData);
    revalidateTag('projects');
    return res;
  } catch (error) {
    console.error('[apis] createProject failed', error);
  }
};

export const updateProject = async (id: string | number, request: ProjectFormData) => {
  try {
    const formData = buildProjectFormData(request);
    const res = await client.patchFormdata(`/api/projects/${id}`, formData);
    revalidateTag('projects');
    revalidateTag(`project:${id}`);
    return res;
  } catch (error) {
    console.error('[apis] updateProject failed', error);
  }
};

export const deleteProject = async (id: string | number) => {
  try {
    const res = await client.del(`/api/projects/${id}`);
    revalidateTag('projects');
    revalidateTag(`project:${id}`);
    return res;
  } catch (error) {
    console.error('[apis] deleteProject failed', error);
  }
};
