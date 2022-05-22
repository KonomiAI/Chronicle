import { useQuery } from 'react-query';

import useAxios from './axios';
import { Data, Activity, PostActivityBody, PutActivityBody } from '../types';

const getActivity = (activityId: string): Promise<Activity> => {
  const axios = useAxios();
  return axios
    .get<Data<Activity>>(`/activities/${activityId}`)
    .then((res) => res.data.data);
};
export const useGetActivity = (activityId: string) =>
  useQuery(['getActivity', activityId], () => getActivity(activityId));

const getActivities = () => {
  const axios = useAxios();
  return axios
    .get<Data<Activity[]>>('/activities')
    .then((res) => res.data.data);
};
export const useGetActivities = () => useQuery('getActivities', getActivities);

export const createActivity = (data: PostActivityBody) => {
  const axios = useAxios();
  return axios
    .post<Data<Activity>>('/activities', data)
    .then((res) => res.data.data);
};

interface UpdateActivityVariables {
  activityId: string;
  data: PutActivityBody;
}

export const updateActivity = ({
  activityId,
  data,
}: UpdateActivityVariables) => {
  const axios = useAxios();
  return axios
    .put<Data<Activity>>(`/activities/${activityId}`, data)
    .then((res) => res.data.data);
};

export const deleteActivity = (activityId: string): Promise<Activity> => {
  const axios = useAxios();
  return axios
    .delete<Data<Activity>>(`/activities/${activityId}`)
    .then((res) => res.data.data);
};
