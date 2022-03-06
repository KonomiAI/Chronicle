import create, { GetState, State } from 'zustand'
import { devtools, NamedSet } from 'zustand/middleware';

// Allows for cross-slice access
export type StoreState = State;

export type StoreSlice<T> = (
  set: NamedSet<StoreState>,
  get: GetState<StoreState>
) => T

export const useStore = create<StoreState>(
  devtools((set, get) => ({
    // Slices
  }))
);