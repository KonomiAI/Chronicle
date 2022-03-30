import { useQuery } from 'react-query';
import { Staff, StaffUpdateData } from '../types';
import useAxios from './axois';

export interface StaffPostData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleIds: string[];
}

export interface StaffPostResponse extends Omit<Staff, 'password'> {
  id: string;
}

interface StaffUpdateParams {
  id: string;
  data: StaffUpdateData;
}

const getStaffList = () => {
  const axios = useAxios();
  return axios.get<{ data: Staff[] }>('/staff').then((res) => res.data.data);
};

export const useStaffList = () => useQuery('staffList', getStaffList);

const getStaff = (id: string) => {
  const axios = useAxios();
  return axios.get<Staff>(`staff/${id}`).then((res) => res.data);
};

export const useStaff = (id: string) =>
  useQuery(['staff', id], () => getStaff(id));

export const createStaff = (data: StaffPostData) => {
  const axios = useAxios();

  return axios.post<StaffPostResponse>('/staff', data).then((res) => res.data);
};

export const updateStaff = ({ data, id }: StaffUpdateParams) => {
  const axios = useAxios();

  return axios
    .put<StaffPostResponse>(`staff/${id}`, data)
    .then((res) => res.data);
};
