import { ResetPasswordBody, ResetPasswordData } from '../../types';

export const buildResetPasswordBody = (
  data: ResetPasswordData,
): ResetPasswordBody => ({
  password: data.password,
});
