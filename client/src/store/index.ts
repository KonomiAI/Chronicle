import create, { GetState, SetState, Mutate, StoreApi } from 'zustand';
import {
  devtools,
  NamedSet,
  subscribeWithSelector,
  persist,
} from 'zustand/middleware';

import { PermissionDetail, UserNoAccessToken } from '../types';

interface IGlobalState {
  sidebarOpen: boolean;
  user: UserNoAccessToken | undefined;
  permissions: Record<string, PermissionDetail>;
}

// Allows for cross-slice access
export type StoreState = IGlobalState;

export type StoreSlice<T> = (
  set: NamedSet<StoreState>,
  get: GetState<StoreState>,
) => T;

export const useStore = create<
  StoreState,
  SetState<StoreState>,
  GetState<StoreState>,
  Mutate<
    StoreApi<StoreState>,
    [
      ['zustand/subscribeWithSelector', never],
      ['zustand/devtools', never],
      ['zustand/persist', Partial<IGlobalState>],
    ]
  >
>(
  devtools(
    subscribeWithSelector(
      persist(
        (): StoreState => ({
          sidebarOpen: true,
          user: undefined,
          permissions: {},
        }),
        { name: 'settings' },
      ),
    ),
  ),
);
