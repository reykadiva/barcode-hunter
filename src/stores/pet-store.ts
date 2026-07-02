import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import {
  applyPassivePetDecay,
  applyPetStatUpdate,
  calculatePetLifecycle,
  calculatePetStatus,
  initialPetPersonality,
  initialPetStats,
} from '@/lib/pet';
import type { PetLifecycleState, PetMemory, PetPersonalityState, PetStageName, PetStatsState, PetStatus } from '@/types/pet';

export interface PetStoreState {
  isInitialized: boolean;
  hasHydrated: boolean;
  persistenceMode: 'guest' | 'arashu';
  name: string;
  stage: PetStageName;
  hunger: number;
  mood: number;
  energy: number;
  affection: number;
  curiosity: number;
  personality: PetPersonalityState;
  memories: PetMemory[];
  lifecycle: PetLifecycleState;
  status: PetStatus;
  lastDecayTimestamp: number | null;
  accessories: string[];
  furniture: string[];
  currentAnimation: string | null;
  interactionState: 'idle' | 'pending';
  initialize: () => void;
  setHydrated: (hasHydrated: boolean) => void;
  setPersistenceMode: (mode: 'guest' | 'arashu') => void;
  updateIdentity: (identity: Partial<Pick<PetStoreState, 'name' | 'stage'>>) => void;
  updateStats: (stats: Partial<PetStatsState>) => void;
  applyDecay: (now: number) => void;
  recordMemory: (memory: PetMemory) => void;
  queueAnimation: (animation: string | null) => void;
  reset: () => void;
}

export const initialPetState = {
  isInitialized: false,
  hasHydrated: false,
  persistenceMode: 'guest' as const,
  name: 'Scan Chan',
  stage: 'kitten' as const,
  ...initialPetStats,
  personality: initialPetPersonality,
  memories: [] as PetMemory[],
  lifecycle: 'awake' as const,
  status: 'content' as const,
  lastDecayTimestamp: null as number | null,
  accessories: [] as string[],
  furniture: [] as string[],
  currentAnimation: null as string | null,
  interactionState: 'idle' as const,
};

const petStorageKey = (mode: 'guest' | 'arashu') => `scan-chan-${mode}-pet-state`;

export const usePetStore = create<PetStoreState>()(
  devtools(
    persist(
      (set) => ({
        ...initialPetState,
        initialize: () => set({ isInitialized: true }),
        setHydrated: (hasHydrated) => set({ hasHydrated }),
        setPersistenceMode: (persistenceMode) => {
          usePetStore.persist.setOptions({ name: petStorageKey(persistenceMode) });
          set({ persistenceMode });
          void usePetStore.persist.rehydrate();
        },
        updateIdentity: (identity) => set(identity),
        updateStats: (stats) =>
          set((state) => {
            const nextStats = applyPetStatUpdate(selectPetStats(state), stats);

            return {
              ...nextStats,
              lifecycle: calculatePetLifecycle(nextStats),
              status: calculatePetStatus(nextStats),
            };
          }),
        applyDecay: (now) =>
          set((state) => {
            const elapsedHours = state.lastDecayTimestamp === null ? 0 : (now - state.lastDecayTimestamp) / 3_600_000;
            const nextStats = applyPassivePetDecay(selectPetStats(state), elapsedHours);

            return {
              ...nextStats,
              lifecycle: calculatePetLifecycle(nextStats),
              status: calculatePetStatus(nextStats),
              lastDecayTimestamp: now,
            };
          }),
        recordMemory: (memory) => set((state) => ({ memories: [...state.memories, memory] })),
        queueAnimation: (currentAnimation) => set({ currentAnimation }),
        reset: () =>
          set((state) => ({
            ...initialPetState,
            hasHydrated: state.hasHydrated,
            persistenceMode: state.persistenceMode,
          })),
      }),
      {
        name: petStorageKey('guest'),
        version: 1,
        storage: createJSONStorage(() => localStorage),
        partialize: ({ name, stage, hunger, mood, energy, affection, curiosity, personality, memories, lifecycle, status, lastDecayTimestamp, accessories, furniture, persistenceMode }) => ({
          name,
          stage,
          hunger,
          mood,
          energy,
          affection,
          curiosity,
          personality,
          memories,
          lifecycle,
          status,
          lastDecayTimestamp,
          accessories,
          furniture,
          persistenceMode,
        }),
        onRehydrateStorage: () => (state) => state?.setHydrated(true),
      },
    ),
    { name: 'scan-chan-pet-store' },
  ),
);

export const selectPetStats = (state: PetStoreState) => ({
  hunger: state.hunger,
  mood: state.mood,
  energy: state.energy,
  affection: state.affection,
  curiosity: state.curiosity,
});
export const selectPetIdentity = (state: PetStoreState) => ({
  name: state.name,
  stage: state.stage,
  personality: state.personality,
});
