import { StoreSlice } from '..'

export interface ITest {
  test: number;
  add: () => void;
}

export const createTestSlice: StoreSlice<ITest> = (set, get) => ({
  test: 0,
  add: () => {
    set(state => ({ test: state.test + 1 }))
  },
});