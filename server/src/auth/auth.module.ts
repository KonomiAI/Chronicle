import { Global, Module } from '@nestjs/common';
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
import { IPService } from 'src/models/ip/ip.service';

@Global()
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      // We use a ephemeral secret here if a defined one is not provided
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.duration,
      },
    }),
    IPModule,
  ],
  exports: [BcryptService, IPService],
  providers: [
    BcryptService,
    JwtStrategy,
    AuthService,
    StaffService,
    PrismaService,
    IPService,
    IPAllowlistGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
