import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllTech, postTech } from '../tech.api';
import { Tech } from '@shared/tech';

export const useTech = () =>
  useQuery({
    queryKey: ['tech'],
    queryFn: getAllTech,
  });

export const useCreateTech = () =>
  useMutation({
    mutationFn: (tech: Tech) => postTech(tech),
  });
