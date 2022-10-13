import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as requestIp from '@supercharge/request-ip';
import { RequestWithUser } from 'src/types/request';
import { IPService } from '../models/ip/ip.service';

const IP_CHECK_KEY = 'shouldCheckIPAddress';

@Injectable()
export class IPAllowlistGuard implements CanActivate {
  private readonly logger = new Logger(IPAllowlistGuard.name);
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

  async checkRequestIP(request: Request): Promise<boolean> {
    const ip = getIPFromRequest(request, this.logger);

    // If the user is connecting from IPv6
    const hasIP = await this.ipService.isIPInAllowList(ip);
    this.logger.debug(`Checking IP ${ip} yielded ${hasIP}`);

    if (!hasIP) {
      throw new BadRequestException(
        `Your IP address ${ip} is not in the allowlist. Please contact your administrator if you believe this is an error.`,
      );
    }

    return true;
  }
}

/**
 * Find IP address from the client, if forwarding is identified then use the forwarded IP
 *
 * @param request ExpressJS request object
 * @param logger Optional logger to send debug messages
 * @returns The IP address of the client
 */
export const getIPFromRequest = (request: any, logger?: Logger) => {
  const { headers } = request;

  const ip =
    getClientIPFromForwardRequest(headers, logger) ??
    requestIp.getClientIp(request);
  if (typeof ip !== 'string') {
    throw new BadRequestException('IP address is not a string');
  }
  return ip.startsWith('::ffff:') ? ip.split('::ffff:')[1] : ip;
};

/**
 * Obtain the IP address from the forwarded request
 *
 * @param headers ExpressJS request headers
 * @param logger Optional logger to send debug messages
 * @returns string ip address if found, null otherwise
 */
const getClientIPFromForwardRequest = (
  headers: Record<string, string>,
  logger?: Logger,
) => {
  if (process.env.CHRONICLE_IGNORE_FORWARD_HEADERS === 'YES') {
    logger?.debug('Ignoring forwarded headers due to config');
    return null;
  }
  logger?.debug(
    `Checking for forwarded IP in headers: ${JSON.stringify({
      ...headers,
      authorization: 'REDACTED',
    })}`,
  );
  const forwarded = headers['x-forwarded-for'];
  if (typeof forwarded !== 'string') {
    logger?.debug('No forwarded IP found');
    return null;
  }
  const ips = forwarded.split(',');
  // Get the 2nd last IP from the array
  // This is because most load balancers will add their own IP to the end of the array
  // and we want the IP of the client, which is the 2nd last IP
  // We can add verification for the last IP later if we want to
  // See https://stackoverflow.com/questions/10849687/understanding-x-forwarded-for
  return ips[ips.length - 2];
};

export const SkipIPCheck = () => SetMetadata(IP_CHECK_KEY, false);
