//TODO: load secret from environment
import * as crypto from 'crypto';

export const EPHEMERAL_SECRET = crypto.randomBytes(64).toString('hex');

export const jwtConstants = {
  secret: process.env.CHRONICLE_JWT_SECRET ?? EPHEMERAL_SECRET,
  duration: process.env.CHRONICLE_JWT_DURATION ?? '7 hours',
};

export enum Features {
  Inventory = 'Inventory',
  Security = 'Security',
  Entry = 'Entry',
  Customer = 'Customer',
  Form = 'Form',
}

export enum Actions {
  READ,
  WRITE,
}
