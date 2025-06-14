import { Career } from 'shared-types';
import { get, post, put, remove } from './client/apiClient';

export const getAllCareers = () => get<Career[]>('careers');
export const getCareer = (id: string) => get<Career>(`careers/${id}`);
export const postCareer = (career: Career) => post<Career>('careers', career);
export const putCareer = (id: string, career: Career) => put<Career>(`careers/${id}`, career);
export const removeCareer = (id: string) => remove<Career>(`careers/${id}`);
