import { get, post, put, remove } from './client/apiClient';
import { Project } from 'shared-types';

export const getAllProjects = (params?: {}) => get<Project[]>('projects', params);
export const getProject = (id: string) => get<Project>(`projects/${id}`);
export const postProject = (project: Project) => post<Project>('projects', project);
export const updateProject = (id: string, project: Project) => put<Project>(`projects/${id}`, project);
export const removeProject = (id: string) => remove<Project>(`projects/${id}`);
