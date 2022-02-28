import create, { SetState, GetState } from 'zustand'
import { devtools } from 'zustand/middleware';
import { IActivity } from '../../common/interfaces/activities';

import { getAllActivities } from './actions';

export interface ActivityStore {
  activities: IActivity[];
  fetchActivities: () => void;
}

export const useActivityStore = create<ActivityStore>(
  devtools((set: SetState<ActivityStore>, get: GetState<ActivityStore>) => ({
    activities: [],
    fetchActivities: async () => {
      set(
        { activities: await getAllActivities() },
      );
    },
  }))
);