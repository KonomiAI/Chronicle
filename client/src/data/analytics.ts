import { useQuery } from 'react-query';
import { Data, ßwillFixThisTypeLater } from '../types';
import useAxios from './axios';

export enum AnalyticsDataSource {
  ACTIVITY = 'activity',
  STAFF = 'staff',
  CUSTOMER = 'customer',
  PRODUCT = 'product',
}

export interface AnalyticsEndpointParams {
  start: string;
  end: string;
  aggregateCols: string[];
  source: AnalyticsDataSource;
}

const getAnalyticsResult = (params: AnalyticsEndpointParams) => {
  const axios = useAxios();
  return axios
    .get<Data<ßwillFixThisTypeLater[]>>(`/analytics`, {
      params: {
        ...params,
        aggregateCols: params.aggregateCols.join(','),
      },
    })
    .then((res) => res.data.data);
};

export const useAnalytics = (params: AnalyticsEndpointParams) =>
  useQuery(['analytics', params], () => getAnalyticsResult(params));
