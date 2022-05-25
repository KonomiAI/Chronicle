import { useQuery } from 'react-query';

import useAxios from './axios';
import { Data } from '../types/data';
import { Form, PostFormBody } from '../types/form';

export interface UpdateFormVariables {
  formId: string;
  data: PostFormBody;
}

export interface GetFormsQueryParams {
  purpose?: string;
  title?: string;
}

const getForm = (formId: string): Promise<Form> => {
  const axios = useAxios();
  return axios.get<Data<Form>>(`/forms/${formId}`).then((res) => res.data.data);
};

const getForms = (params?: GetFormsQueryParams): Promise<Form[]> => {
  const axios = useAxios();
  return axios
    .get<Data<Form[]>>('/forms', {
      params,
    })
    .then((res) => res.data.data);
};

export const createForm = (data: PostFormBody) => {
  const axios = useAxios();
  return axios.post<Data<Form>>('/forms', data).then((res) => res.data.data);
};

export const updateForm = ({ formId, data }: UpdateFormVariables) => {
  const axios = useAxios();
  return axios
    .put<Data<Form>>(`/forms/${formId}`, data)
    .then((res) => res.data.data);
};

export const useGetForm = (formId: string) =>
  useQuery(['forms', formId], () => getForm(formId));

export const useGetForms = (params?: GetFormsQueryParams) =>
  useQuery('forms', () => getForms(params));
