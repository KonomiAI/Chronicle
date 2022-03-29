import { Gender, StaffIdLessRole } from '.';

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  dateOfBirth: string | null;
  isSuperUser: boolean;
  isSuspended: boolean;
  roles: StaffIdLessRole[];
  roleIds: string[];
}

export interface AuthBody {
  email: string;
  password: string;
}

export interface User {
  accessToken: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  isSuperUser: boolean;
}

export type UserNoAccessToken = Omit<User, 'accessToken'>;
