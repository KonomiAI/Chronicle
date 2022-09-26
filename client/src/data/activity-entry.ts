import { useQuery } from 'react-query';
import { Data } from '../types';
import { ActivityEntry, ActivityEntryDto } from '../types/activity-entry';

import useAxios from './axios';

const listActivityEntries = () => {
  const axios = useAxios();
  return axios
    .get<Data<ActivityEntry[]>>('/activity-entry/my')
    .then((res) => res.data.data);
};

const getActivityEntry = (activityEntryId: string): Promise<ActivityEntry> => {
  const axios = useAxios();
  return axios
    .get<Data<ActivityEntry>>(`/activity-entry/${activityEntryId}`)
    .then((res) => res.data.data);
};

export const createActivityEntry = (activityEntry: ActivityEntryDto) => {
  const axios = useAxios();
  return axios
    .post<Data<ActivityEntry>>('/activity-entry', activityEntry)
    .then((res) => res.data.data);
};

export const updateActivityEntry = ({
  id,
  activityEntry,
}: {
  id: string;
  activityEntry: ActivityEntryDto;
}) => {
  const axios = useAxios();
  return axios
    .put<Data<ActivityEntry>>(`/activity-entry/${id}`, activityEntry)
    .then((res) => res.data.data);
};

export const useGetActivityEntry = (activityEntryId: string) =>
  useQuery(['activity-entry', activityEntryId], () =>
    getActivityEntry(activityEntryId),
  );

export const useListActivityEntries = () =>
  useQuery('listActivityEntries', listActivityEntries);
