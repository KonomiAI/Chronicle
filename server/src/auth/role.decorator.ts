import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Actions, Features } from './constants';
import { IPAllowlistGuard } from './ip.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PermissionGuard } from './role.guard';

export const FEATURE_KEY = 'endpointFeature';
export const ACTION_KEY = 'endpointAction';
export const Auth = (action: Actions, features: Features[]) =>
  applyDecorators(
    SetMetadata(FEATURE_KEY, features),
    SetMetadata(ACTION_KEY, action),
    UseGuards(JwtAuthGuard, IPAllowlistGuard, PermissionGuard),
  );
