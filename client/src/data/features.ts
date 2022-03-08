import useAxios from './axois';

export const getFeatures = () => {
  const axios = useAxios();
  return axios.get<{ data: any[] }>('/features').then((res) => res.data);
};