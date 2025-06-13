export class SuccessResponse<T> {
  result: T;

  constructor(result: T) {
    this.result = result;
  }
}

export class ErrorResponse {
  errorCode: string;
  errorMsg: string;

  constructor(errorCode: string, errorMsg: string) {
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }
}
