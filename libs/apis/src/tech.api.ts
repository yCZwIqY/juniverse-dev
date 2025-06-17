import { get, post, put, remove } from './client/apiClient';
import { Tech } from 'shared-types';

export const getAllTech = () => get<Tech[]>('techs');
export const postTech = (tech: Tech) => post<Tech>('techs', tech);
export const putTech = (id: string, tech: Tech) => put<Tech>(`techs/${id}`, tech);
export const removeTech = (id: string) => remove<Tech>(`techs/${id}`);
