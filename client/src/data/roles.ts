import { useQuery } from 'react-query';
import { Role } from '../types';
import useAxios from './axois';

export const getRolesList = () => {
  const axios = useAxios();
  return axios.get<Role[]>('/roles').then((res) => res.data);
};

export const getRole = (id: string) => {
  const axios = useAxios();
  return axios.get<Role>(`roles/${id}`).then((res) => res.data);
};

export const useRoleList = () => useQuery('rolesList', getRolesList);
export const useRole = (id: string) =>
  useQuery(['role', id], () => getRole(id));
