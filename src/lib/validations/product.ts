import { z } from 'zod';

export const barcodeSchema = z
  .string()
  .min(1, 'Barcode number is required')
  .max(20, 'Barcode number too long')
  .regex(/^[0-9A-Za-z-]+$/, 'Barcode contains invalid characters');

export const productCreateSchema = z.object({
  barcodeNumber: barcodeSchema,
  productName: z
    .string()
    .min(1, 'Product name is required')
    .max(255, 'Product name too long'),
  brand: z.string().max(255).optional().nullable(),
  category: z.string().max(255).optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url('Invalid image URL').optional().nullable(),
});

export const productUpdateSchema = z.object({
  productName: z.string().min(1).max(255).optional(),
  brand: z.string().max(255).optional().nullable(),
  category: z.string().max(255).optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url('Invalid image URL').optional().nullable(),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
