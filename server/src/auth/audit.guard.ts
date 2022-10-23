import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuditService } from 'src/models/audit/audit.service';
import { AUDITABLE_KEY } from './audit.decorator';

@Injectable()
export class AuditGuard implements CanActivate {
  private readonly logger = new Logger(AuditGuard.name);
  constructor(
    @Inject(AuditService) private readonly auditService: AuditService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isAuditable = this.reflector.getAllAndOverride<boolean>(
      AUDITABLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isAuditable) {
      const { user, body, query, params } = context.switchToHttp().getRequest();

      if (!user) {
        throw new UnauthorizedException(
          'Cannot determine user role as user is undefined',
        );
      }

      try {
        this.auditService.createAudit({
          endpointMethod: context.getHandler().name,
          payload: JSON.stringify(body),
          query: JSON.stringify(query),
          params: JSON.stringify(params),
          createdBy: {
            connect: {
              id: user.id,
            },
          },
        });
      } catch (e) {
        this.logger.warn(
          `Failure to write into Audit table. UserID:${
            user.id
          } attempted to access ${
            context.getHandler().name
          } with query: ${JSON.stringify(query)}, params: ${JSON.stringify(
            params,
          )}, body: ${JSON.stringify(body)}.`,
        );
      }
    }

    return true;
  }
}
