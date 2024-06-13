import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

export interface Response<T> {
  data: T;
}
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseTimeInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const start = Date.now();
    return next.handle().pipe(
      map((data) => {
        return { ...data, time: Date.now() - start };
      }),
    );
  }
}
