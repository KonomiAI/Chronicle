import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuditGuard } from './audit.guard';

export const AUDITABLE_KEY = 'endpointAuditable';

export const Auditable = () =>
  applyDecorators(
    SetMetadata(AUDITABLE_KEY, true),
    UseGuards(JwtAuthGuard, AuditGuard),
  );
