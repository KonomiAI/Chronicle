import create, { GetState, SetState, Mutate, StoreApi } from 'zustand';
import { devtools, NamedSet, subscribeWithSelector } from 'zustand/middleware';

interface IuiState {
  sidebarOpen: boolean;
}

// Allows for cross-slice access
export type StoreState = IuiState;

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
    [['zustand/subscribeWithSelector', never], ['zustand/devtools', never]]
  >
>(devtools(subscribeWithSelector((): StoreState => ({ sidebarOpen: true }))));
