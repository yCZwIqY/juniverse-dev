import { useMutation, useQuery } from '@tanstack/react-query';
import { createBlog, getBlog, getBlogs, removeBlog, updateBlog } from '../blog.api';
import { Blog } from 'shared-types';

export const useBlogs = (params?: { [key: string]: string }) =>
  useQuery({
    queryKey: ['blog', params],
    queryFn: () => getBlogs(params),
  });

export const useBlog = (id: string, enabled: boolean) =>
  useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

export const useCreateBlog = () =>
  useMutation({
    mutationFn: (blog: Blog) => createBlog(blog),
  });

export const useUpdateBlog = (id: string) =>
  useMutation({
    mutationFn: (blog: Blog) => updateBlog(id, blog),
  });

export const useRemoveBlog = () =>
  useMutation({
    mutationFn: (id: string) => removeBlog(id),
  });
