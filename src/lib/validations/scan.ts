import { z } from 'zod';

export const scanRequestSchema = z.object({
  barcodeNumber: z
    .string()
    .min(1, 'Barcode number is required')
    .max(20, 'Barcode number too long'),
  deviceType: z.string().max(100).optional(),
});

export type ScanRequestInput = z.infer<typeof scanRequestSchema>;
