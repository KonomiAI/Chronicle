import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  Logger,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AUDITABLE_KEY } from 'src/auth/audit.decorator';
import { AuditService } from 'src/models/audit/audit.service';

export interface Response<T> {
  statusCode?: number;
  message?: string;
  data: T;
}

@Injectable()
export class AuditInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(AuditInterceptor.name);
  constructor(
    @Inject(AuditService) private readonly auditService: AuditService,
    private reflector: Reflector,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const isAuditable = this.reflector.getAllAndOverride<boolean>(
      AUDITABLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    return next.handle().pipe(
      // TODO: we should include the response body in the audit log
      tap(() => {
        if (isAuditable) {
          const { user, body, query, params } = context
            .switchToHttp()
            .getRequest();

          if (!user) {
            throw new NotFoundException(
              'Cannot determine user role as user is undefined',
            );
          }

          this.auditService
            .createAudit({
              endpointMethod: context.getHandler().name,
              payload: JSON.stringify(body),
              query: JSON.stringify(query),
              params: JSON.stringify(params),
              createdBy: {
                connect: {
                  id: user.id,
                },
              },
            })
            .catch(() => {
              this.logger.warn(
                `Failure to write into Audit table. UserID:${
                  user.id
                } attempted to access ${
                  context.getHandler().name
                } with query: ${JSON.stringify(
                  query,
                )}, params: ${JSON.stringify(params)}, body: ${JSON.stringify(
                  body,
                )}.`,
              );
            });
        }
      }),
    );
  }
}
