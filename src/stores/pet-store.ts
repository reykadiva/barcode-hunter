import { create } from 'zustand';

export interface PetStoreState {
  readonly isInitialized: boolean;
}

export const usePetStore = create<PetStoreState>(() => ({
  isInitialized: false,
}));