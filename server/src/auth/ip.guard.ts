import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as requestIp from '@supercharge/request-ip';
import { RequestWithUser } from 'src/types/request';
import { IPService } from '../models/ip/ip.service';

const IP_CHECK_KEY = 'shouldCheckIPAddress';

@Injectable()
export class IPAllowlistGuard implements CanActivate {
  constructor(
    private readonly ipService: IPService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const shouldCheckIP = this.reflector.getAllAndOverride<boolean>(
      IP_CHECK_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const { user } = request;

    if (shouldCheckIP === false || user?.isSuperUser) {
      return true;
    }
    return this.checkRequestIP(request);
  }

  async checkRequestIP(request: RequestWithUser): Promise<boolean> {
    const ip = getIPFromRequest(request);

    // If the user is connecting from IPv6
    const hasIP = await this.ipService.isIPInAllowList(ip);

    if (!hasIP) {
      throw new BadRequestException(
        `Your IP address ${ip} is not in the allowlist. Please contact your administrator if you believe this is an error.`,
      );
    }

    return true;
  }
}

export const getIPFromRequest = (request: any) => {
  const { headers } = request;

  const ip =
    getClientIPFromForwardRequest(headers) ?? requestIp.getClientIp(request);
  if (typeof ip !== 'string') {
    throw new BadRequestException('IP address is not a string');
  }
  return ip.startsWith('::ffff:') ? ip.split('::ffff:')[1] : ip;
};

const getClientIPFromForwardRequest = (headers: Record<string, string>) => {
  const forwarded = headers['x-forwarded-for'];
  if (typeof forwarded !== 'string') {
    return null;
  }
  const ips = forwarded.split(',');
  // Get the 2nd last IP from the array
  return ips[ips.length - 2];
};

export const SkipIPCheck = () => SetMetadata(IP_CHECK_KEY, false);
