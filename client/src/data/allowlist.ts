import { useQuery } from 'react-query';
import { Ip, AllowlistData } from '../types';
import { Data } from '../types/data';
import useAxios from './axios';

export interface AllowlistPostResponse {
  id: string;
}

interface AllowlistUpdateParams {
  id: string;
  data: AllowlistData;
}

export const getAllowlist = (): Promise<Ip[]> => {
  const axios = useAxios();
  return axios.get<Data<Ip[]>>('/ip').then((res) => res.data.data);
};
export const useAllowList = () => useQuery('allowlist', getAllowlist);

export const getAllowlistEntry = (id: string) => {
  const axios = useAxios();
  return axios.get<Ip>(`ip/${id}`).then((res) => res.data);
};

export const updateAllowlistEntry = ({ data, id }: AllowlistUpdateParams) => {
  const axios = useAxios();

  return axios
    .put<AllowlistPostResponse>(`ip/${id}`, data)
    .then((res) => res.data);
};

export const createAllowlistEntry = (data: AllowlistData) => {
  const axios = useAxios();

  return axios.post<AllowlistPostResponse>('/ip', data).then((res) => res.data);
};

export const deleteAllowlistEntry = (id: string) => {
  const axios = useAxios();

  return axios.delete<Ip>(`ip/${id}`).then((res) => res.data);
};

export const removeAllowlistEntry = (id: string) =>
  useQuery(['removeAllowlistEntry', id], () => deleteAllowlistEntry(id));
