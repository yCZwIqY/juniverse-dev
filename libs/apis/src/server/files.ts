'use server';

import 'server-only';
import client from '../http/client';
import type { FileRefType, ListFilesResponse, RemoveFileResponse, UploadFileResponse } from 'shared-types';

export const uploadFile = async (file: File, refType: FileRefType, refId: number, displayName?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  return client.postFormdata<UploadFileResponse>('/api/files/upload', formData, {
    refType,
    refId,
    displayName,
  });
};

export const listFiles = async (refType: FileRefType, refId: number) => {
  return client.get<ListFilesResponse>('/api/files', { refType, refId });
};

export const removeFile = async (id: number) => {
  return client.del<RemoveFileResponse>(`/api/files/${id}`);
};
