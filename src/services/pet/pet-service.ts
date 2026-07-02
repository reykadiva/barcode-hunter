import type { PetRepository } from '@/repositories';
import { deferred, type ServiceResult, type FutureOrchestrationPoint } from '../service-result';

export interface PetService {
  readonly domain: 'pet';
  prepareFeeding: () => ServiceResult<FutureOrchestrationPoint>;
  prepareEvolution: () => ServiceResult<FutureOrchestrationPoint>;
}

export class DefaultPetService implements PetService {
  readonly domain = 'pet' as const;

  constructor(readonly repository: PetRepository) {}

  /** Future Sprint 2 extension point: orchestrate scan-to-feeding without storing gameplay rules here. */
  prepareFeeding() {
    return deferred('feeding');
  }

  /** Future Sprint 3 extension point: delegate evolution orchestration to documented domain logic. */
  prepareEvolution() {
    return deferred('evolution');
  }
}
