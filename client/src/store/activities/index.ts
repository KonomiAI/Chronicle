import { StoreSlice } from '..';
import { getAllActivities } from './activities'
import { IActivity } from '../../common/interfaces/activities';

export interface IActivitySlice {
  activities: IActivity[];
  fetchActivities: () => Promise<void>;
  setActivities: (payload: IActivity[]) => void;
}

export const createActivitySlice: StoreSlice<IActivitySlice> = (set, get) => ({
  activities: [],
  fetchActivities: async () => {
    set(
      { activities: await getAllActivities() },
      false, 
      'FETCH_ALL_ACTIVITIES',
    );
  },
  setActivities: (payload: IActivity[]) => {
    set(
      { activities: payload },
      false,
      'SET_ACTIVITIES'
    )
  },
});