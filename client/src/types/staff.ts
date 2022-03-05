import Gender from './gender';

export default interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  dateOfBirth: string | null;
  isSuperUser: boolean;
  isSuspended: boolean;
}
