import { useQuery } from '@tanstack/react-query';
import { getUser } from '../index';

export const useUser = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => getUser(),
  });

export * from './useTech';
export * from './useCareers';
export * from './useUpload';
export * from './useProject';
export * from './useBlog';
