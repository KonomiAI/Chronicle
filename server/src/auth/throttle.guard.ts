// throttler-behind-proxy.guard.ts
import { ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { getIPFromRequest } from './ip.guard';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  canActivate(context: ExecutionContext): Promise<boolean> {
    if (process.env.CHRONICLE_DISABLED_THROTTLE === 'YES') {
      return Promise.resolve(true);
    }
    return super.canActivate(context);
  }
  protected getTracker(req: Request): string {
    return getIPFromRequest(req);
  }
}
