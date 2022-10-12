import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StaffService } from '../models/staff/staff.service';
import { PrismaService } from '../prisma.service';
import { IPModule } from '../models/ip/ip.module';
import { IPAllowlistGuard } from './ip.guard';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: process.env.CHRONICLE_JWT_DURATION ?? '7 hours',
      },
    }),
    IPModule,
  ],
  exports: [BcryptService, IPModule],
  providers: [
    BcryptService,
    JwtStrategy,
    AuthService,
    StaffService,
    PrismaService,
    IPAllowlistGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
