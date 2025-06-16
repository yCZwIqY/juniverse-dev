export interface SuccessResponse<T> {
  result: T;
}

export interface ErrorResponse {
  errorCode: string;
  errorMsg: string;
}

export interface FileData {
  key: string;
  src: string;
  name?: string;
}
