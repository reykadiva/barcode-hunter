import type { InventoryRepository } from '@/repositories';
import { deferred, type FutureOrchestrationPoint, type ServiceResult } from '../service-result';

export interface InventoryService {
  readonly domain: 'inventory';
  prepareInventoryRead: () => ServiceResult<FutureOrchestrationPoint>;
  prepareItemMutation: () => ServiceResult<FutureOrchestrationPoint>;
}

export class DefaultInventoryService implements InventoryService {
  readonly domain = 'inventory' as const;

  constructor(readonly repository: InventoryRepository) {}

  /** Future Sprint 5 extension point: item reads stay behind service and repository boundaries. */
  prepareInventoryRead() {
    return deferred('inventory');
  }

  /** Future Sprint 5 extension point: item mutations are orchestrated here, not inside stores. */
  prepareItemMutation() {
    return deferred('inventory');
  }
}
