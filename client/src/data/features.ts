import { useQuery } from 'react-query';
import useAxios from './axois';
import { Feature } from '../types';
import { Data } from '../types/data';

const getFeatures = () => {
  const axios = useAxios();
  return axios.get<Data<Feature>>('/features').then((res) => res.data.data);
};

export const useFeaturesList = () => useQuery('features', getFeatures);
