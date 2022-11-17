import { IResolver } from '../type';

export const resolveAddIPToAllowList: IResolver = (_params, _query, payload) =>
  `Added IP ${payload.ip} to the AllowList`;
