import create, { GetState } from 'zustand'
import { devtools, NamedSet } from 'zustand/middleware';

import { IActivitySlice, createActivitySlice } from './activities';
import { createTestSlice, ITest } from './temp'

// Allows for cross-slice
export type StoreState = IActivitySlice & ITest;

export type StoreSlice<T> = (
  set: NamedSet<StoreState>,
  get: GetState<StoreState>
) => T

export const useStore = create<StoreState>(
  devtools((set, get) => ({
    ...createActivitySlice(set, get),
    ...createTestSlice(set, get)
  }))
);