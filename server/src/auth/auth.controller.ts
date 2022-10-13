import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IPAllowlistGuard, SkipIPCheck } from './ip.guard';
import { RequestWithUser } from 'src/types/request';

//TODO: return roles associated as well when that relation has been established
const SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  gender: true,
  isSuperUser: true,
  roles: {
    select: {
      id: true,
      name: true,
      permissions: true,
    },
  },
  roleIds: true,
};

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private ipGuard: IPAllowlistGuard,
  ) {}

  @SkipIPCheck()
  @Post('login')
  async getFeatures(@Body() login: LoginDto, @Request() req: RequestWithUser) {
    const user = await this.authService.validateUser(
      login.email,
      login.password,
    );
    await this.ipGuard.checkRequestIP(req);
    return this.authService.obtainToken(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('details')
  async getDetails(@Request() req) {
    const user = await this.authService.getDetails({ id: req.user.id }, SELECT);
    return user;
  }
}
