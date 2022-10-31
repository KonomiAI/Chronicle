import { useQuery } from 'react-query';

import { Audit, Data } from '../types';
import useAxios from './axios';

const getAudit = () => {
  const axios = useAxios();
  return axios.get<Data<Audit[]>>('/audit').then((res) => res.data.data);
};

export const useAudit = () => useQuery('audit', getAudit);
