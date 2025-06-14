import { get, post, put, remove } from './client/apiClient';
import { Tech } from '@shared/tech';

export const getAllTech = () => get<Tech[]>('tech');
export const postTech = (tech: Tech) => post<Tech>('tech', tech);
export const putTech = (id: string, tech: Tech) => put<Tech>(`tech/${id}`, tech);
export const removeTech = (id: string) => remove<Tech>(`tech/${id}`);
