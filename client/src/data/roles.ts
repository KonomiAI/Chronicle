import { useQuery } from 'react-query';
import { Role } from '../types';
import useAxios from './axois';

export interface RolePostResponse {
  id: string;
}
export type RoleData = Omit<Role, 'id'>;

interface RoleUpdateParams {
  id: string;
  data: RoleData;
}
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

export const updateRole = ({ data, id }: RoleUpdateParams) => {
  const axios = useAxios();

  return axios
    .put<RolePostResponse>(`roles/${id}`, data)
    .then((res) => res.data);
};

export const createRole = (data: RoleData) => {
  const axios = useAxios();

  return axios.post<RolePostResponse>('/roles', data).then((res) => res.data);
};

export const deleteRole = (id: string) => {
  const axios = useAxios();

  return axios.delete<Role>(`roles/${id}`).then((res) => res.data);
};
export const removeRole = (id: string) =>
  useQuery(['removeRole', id], () => deleteRole(id));
