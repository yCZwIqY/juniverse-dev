import { postForm, remove } from './client/apiClient';
import { FileData } from 'shared-types';

export const postImage = (form: FormData) => postForm<FileData[]>('upload', form);
export const removeImage = (key: string) => remove<String>(`upload/${encodeURIComponent(key).toString()}`);
