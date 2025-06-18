import { useMutation, useQuery } from '@tanstack/react-query';
import { createBlog, getBlog, getBlogs, removeBlog, updateBlog } from '../blog.api';
import { Blog } from 'shared-types';

export const useBlogs = () =>
  useQuery({
    queryKey: ['blog'],
    queryFn: getBlogs,
  });

export const useBlog = (id: string, enabled: boolean) =>
  useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id),
    enabled,
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
