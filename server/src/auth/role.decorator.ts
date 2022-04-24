import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Actions, Features } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PermissionGuard } from './role.guard';

export const FEATURE_KEY = 'endpointFeature';
export const ACTION_KEY = 'endpointAction';
const skipAuth = process.env.CHRONICLE_SKIP_AUTH === 'YES';
export const Auth = (action: Actions, features: Features[]) =>
  applyDecorators(
    SetMetadata(FEATURE_KEY, features),
    SetMetadata(ACTION_KEY, action),
    ...(skipAuth ? [] : [UseGuards(JwtAuthGuard, PermissionGuard)]),
  );
