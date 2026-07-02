import type { ScannerRepository } from '@/repositories';
import { deferred, type FutureOrchestrationPoint, type ServiceResult } from '../service-result';

export interface ScannerService {
  readonly domain: 'scanner';
  prepareScanSession: () => ServiceResult<FutureOrchestrationPoint>;
  prepareScanResultHandling: () => ServiceResult<FutureOrchestrationPoint>;
}

export class DefaultScannerService implements ScannerService {
  readonly domain = 'scanner' as const;

  constructor(readonly repository: ScannerRepository) {}

  /** Future Sprint 2 extension point: coordinate scan sessions without camera or decoder logic here. */
  prepareScanSession() {
    return deferred('scanning');
  }

  /** Future Sprint 2 extension point: hand scan results toward services, not directly to repositories. */
  prepareScanResultHandling() {
    return deferred('scanning');
  }
}
