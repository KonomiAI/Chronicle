import { Staff, StaffUpdateData } from '../../types';

export const cleanStaffForUpdate = (staff: Staff): StaffUpdateData => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, roles, isSuperUser, ...clean } = staff;
  return clean;
};
