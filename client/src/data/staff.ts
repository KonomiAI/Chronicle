import { Staff } from '../types';
import useAxios from './axois';

export interface StaffPostData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface StaffPostResponse extends Omit<Staff, 'password'> {
  id: string;
}

export const getStaffList = () => {
  const axios = useAxios();
  return axios.get<{ data: Staff[] }>('/staff').then((res) => res.data.data);
};

export const getStaff = (id: string) => {
  const axios = useAxios();
  return axios.get<Staff>(`staff/${id}`).then((res) => res.data);
};

export const createStaff = (data: StaffPostData) => {
  const axios = useAxios();

  return axios.post<StaffPostResponse>('/staff', data).then((res) => res.data);
};
