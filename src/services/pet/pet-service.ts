import type { PetRepository } from '@/repositories';
import {
  applyPassivePetDecay,
  applyPersonalitySignal,
  applyPetStatUpdate,
  calculatePetLifecycle,
  calculatePetStatus,
  createPetMemory,
  normalizePetState,
} from '@/lib/pet';
import type { PetMemory, PetMemoryType, PetPersonalityTrait, PetStateModel, PetStatsState } from '@/types/pet';
import { deferred, type ServiceResult, type FutureOrchestrationPoint } from '../service-result';

export interface PetService {
  readonly domain: 'pet';
  normalizePet: (pet: Partial<PetStateModel>) => ServiceResult<PetStateModel>;
  updateStats: (pet: PetStateModel, stats: Partial<PetStatsState>) => ServiceResult<PetStateModel>;
  applyPassiveDecay: (pet: PetStateModel, now: number) => ServiceResult<PetStateModel>;
  calculateStatus: (pet: PetStateModel) => ServiceResult<Pick<PetStateModel, 'lifecycle'> & { status: ReturnType<typeof calculatePetStatus> }>;
  applyPersonalitySignal: (pet: PetStateModel, trait: PetPersonalityTrait, amount?: number) => ServiceResult<PetStateModel>;
  createMemory: (input: { id: string; type: PetMemoryType; title: string; createdAt: string; productBarcode?: string; reaction?: string }) => ServiceResult<PetMemory>;
  preparePetState: () => ServiceResult;
  prepareFeeding: () => ServiceResult<FutureOrchestrationPoint>;
  prepareEvolution: () => ServiceResult<FutureOrchestrationPoint>;
}

export class DefaultPetService implements PetService {
  readonly domain = 'pet' as const;

  constructor(readonly repository: PetRepository) {}

  normalizePet(pet: Partial<PetStateModel>) {
    return { ok: true, data: normalizePetState(pet) };
  }

  updateStats(pet: PetStateModel, stats: Partial<PetStatsState>) {
    const nextStats = applyPetStatUpdate(pet.stats, stats);
    return {
      ok: true,
      data: {
        ...pet,
        stats: nextStats,
        lifecycle: calculatePetLifecycle(nextStats),
      },
    };
  }

  applyPassiveDecay(pet: PetStateModel, now: number) {
    const elapsedHours = pet.lastDecayTimestamp === null ? 0 : (now - pet.lastDecayTimestamp) / 3_600_000;
    const nextStats = applyPassivePetDecay(pet.stats, elapsedHours);

    return {
      ok: true,
      data: {
        ...pet,
        stats: nextStats,
        lifecycle: calculatePetLifecycle(nextStats),
        lastDecayTimestamp: now,
      },
    };
  }

  calculateStatus(pet: PetStateModel) {
    return {
      ok: true,
      data: {
        lifecycle: pet.lifecycle,
        status: calculatePetStatus(pet.stats),
      },
    };
  }

  applyPersonalitySignal(pet: PetStateModel, trait: PetPersonalityTrait, amount = 1) {
    return {
      ok: true,
      data: {
        ...pet,
        personality: applyPersonalitySignal(pet.personality, trait, amount),
      },
    };
  }

  createMemory(input: { id: string; type: PetMemoryType; title: string; createdAt: string; productBarcode?: string; reaction?: string }) {
    return { ok: true, data: createPetMemory(input) };
  }

  /** Sprint 2.1 orchestration hook for pet state updates; feature pipelines stay deferred. */
  preparePetState() {
    return { ok: true };
  }

  /** Future Sprint 2 extension point: orchestrate scan-to-feeding without storing gameplay rules here. */
  prepareFeeding() {
    return deferred('feeding');
  }

  /** Future Sprint 3 extension point: delegate evolution orchestration to documented domain logic. */
  prepareEvolution() {
    return deferred('evolution');
  }
}
