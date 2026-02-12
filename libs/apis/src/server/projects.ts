'use server';

import 'server-only';
import { revalidateTag } from 'next/cache';
import api from '../client/api';
import { ProjectFormData, ProjectResponse, ProjectsResponse } from '../client';

export const getProjects = async () => {
  try {
    const { data } = await api.get<ProjectsResponse>(
      '/api/projects',
      {},
      {
        next: {
          tags: ['projects'],
          revalidate: 60 * 60,
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
  } catch {}
};

export const getProject = async (id: string | number) => {
  try {
    if (!id) {
      return null;
    }
    return await api.get<ProjectResponse>(
      `/api/projects/${id}`,
      {},
      {
        cache: 'force-cache',
        next: { revalidate: 60 * 60, tags: [`project:${id}`] },
      },
    );
  } catch {}
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

export const updateProject = async (id: string | number, request: ProjectFormData) => {
  try {
    const formData = buildProjectFormData(request);
    const res = await api.patchFormdata(`/api/projects/${id}`, formData);
    revalidateTag('projects');
    revalidateTag(`project:${id}`);
    return res;
  } catch {}
};

export const createProject = async (request: ProjectFormData) => {
  try {
    const formData = buildProjectFormData(request);
    const res = await api.postFormdata(`/api/projects`, formData);
    revalidateTag('projects');
    return res;
  } catch {}
};

export const deleteProject = async (id: string | number) => {
  try {
    const res = await api.del(`/api/projects/${id}`);
    revalidateTag('projects');
    revalidateTag(`project:${id}`);
    return res;
  } catch {}
};
