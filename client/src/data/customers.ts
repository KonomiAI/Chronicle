import { useQuery } from 'react-query';
import { Customer } from '../types';
import { Data } from '../types/data';
import useAxios from './axois';

const getCustomerList = () => {
  const axios = useAxios();
  return axios.get<Data<Customer[]>>('/customers').then((res) => res.data.data);
};

const getCustomer = (id: string) => {
  const axios = useAxios();
  return axios
    .get<Data<Customer>>(`customers/${id}`)
    .then((res) => res.data.data);
};

export const useCustomerList = () => useQuery('customerList', getCustomerList);

export const useCustomer = (id: string) =>
  useQuery(['customer', id], () => getCustomer(id));
