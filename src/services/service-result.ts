export interface ServiceResult<T = void> {
  readonly ok: boolean;
  readonly data?: T;
  readonly message?: string;
}

export interface FutureOrchestrationPoint {
  readonly feature: 'feeding' | 'scanning' | 'evolution' | 'inventory' | 'missions' | 'achievements' | 'rewards' | 'sync';
  readonly status: 'deferred';
}

export const deferred = (feature: FutureOrchestrationPoint['feature']): ServiceResult<FutureOrchestrationPoint> => ({
  ok: true,
  data: { feature, status: 'deferred' },
});
