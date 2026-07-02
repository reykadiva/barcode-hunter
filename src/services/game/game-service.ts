import type { GameRepository } from '@/repositories';
import { deferred, type FutureOrchestrationPoint, type ServiceResult } from '../service-result';

export interface GameService {
  readonly domain: 'game';
  prepareMissionPipeline: () => ServiceResult<FutureOrchestrationPoint>;
  prepareAchievementPipeline: () => ServiceResult<FutureOrchestrationPoint>;
  prepareRewardPipeline: () => ServiceResult<FutureOrchestrationPoint>;
}

export class DefaultGameService implements GameService {
  readonly domain = 'game' as const;

  constructor(readonly repository: GameRepository) {}

  /** Future Sprint 2 extension point: mission progress orchestration after scan outcomes exist. */
  prepareMissionPipeline() {
    return deferred('missions');
  }

  /** Future Sprint 2+ extension point: achievement orchestration after gameplay events exist. */
  prepareAchievementPipeline() {
    return deferred('achievements');
  }

  /** Future Sprint 2 extension point: reward queue orchestration without presentation logic. */
  prepareRewardPipeline() {
    return deferred('rewards');
  }
}
