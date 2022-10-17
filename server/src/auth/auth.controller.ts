import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Prisma, Staff } from '@prisma/client';

import { AuthService } from './auth.service';
import { LoginDto, ResetPasswordDto } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IPAllowlistGuard, SkipIPCheck } from './ip.guard';
import { RequestWithUser } from 'src/types/request';
import { GetUser } from './user.decorator';
import { BcryptService } from './bcrypt.service';
import { StaffService } from 'src/models/staff/staff.service';

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
    private bcrypt: BcryptService,
    private ipGuard: IPAllowlistGuard,
    private staffService: StaffService,
  ) {}

  @SkipIPCheck()
  @Post('login')
  async getFeatures(@Body() login: LoginDto, @Request() req: RequestWithUser) {
    const user = await this.authService.validateUser(
      login.email,
      login.password,
    );
    if (!user.isSuperUser) {
      await this.ipGuard.checkRequestIP(req);
    }

    return this.authService.obtainToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('details')
  async getDetails(@Request() req) {
    const user = await this.authService.getDetails({ id: req.user.id }, SELECT);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto, @GetUser() user: Staff) {
    const { password } = data;
    const updateData: Prisma.StaffUpdateInput = {};

    updateData.authKey = await this.bcrypt.hash(password);

    await this.staffService.update({
      where: { id: user.id },
      data: updateData,
    });

    return;
  }
}
