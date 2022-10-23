import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuditService } from 'src/models/audit/audit.service';
import { AUDITABLE_KEY } from './audit.decorator';

@Injectable()
export class AuditGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private auditService: AuditService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isAuditable = this.reflector.getAllAndOverride<boolean>(
      AUDITABLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isAuditable) {
      const { user, body, query } = context.switchToHttp().getRequest();

      if (!user) {
        throw new UnauthorizedException(
          'Cannot determine user role as user is undefined',
        );
      }

      this.auditService.createAudit({
        endpointMethod: context.getHandler().name,
        payload: JSON.stringify(body),
        params: JSON.stringify(query),
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      });
    }

    return true;
  }
}
