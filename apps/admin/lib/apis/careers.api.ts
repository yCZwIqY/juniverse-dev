import { get, post } from '@/lib/apis/client/apiClient';
import { Career } from 'shared-types/src';

export const getAllCareers = () => get<Career>('careers');

export const postCareers = (career: Career) => post<Career>('careers', career);
