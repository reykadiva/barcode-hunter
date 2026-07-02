import type {
  PetLifecycleState,
  PetMemory,
  PetMemoryType,
  PetPersonalityState,
  PetPersonalityTrait,
  PetStateModel,
  PetStatName,
  PetStatsState,
  PetStatus,
} from '@/types/pet';

export const PET_STAT_LIMITS: Readonly<Record<PetStatName, { min: number; max: number }>> = {
  hunger: { min: 0, max: 100 },
  mood: { min: 0, max: 100 },
  energy: { min: 0, max: 100 },
  affection: { min: 0, max: 100 },
  curiosity: { min: 0, max: 100 },
};

export const PET_PASSIVE_FLOORS: Readonly<PetStatsState> = {
  hunger: 1,
  mood: 1,
  energy: 1,
  affection: 25,
  curiosity: 1,
};

export const PET_DECAY_PER_HOUR: Readonly<PetStatsState> = {
  hunger: 5,
  mood: 3,
  energy: 2,
  affection: 1 / 24,
  curiosity: 4,
};

export const initialPetPersonality: PetPersonalityState = {
  dominantTrait: 'gentle',
  traits: {
    gentle: 1,
    foodie: 0,
    adventurous: 0,
    'routine-loving': 0,
    independent: 0,
    social: 0,
    nocturnal: 0,
  },
};

export const initialPetStats: PetStatsState = {
  hunger: 100,
  mood: 100,
  energy: 100,
  affection: 25,
  curiosity: 50,
};

export function clampPetStat(stat: PetStatName, value: number): number {
  const limit = PET_STAT_LIMITS[stat];
  return Math.min(limit.max, Math.max(limit.min, Math.round(value)));
}

export function clampPetStats(stats: Partial<PetStatsState>): Partial<PetStatsState> {
  return Object.fromEntries(
    Object.entries(stats)
      .filter((entry): entry is [string, number] => entry[1] !== undefined)
      .map(([stat, value]) => [stat, clampPetStat(stat as PetStatName, value)]),
  ) as Partial<PetStatsState>;
}

export function normalizePetStats(stats: Partial<PetStatsState>): PetStatsState {
  return {
    hunger: clampPetStat('hunger', stats.hunger ?? initialPetStats.hunger),
    mood: clampPetStat('mood', stats.mood ?? initialPetStats.mood),
    energy: clampPetStat('energy', stats.energy ?? initialPetStats.energy),
    affection: clampPetStat('affection', stats.affection ?? initialPetStats.affection),
    curiosity: clampPetStat('curiosity', stats.curiosity ?? initialPetStats.curiosity),
  };
}

export function applyPetStatUpdate(stats: PetStatsState, update: Partial<PetStatsState>): PetStatsState {
  return normalizePetStats({ ...stats, ...clampPetStats(update) });
}

export function applyPassivePetDecay(stats: PetStatsState, elapsedHours: number): PetStatsState {
  const safeHours = Math.max(0, elapsedHours);

  return {
    hunger: Math.max(PET_PASSIVE_FLOORS.hunger, clampPetStat('hunger', stats.hunger - PET_DECAY_PER_HOUR.hunger * safeHours)),
    mood: Math.max(PET_PASSIVE_FLOORS.mood, clampPetStat('mood', stats.mood - PET_DECAY_PER_HOUR.mood * safeHours)),
    energy: Math.max(PET_PASSIVE_FLOORS.energy, clampPetStat('energy', stats.energy - PET_DECAY_PER_HOUR.energy * safeHours)),
    affection: Math.max(PET_PASSIVE_FLOORS.affection, clampPetStat('affection', stats.affection - PET_DECAY_PER_HOUR.affection * safeHours)),
    curiosity: Math.max(PET_PASSIVE_FLOORS.curiosity, clampPetStat('curiosity', stats.curiosity - PET_DECAY_PER_HOUR.curiosity * safeHours)),
  };
}

export function calculatePetStatus(stats: PetStatsState): PetStatus {
  if (stats.energy < 25) return 'resting';
  if (stats.hunger < 25) return 'hungry';
  if (stats.mood < 25) return 'bored';
  if (stats.curiosity >= 80 && stats.energy >= 50) return 'curious';
  if (stats.affection >= 80) return 'bonded';
  if (stats.energy < 50) return 'tired';
  return 'content';
}

export function calculatePetLifecycle(stats: PetStatsState, returning = false): PetLifecycleState {
  if (returning) return 'greeting';
  if (stats.energy < 25) return 'sleeping';
  if (stats.energy < 50) return 'resting';
  return 'awake';
}

export function applyPersonalitySignal(
  personality: PetPersonalityState,
  trait: PetPersonalityTrait,
  amount = 1,
): PetPersonalityState {
  const traits = { ...personality.traits, [trait]: Math.max(0, personality.traits[trait] + amount) };
  const dominantTrait = (Object.entries(traits).sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'gentle') as PetPersonalityTrait;

  return { dominantTrait, traits };
}

export function createPetMemory(input: {
  id: string;
  type: PetMemoryType;
  title: string;
  createdAt: string;
  productBarcode?: string;
  reaction?: string;
}): PetMemory {
  return {
    id: input.id,
    type: input.type,
    title: input.title.trim(),
    createdAt: input.createdAt,
    productBarcode: input.productBarcode,
    reaction: input.reaction,
  };
}

export function normalizePetState(pet: Partial<PetStateModel>): PetStateModel {
  const stats = normalizePetStats(pet.stats ?? {});

  return {
    name: pet.name?.trim() || 'Scan Chan',
    stage: pet.stage ?? 'kitten',
    stats,
    personality: pet.personality ?? initialPetPersonality,
    memories: pet.memories ?? [],
    lifecycle: pet.lifecycle ?? calculatePetLifecycle(stats),
    lastDecayTimestamp: pet.lastDecayTimestamp ?? null,
  };
}
