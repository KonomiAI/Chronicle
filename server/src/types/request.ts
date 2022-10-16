import { Staff } from '@prisma/client';

export interface RequestWithUser extends Request {
  user: Partial<Staff>;
}
