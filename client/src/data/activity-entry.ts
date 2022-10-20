import { useQuery } from 'react-query';
import { Data } from '../types';
import {
  ActivityEntry,
  ActivityEntryChargeSummary,
  ActivityEntryDto,
  ChargeCreateDto,
} from '../types/activity-entry';

import useAxios from './axios';
import { ChargeCreateResult } from './charge';

const listActivityEntries = (showAll: boolean) => {
  const axios = useAxios();
  return axios
    .get<Data<ActivityEntry[]>>(`/activity-entry${showAll ? '' : '/my'}`)
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

export const getActivityEntryChargeSummary = (id: string) => {
  const axios = useAxios();
  return axios
    .get<Data<ActivityEntryChargeSummary>>(`/activity-entry/${id}/charge`)
    .then((res) => res.data.data);
};

export const createActivityEntryCharge = ({
  id,
  chargeData,
}: {
  id: string;
  chargeData: ChargeCreateDto;
}) => {
  const axios = useAxios();
  return axios
    .post<Data<ChargeCreateResult>>(`/activity-entry/${id}/charge`, chargeData)
    .then((res) => res.data.data);
};

export const useGetActivityEntry = (activityEntryId: string) =>
  useQuery(['activity-entry', activityEntryId], () =>
    getActivityEntry(activityEntryId),
  );

export const useListAllActivityEntries = () =>
  useQuery('listAllActivityEntries', () => listActivityEntries(true));

export const useListMyActivityEntries = () =>
  useQuery('listMyActivityEntries', () => listActivityEntries(false));

export const useChargeSummary = (activityEntryId: string) =>
  useQuery(['chargeInfo', activityEntryId], () =>
    getActivityEntryChargeSummary(activityEntryId),
  );
