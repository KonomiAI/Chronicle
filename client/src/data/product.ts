import { useQuery } from 'react-query';

import { PostProductBody, PostVariantBody, Product, PutProductBody, Variant } from '../types';
import { Data } from '../types/data';
import useAxios from './axios';

const getProduct = (productId: string): Promise<Product> => {
  const axios = useAxios();
  return axios.get<Data<Product>>(`/products/${productId}`).then((res) => res.data.data);
};
export const useGetProduct = (productId: string) =>
  useQuery(['getProduct', productId], () => getProduct(productId));

const getProducts = () => {
  const axios = useAxios();
  return axios.get<Data<Product[]>>('/products').then((res) => res.data.data);
};
export const useGetProducts = () => useQuery('getProducts', getProducts);

interface UpdateProductVariables {
  productId: string;
  data: PutProductBody;
}

export const updateProduct = ({ productId, data }: UpdateProductVariables) => {
  const axios = useAxios();
  return axios
    .put<Data<Product>>(`/products/${productId}`, data)
    .then((res) => res.data.data);
}

export const createProduct = (data: PostProductBody) => {
  const axios = useAxios();
  return axios
    .post<Data<Product>>('/products', data)
    .then((res) => res.data.data);
};

interface CreateVariantVariables {
  productId: string;
  data: PostVariantBody;
}

export const createVariant = ({productId, data}: CreateVariantVariables) => {
  const axios = useAxios();
  return axios
    .post<Data<Variant>>(`/products/${productId}/variants`, data)
    .then((res) => res.data.data);
};
