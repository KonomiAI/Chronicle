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
