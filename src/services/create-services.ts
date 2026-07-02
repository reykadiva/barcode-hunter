import { DefaultGameService } from './game';
import { DefaultInventoryService } from './inventory';
import { DefaultPetService } from './pet';
import { DefaultProfileService } from './profile';
import { DefaultScannerService } from './scanner';
import { DefaultSettingsService } from './settings';
import { DefaultSharedService } from './shared';
import { DefaultUIService } from './ui';
import type { createRepositories } from '@/repositories';

export type RepositoryBundle = ReturnType<typeof createRepositories>;

export function createServices(repositories: RepositoryBundle) {
  return {
    pet: new DefaultPetService(repositories.pet),
    game: new DefaultGameService(repositories.game),
    scanner: new DefaultScannerService(repositories.scanner),
    ui: new DefaultUIService(repositories.ui),
    inventory: new DefaultInventoryService(repositories.inventory),
    profile: new DefaultProfileService(repositories.profile),
    settings: new DefaultSettingsService(repositories.settings),
    shared: new DefaultSharedService(repositories.shared),
  };
}
