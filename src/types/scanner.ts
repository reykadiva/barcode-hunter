import type { Product } from './product';

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
