import { getAuth } from './client/apiClient';

export const getUser = () => getAuth('auth/profile');

export * from './careers.api';
export * from './tech.api';
export * from './queries';
export * from './blog.api';
