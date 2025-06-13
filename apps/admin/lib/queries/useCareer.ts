import { useQuery } from '@tanstack/react-query';
import { getAllCareers } from '@/lib/apis/careers.api';

export const useCareer = () => {
  return useQuery({
    queryKey: ['career'],
    queryFn: getAllCareers,
  });
};
