import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Staff } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Staff => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
