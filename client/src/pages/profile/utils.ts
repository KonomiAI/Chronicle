import { StaffUpdateData } from '../../types';

export const sanitizeData = (data: StaffUpdateData) => ({
  password: data.password,
});
