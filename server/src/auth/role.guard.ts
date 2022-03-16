import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Actions, Features } from './constants';
import { ACTION_KEY, FEATURE_KEY } from './role.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredFeatures = this.reflector.getAllAndOverride<Features[]>(
      FEATURE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredAction = this.reflector.getAllAndOverride<Actions>(
      ACTION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredFeatures) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException(
        'Cannot determine user role as user is undefined',
      );
    }

    return this.checkIfUserHasAccess(user, requiredFeatures, requiredAction);
  }

  private checkIfUserHasAccess(
    user: any,
    features: Features[],
    action: Actions,
  ): boolean {
    if (user.isSuperUser) {
      return true;
    }

    if (user.isSuspended) {
      return false;
    }

    for (const f of features) {
      for (const role of user.roles) {
        const { permissions } = role;
        const perm = permissions[f];
        // If this permission is undefined then the user does not have it
        if (!perm) {
          continue;
        }
        // If user has write permission to the feature in any role
        if (perm.write) {
          return true;
        }
        // If the action is read and the user has read permission in a role
        if (action === Actions.READ && perm.read) {
          return true;
        }
      }
    }

    return false;
  }
}
