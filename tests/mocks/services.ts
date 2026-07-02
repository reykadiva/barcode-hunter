import { vi } from 'vitest';
import type {
  GameService,
  InventoryService,
  PetService,
  ProfileService,
  ScannerService,
  SettingsService,
  SharedService,
  UIService,
} from '@/services';
import { initialPetPersonality, initialPetStats } from '@/lib/pet';

const ok = () => ({ ok: true });
const pet = {
  name: 'Scan Chan',
  stage: 'kitten' as const,
  stats: initialPetStats,
  personality: initialPetPersonality,
  memories: [],
  lifecycle: 'awake' as const,
  lastDecayTimestamp: null,
};

export function createMockServices() {
  return {
    pet: {
      domain: 'pet',
      normalizePet: vi.fn(() => ({ ok: true, data: pet })),
      updateStats: vi.fn(() => ({ ok: true, data: pet })),
      applyPassiveDecay: vi.fn(() => ({ ok: true, data: pet })),
      calculateStatus: vi.fn(() => ({ ok: true, data: { lifecycle: 'awake' as const, status: 'content' as const } })),
      applyPersonalitySignal: vi.fn(() => ({ ok: true, data: pet })),
      createMemory: vi.fn(() => ({
        ok: true,
        data: { id: 'memory-1', type: 'first-feed' as const, title: 'First Feed', createdAt: '2026-07-03T00:00:00.000Z' },
      })),
      preparePetState: vi.fn(ok),
      prepareFeeding: vi.fn(ok),
      prepareEvolution: vi.fn(ok),
    } satisfies PetService,
    game: {
      domain: 'game',
      prepareMissionPipeline: vi.fn(ok),
      prepareAchievementPipeline: vi.fn(ok),
      prepareRewardPipeline: vi.fn(ok),
    } satisfies GameService,
    scanner: {
      domain: 'scanner',
      prepareScanSession: vi.fn(ok),
      prepareScanResultHandling: vi.fn(ok),
    } satisfies ScannerService,
    ui: {
      domain: 'ui',
      prepareNavigationShell: vi.fn(ok),
      prepareFeedbackSurface: vi.fn(ok),
    } satisfies UIService,
    inventory: {
      domain: 'inventory',
      prepareInventoryRead: vi.fn(ok),
      prepareItemMutation: vi.fn(ok),
    } satisfies InventoryService,
    profile: {
      domain: 'profile',
      prepareProfileLoad: vi.fn(ok),
      prepareSyncIdentity: vi.fn(ok),
    } satisfies ProfileService,
    settings: {
      domain: 'settings',
      prepareSettingsLoad: vi.fn(ok),
      prepareSettingsSync: vi.fn(ok),
    } satisfies SettingsService,
    shared: {
      domain: 'shared',
      prepareAppLoad: vi.fn(ok),
      prepareSyncBoundary: vi.fn(ok),
    } satisfies SharedService,
  };
}
