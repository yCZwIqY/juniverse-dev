import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllTech, postTech, putTech, removeTech } from '../tech.api';
import { Tech } from 'shared-types';

export const useTech = () =>
  useQuery({
    queryKey: ['tech'],
    queryFn: getAllTech,
  });

export const useCreateTech = () =>
  useMutation({
    mutationFn: (tech: Tech) => postTech(tech),
  });

export const useUpdateTech = () =>
  useMutation({
    mutationFn: ({ id, tech }: { id: string; tech: Tech }) => putTech(id, tech),
  });

export const useDeleteTech = () =>
  useMutation({
    mutationFn: (id: string) => removeTech(id),
  });
