import type { ProfileRepository } from '@/repositories';
import { deferred, type FutureOrchestrationPoint, type ServiceResult } from '../service-result';

export interface ProfileService {
  readonly domain: 'profile';
  prepareProfileLoad: () => ServiceResult;
  prepareSyncIdentity: () => ServiceResult<FutureOrchestrationPoint>;
}

export class DefaultProfileService implements ProfileService {
  readonly domain = 'profile' as const;

  constructor(readonly repository: ProfileRepository) {}

  /** Future onboarding extension point: identity loading belongs here before stores are updated. */
  prepareProfileLoad() {
    return { ok: true };
  }

  /** Future Sprint 6 extension point: Arashu identity sync stays isolated from Guest flow. */
  prepareSyncIdentity() {
    return deferred('sync');
  }
}
