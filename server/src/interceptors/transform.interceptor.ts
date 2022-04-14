import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const DEFAULT_MESSAGES = {
  200: 'SUCCESS',
  404: 'NOTFOUND',
  500: 'ERROR',
};

export interface Response<T> {
  statusCode?: number;
  message?: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((response) => {
        if (response === null || response === undefined) {
          throw new NotFoundException();
        }
        const statusCode =
          response?.statusCode ||
          context.switchToHttp().getResponse().statusCode;
        const message = response.message || DEFAULT_MESSAGES[statusCode] || '';

        return {
          statusCode,
          message,
          data: response.data || response,
        };
      }),
    );
  }
}
