import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest<Request | undefined>();
      const acceptHeader =
        request && typeof request.headers?.accept === 'string'
          ? request.headers.accept
          : '';

      // Keep SSE stream payloads untouched.
      if (acceptHeader.includes('text/event-stream')) {
        return next.handle() as Observable<ApiResponse<T>>;
      }
    }

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: 'OK',
        data,
      })),
    );
  }
}
