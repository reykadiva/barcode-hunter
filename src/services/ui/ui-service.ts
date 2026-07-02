import type { UIRepository } from '@/repositories';
import { deferred, type FutureOrchestrationPoint, type ServiceResult } from '../service-result';

export interface UIService {
  readonly domain: 'ui';
  prepareNavigationShell: () => ServiceResult;
  prepareFeedbackSurface: () => ServiceResult<FutureOrchestrationPoint>;
}

export class DefaultUIService implements UIService {
  readonly domain = 'ui' as const;

  constructor(readonly repository: UIRepository) {}

  /** Future UI shell extension point: keep view composition outside persistence and repositories. */
  prepareNavigationShell() {
    return { ok: true };
  }

  /** Future Sprint 2+ extension point: route reward/scanner feedback through services before UI. */
  prepareFeedbackSurface() {
    return deferred('scanning');
  }
}
