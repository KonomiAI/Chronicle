import { useQuery } from 'react-query';
import {
  ChargeCreateResult,
  Customer,
  CustomerBalance,
  CustomerChargePostDto,
  CustomerCreateDto,
  CustomerWithResponses,
} from '../types';
import { Data } from '../types/data';
import useAxios from './axios';

const getCustomerList = () => {
  const axios = useAxios();
  return axios.get<Data<Customer[]>>('/customers').then((res) => res.data.data);
};

const getCustomer = (id: string) => {
  const axios = useAxios();
  return axios
    .get<Data<CustomerWithResponses>>(`customers/${id}`)
    .then((res) => res.data.data);
};

export const createCustomer = (data: CustomerCreateDto) => {
  const axios = useAxios();

  return axios.post<Data<Customer>>('/customers', data).then((res) => res.data);
};

export const updateCustomer = ({
  data,
  id,
}: {
  data: CustomerCreateDto;
  id: string;
}) => {
  const axios = useAxios();

  return axios
    .put<Data<Customer>>(`customers/${id}`, data)
    .then((res) => res.data);
};

const getCustomerBalance = (id: string) => {
  const axios = useAxios();
  return axios
    .get<Data<CustomerBalance>>(`/customers/${id}/balance`)
    .then((res) => res.data.data);
};

export const createChargeForCustomer = ({
  id,
  body,
}: {
  id: string;
  body: CustomerChargePostDto;
}) => {
  const axios = useAxios();
  return axios
    .post<Data<ChargeCreateResult>>(`/customers/${id}/charge`, body)
    .then((res) => res.data.data);
};

export const useCustomerList = () => useQuery('customerList', getCustomerList);

export const useCustomer = (id: string) =>
  useQuery(['customer', id], () => getCustomer(id));

export const useCustomerBalance = (id: string) =>
  useQuery(['customer', id, 'balance'], () => getCustomerBalance(id));
