export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/product/product-form';
import type { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return {
    title: product
      ? `Edit ${product.productName} — Barcode Adventure Admin`
      : 'Edit Product — Barcode Adventure Admin',
  };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const serialized = {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  return <ProductForm mode="edit" initialData={serialized} />;
}
