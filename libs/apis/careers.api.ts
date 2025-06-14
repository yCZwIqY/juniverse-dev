import { Career } from '@shared/career';
import { get, post, put } from './client/apiClient';

export const getAllCareers = () => get<Career[]>('careers');
export const getCareer = (id: string) => get<Career>(`careers/${id}`);
export const postCareer = (career: Career) => post<Career>('careers', career);
export const putCareer = (id: string, career: Career) => put<Career>(`careers/${id}`, career);
