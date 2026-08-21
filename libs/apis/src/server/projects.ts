'use server';

import 'server-only';
import { revalidateTag } from 'next/cache';
import client from '../http/client';
import type { ProjectFormData, ProjectResponse, ProjectsResponse } from 'shared-types';

export const getProjects = async () => {
  try {
    const { data } = await client.get<ProjectsResponse>(
      '/api/projects',
      {},
      {
        next: {
          tags: ['projects'],
          revalidate: 300,
        },
      },
    );
    if (Array.isArray(data)) {
      return {
        items: data,
        page: 1,
        limit: data.length,
        total: data.length,
      };
    }
    return data;
  } catch (error) {
    console.error('[apis] getProjects failed', error);
  }
};

export const getProject = async (id: string | number) => {
  try {
    if (!id) {
      return null;
    }
    return await client.get<ProjectResponse>(
      `/api/projects/${id}`,
      {},
      {
        cache: 'force-cache',
        next: { revalidate: 60 * 60, tags: [`project:${id}`] },
      },
    );
  } catch (error) {
    console.error('[apis] getProject failed', error);
  }
};

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
