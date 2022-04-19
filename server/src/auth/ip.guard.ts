import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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

    if (shouldCheckIP === false) {
      return true;
    }

    const { ip } = context.switchToHttp().getRequest();
    if (typeof ip !== 'string') {
      throw new BadRequestException('IP address is not a string');
    }
    // If the user is connecting from IPv4
    if (ip.startsWith('::ffff:')) {
      return this.ipService.isIPInAllowList(ip.split('::ffff:')[1]);
    }
    // If the user is connecting from IPv6
    return this.ipService.isIPInAllowList(ip);
  }
}

export const SkipIPCheck = () => SetMetadata(IP_CHECK_KEY, false);
