import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

@Module({
  exports: [BcryptService],
  providers: [BcryptService],
})
export class AuthModule {}
