import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Audit } from '@prisma/client';
import { AuditService } from './audit.service';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { Actions, Features } from 'src/auth/constants';
import { Auth } from 'src/auth/role.decorator';

@Controller('audit')
@UseInterceptors(TransformInterceptor)
export class AuditController {
  constructor(private service: AuditService) {}

  @Auth(Actions.READ, [Features.Security])
  @Get()
  getAudit(): Promise<Audit[]> {
    return this.service.getAudits({
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });
  }
}
