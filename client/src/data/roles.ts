import { Role } from '../types';
import useAxios from './axois';

export const getRolesList = () => {
  const axios = useAxios();
  return axios.get<{ data: Role[] }>('/roles').then((res) => res.data);
};

export const getRole = (id: string) => {
  const axios = useAxios();
  return axios.get<Role>(`roles/${id}`).then((res) => res.data);
};