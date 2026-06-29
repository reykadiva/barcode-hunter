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

export interface ScanLog {
  id: string;
  barcodeNumber: string;
  productId: string | null;
  deviceType: string | null;
  scannedAt: string;
  product?: Product | null;
}

export interface ScanResult {
  found: boolean;
  product: Product | null;
  scanLog: ScanLog;
}

export interface Statistics {
  totalProducts: number;
  totalScans: number;
  mostScannedProduct: (Product & { scanCount: number }) | null;
  recentScans: ScanLog[];
  dailyScanTrend: { date: string; count: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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
  Snack: '🍿',
  Drink: '🥤',
  Candy: '🍬',
  Biscuit: '🍪',
  Dairy: '🥛',
  Frozen: '🧊',
  Instant: '🍜',
  Seasoning: '🧂',
  'Personal Care': '🧴',
  Other: '📦',
};

export interface MissionProgress {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  completed: boolean;
}

export interface GameAchievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

