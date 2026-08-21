import type { BaseResponse } from './common';

export type FileRefType = 'post' | 'user' | 'comment' | 'project';

export interface FileAssetData {
  id: number;
  refType: FileRefType;
  refId: number;
  key: string;
  url: string;
  mimeType: string;
  size: number;
  originalName: string | null;
  displayName: string | null;
  createdAt: string;
}

export type UploadFileResponse = BaseResponse<FileAssetData>;
export type ListFilesResponse = BaseResponse<FileAssetData[]>;
export type RemoveFileResponse = BaseResponse<{ ok: boolean }>;
