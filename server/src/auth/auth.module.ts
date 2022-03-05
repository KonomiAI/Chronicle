import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7 hours' },
    }),
  ],
  exports: [BcryptService],
  providers: [BcryptService, JwtStrategy],
})
export class AuthModule {}
