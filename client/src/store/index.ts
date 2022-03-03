/**
import create, { GetState } from 'zustand'
import { devtools, NamedSet } from 'zustand/middleware';

// Allows for cross-slice
export type StoreState = ;

export type StoreSlice<T> = (
  set: NamedSet<StoreState>,
  get: GetState<StoreState>
) => T

export const useStore = create<StoreState>(
  devtools((set, get) => ({
    // Slices
    ...createTestSlice(set, get)
  }))
);
 */