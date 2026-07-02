import type { CatVariantId, CatActionId } from '@/components/pixel-cat';

/**
 * Maps an achievement ID to its corresponding pixel cat badge variant and action.
 * Used by achievement display components to render the correct cat icon.
 */
export function getAchievementBadge(id: string): { variant: CatVariantId; action: CatActionId } {
  switch (id) {
    case 'first_scan': return { variant: 'gray', action: 'scan' };
    case 'scan_10': return { variant: 'cyan', action: 'scan' };
    case 'scan_50': return { variant: 'black', action: 'scan' };
    case 'first_register': return { variant: 'pink', action: 'items' };
    case 'register_10': return { variant: 'tabby', action: 'items' };
    case 'level_5': return { variant: 'calico', action: 'achievements' };
    case 'level_10': return { variant: 'arashu-smiling', action: 'achievements' };
    case 'streak_3': return { variant: 'tabby', action: 'play' };
    default: return { variant: 'gray', action: 'none' };
  }
}

/**
 * Maps a product category string to a pixel cat variant for visual theming.
 * Returns 'gray' as the fallback for unknown or null categories.
 */
export function getCategoryVariant(category: string | null): CatVariantId {
  if (!category) return 'gray';
  const cat = category.toLowerCase();
  if (cat.includes('snack')) return 'calico';
  if (cat.includes('drink')) return 'cyan';
  if (cat.includes('dairy')) return 'pink';
  if (cat.includes('instant')) return 'tabby';
  if (cat.includes('personal')) return 'black';
  return 'gray';
}
