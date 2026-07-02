import type { SharedRepository } from '@/repositories';
import { deferred, type FutureOrchestrationPoint, type ServiceResult } from '../service-result';

export interface SharedService {
  readonly domain: 'shared';
  prepareAppLoad: () => ServiceResult;
  prepareSyncBoundary: () => ServiceResult<FutureOrchestrationPoint>;
}

export class DefaultSharedService implements SharedService {
  readonly domain = 'shared' as const;

  constructor(readonly repository: SharedRepository) {}

  /** Future app-shell extension point: shared load/error orchestration lives above stores. */
  prepareAppLoad() {
    return { ok: true };
  }

  /** Future Sprint 6 extension point: shared sync metadata stays behind service boundaries. */
  prepareSyncBoundary() {
    return deferred('sync');
  }
}
