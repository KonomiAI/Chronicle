import useAxios from './axois';
import { useQuery } from 'react-query';
import { Feature } from '../types';

export const getFeatures = () => {
  const axios = useAxios();
  return axios.get<Feature[]>('/features').then((res) => res.data);
};

export const useFeaturesList = () => useQuery('features', getFeatures);
