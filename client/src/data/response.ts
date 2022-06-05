import { Data, ResponsePostBody, SimpleResponse } from '../types';
import useAxios from './axios';

export const createResponse = (data: ResponsePostBody) => {
  const axios = useAxios();
  return axios
    .post<Data<SimpleResponse>>('/responses', data)
    .then((res) => res.data.data);
};

export const updateResponse = ({
  data,
  id,
}: {
  data: ResponsePostBody;
  id: string;
}) => {
  const axios = useAxios();
  return axios
    .put<Data<SimpleResponse>>(`/responses/${id}`, data)
    .then((res) => res.data.data);
};
