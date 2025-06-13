import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const error =
      typeof exceptionResponse === 'string'
        ? { errorCode: status.toString(), errorMsg: exceptionResponse }
        : {
            errorCode: exceptionResponse.error || status.toString(),
            errorMsg: exceptionResponse.message || 'Unknown error',
          };

    response.status(status).json(error);
  }
}
