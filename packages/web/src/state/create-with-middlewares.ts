import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type WithMiddlewaresStateCreator<T> = StateCreator<T, [['zustand/immer', never]], [], T>;

export const createWithMiddlewares = <T>(store: WithMiddlewaresStateCreator<T>) => {
  return create<T>()(immer(store));
};
