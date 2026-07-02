export type PetStatName = 'hunger' | 'mood' | 'energy' | 'affection' | 'curiosity';

export type PetLifecycleState = 'awake' | 'resting' | 'sleeping' | 'greeting';

export type PetStatus =
  | 'content'
  | 'hungry'
  | 'bored'
  | 'tired'
  | 'curious'
  | 'bonded'
  | 'resting';

export type PetPersonalityTrait =
  | 'gentle'
  | 'foodie'
  | 'adventurous'
  | 'routine-loving'
  | 'independent'
  | 'social'
  | 'nocturnal';

export type PetMemoryType = 'first-feed' | 'favorite' | 'milestone' | 'special-moment' | 'rare-find';

export type PetStageName = 'kitten' | 'young' | 'adult' | 'wise' | 'legendary';

export interface PetStatsState {
  readonly hunger: number;
  readonly mood: number;
  readonly energy: number;
  readonly affection: number;
  readonly curiosity: number;
}

export interface PetPersonalityState {
  readonly dominantTrait: PetPersonalityTrait;
  readonly traits: Readonly<Record<PetPersonalityTrait, number>>;
}

export interface PetMemory {
  readonly id: string;
  readonly type: PetMemoryType;
  readonly title: string;
  readonly createdAt: string;
  readonly productBarcode?: string;
  readonly reaction?: string;
}

export interface PetStateModel {
  readonly name: string;
  readonly stage: PetStageName;
  readonly stats: PetStatsState;
  readonly personality: PetPersonalityState;
  readonly memories: readonly PetMemory[];
  readonly lifecycle: PetLifecycleState;
  readonly lastDecayTimestamp: number | null;
}

export interface PetDomainBoundary {
  readonly domain: 'pet';
}
