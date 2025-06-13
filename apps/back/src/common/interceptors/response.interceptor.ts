import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, { result: T }>
{
  intercept(_: ExecutionContext, next: CallHandler): Observable<{ result: T }> {
    return next.handle().pipe(map((data) => ({ result: data })));
  }
}
