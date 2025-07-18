import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllProjects, getProject, postProject, removeProject, updateProject } from '../project.api';
import { Project } from 'shared-types';

export const useProjects = (params?: { [key: string]: string }) => {
  return useQuery({
    queryKey: ['project', params],
    queryFn: () => getAllProjects(params),
  });
};

export const useProject = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['career', id],
    queryFn: () => getProject(id),
    enabled,
  });
};

export const useCreateProject = () =>
  useMutation({
    mutationFn: (project: Project) => postProject(project),
  });

export const useUpdateProject = () =>
  useMutation({
    mutationFn: ({ id, project }: { id: string; project: Project }) => updateProject(id, project),
  });

export const useRemoveProject = () =>
  useMutation({
    mutationFn: (id: string) => removeProject(id),
  });
