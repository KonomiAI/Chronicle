import { Data, ResponsePostBody, SimpleResponse } from '../types';
import useAxios from './axios';

export const createResponse = (data: ResponsePostBody) => {
  const axios = useAxios();
  return axios
    .post<Data<SimpleResponse>>('/responses', data)
    .then((res) => res.data.data);
};
