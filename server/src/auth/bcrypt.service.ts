import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const HASH_ROUNDS = process.env.BCRYPT_HASH_ROUNDS ?? 10;

@Injectable()
export class BcryptService {
  hash(password: string) {
    return bcrypt.hash(password, HASH_ROUNDS);
  }

  verify(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
