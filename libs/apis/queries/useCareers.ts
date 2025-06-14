import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllCareers, getCareer, postCareer, putCareer, removeCareer } from '../careers.api';
import { Career } from '@shared/career';

export const useCareers = () => {
  return useQuery({
    queryKey: ['career'],
    queryFn: getAllCareers,
  });
};

export const useCareer = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['career', id],
    queryFn: () => getCareer(id),
    enabled,
  });
};

export const useCreateCareer = () =>
  useMutation({
    mutationFn: (career: Career) => postCareer(career),
  });

export const useUpdateCareer = () =>
  useMutation({
    mutationFn: ({ id, career }: { id: string; career: Career }) => putCareer(id, career),
  });

export const useRemoveCareer = () =>
  useMutation({
    mutationFn: (id: string) => removeCareer(id),
  });
