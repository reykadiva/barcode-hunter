export interface Product {
  id: string;
  barcodeNumber: string;
  productName: string;
  brand: string | null;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
  creatorId: string | null;
  createdAt: string;
  updatedAt: string;
}

export const CATEGORIES = [
  'Snack',
  'Drink',
  'Candy',
  'Biscuit',
  'Dairy',
  'Frozen',
  'Instant',
  'Seasoning',
  'Personal Care',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  Snack: '#FF9800',
  Drink: '#2196F3',
  Candy: '#E91E63',
  Biscuit: '#795548',
  Dairy: '#4CAF50',
  Frozen: '#00BCD4',
  Instant: '#FF5722',
  Seasoning: '#9C27B0',
  'Personal Care': '#3F51B5',
  Other: '#607D8B',
};

export const CATEGORY_EMOJIS: Record<string, string> = {
  Snack: 'ðŸ¿',
  Drink: 'ðŸ¥¤',
  Candy: 'ðŸ¬',
  Biscuit: 'ðŸª',
  Dairy: 'ðŸ¥›',
  Frozen: 'ðŸ§Š',
  Instant: 'ðŸœ',
  Seasoning: 'ðŸ§‚',
  'Personal Care': 'ðŸ§´',
  Other: 'ðŸ“¦',
};
