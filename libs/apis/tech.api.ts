import { get, post } from './client/apiClient';
import { Tech } from '@shared/tech';

export const getAllTech = () => get<Tech[]>('tech');
export const postTech = (tech: Tech) => post<Tech>('tech', tech);
