import type { SettingsRepository } from '@/repositories';
import { deferred, type FutureOrchestrationPoint, type ServiceResult } from '../service-result';

export interface SettingsService {
  readonly domain: 'settings';
  prepareSettingsLoad: () => ServiceResult;
  prepareSettingsSync: () => ServiceResult<FutureOrchestrationPoint>;
}

export class DefaultSettingsService implements SettingsService {
  readonly domain = 'settings' as const;

  constructor(readonly repository: SettingsRepository) {}

  /** Future settings extension point: preferences are read through service boundaries. */
  prepareSettingsLoad() {
    return { ok: true };
  }

  /** Future Sprint 6 extension point: sync remains separated from local settings state. */
  prepareSettingsSync() {
    return deferred('sync');
  }
}
