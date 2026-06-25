import { ProductForm } from '@/components/product/product-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Product — Barcode Adventure Admin',
};

type Props = { searchParams: Promise<{ barcode?: string }> };

export default async function NewProductPage({ searchParams }: Props) {
  const { barcode } = await searchParams;

  return <ProductForm mode="create" defaultBarcode={barcode} />;
}
