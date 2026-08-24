import 'server-only';
import client from '../../http/client';
import type { ProjectResponse, ProjectsResponse } from 'shared-types';

export const getProjects = async () => {
  try {
    const { data } = await client.get<ProjectsResponse>(
      '/api/projects',
      {},
      { next: { tags: ['projects'], revalidate: 300 } },
    );
    if (Array.isArray(data)) {
      return { items: data, page: 1, limit: data.length, total: data.length };
    }
    return data;
  } catch (error) {
    console.error('[apis] getProjects failed', error);
  }
};

export const getProject = async (id: string | number) => {
  try {
    if (!id) return null;
    return await client.get<ProjectResponse>(
      `/api/projects/${id}`,
      {},
      { cache: 'force-cache', next: { revalidate: 60 * 60, tags: [`project:${id}`] } },
    );
  } catch (error) {
    console.error('[apis] getProject failed', error);
  }
};
