import { useQuery } from 'react-query';

import { PostProductBody, PostVariantBody, Product, Variant } from '../types';
import { Data } from '../types/data';
import useAxios from './axios';

const getProducts = () => {
  const axios = useAxios();
  return axios.get<Data<Product[]>>('/products').then((res) => res.data.data);
};
export const useGetProducts = () => useQuery('getProducts', getProducts);

export const createProduct = (data: PostProductBody) => {
  const axios = useAxios();
  return axios
    .post<Data<Product>>('/products', data)
    .then((res) => res.data.data);
};

export const createVariant = (productId: string, data: PostVariantBody) => {
  const axios = useAxios();
  return axios
    .post<Data<Variant>>(`/products/${productId}/variants`, data)
    .then((res) => res.data.data);
};
