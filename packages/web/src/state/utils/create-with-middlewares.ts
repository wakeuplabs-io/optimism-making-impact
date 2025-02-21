import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type WithMiddlewaresStateCreator<T> = StateCreator<T, [['zustand/immer', never]], [], T>;
type StoreState<T> = StateCreator<T, [['zustand/immer', never], ['zustand/persist', unknown]], [], T>;
type PersistConfig = { name: string; storageType?: 'localStorage' | 'sessionStorage' };

// TODO: review this component!!!! what are we trying to do here???


export const createWithImmer = <T>(store: WithMiddlewaresStateCreator<T>) => {
  return create<T>()(immer(store));
};

export const createWithImmerAndPersistance = <T>(store: StoreState<T>, persistConfig: PersistConfig) => {
  const { name, storageType = 'localStorage' } = persistConfig;
  return create<T>()(
    persist(immer(store), {
      name,
      storage: createJSONStorage(() => (storageType === 'localStorage' ? localStorage : sessionStorage)),
    }),
  );
};

/**
 * Factory function to create Zustand stores with immer and optional persist.
 */
export const createWithMiddlewares = <T>(store: WithMiddlewaresStateCreator<T>, persistConfig?: PersistConfig) => {
  return persistConfig ? createWithImmerAndPersistance(store, persistConfig) : createWithImmer(store);
};
