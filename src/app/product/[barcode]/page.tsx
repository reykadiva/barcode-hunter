export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDate, formatBarcode } from '@/lib/utils';
import { CATEGORY_EMOJIS, CATEGORY_COLORS } from '@/types';
import { ArrowLeft, ScanLine, Package, Tag, Info, Calendar, BarChart3 } from 'lucide-react';

type Props = { params: Promise<{ barcode: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { barcode } = await params;
  const product = await prisma.product.findUnique({ where: { barcodeNumber: barcode } });
  if (!product) return { title: 'Product Not Found — Barcode Hunter' };
  return {
    title: `${product.productName} — Barcode Hunter`,
    description: product.description ?? `${product.productName} by ${product.brand ?? 'Unknown brand'}. Barcode: ${barcode}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { barcode } = await params;

  const [product, scanCount] = await Promise.all([
    prisma.product.findUnique({ where: { barcodeNumber: barcode } }),
    prisma.scanLog.count({ where: { barcodeNumber: barcode } }),
  ]);

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-orange-400" />
          </div>
          <h1 className="font-fredoka text-3xl font-bold text-gray-800 mb-3">Product Not Found</h1>
          <p className="font-nunito text-gray-500 mb-3">
            Barcode <span className="font-mono font-bold text-gray-700">{barcode}</span> is not registered.
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <Link href="/" className="px-5 py-3 bg-white border border-gray-200 rounded-xl font-nunito font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <Link href={`/play?register=${barcode}`} className="px-5 py-3 bg-orange-500 text-white rounded-xl font-nunito font-semibold hover:bg-orange-600 transition-colors">
              Register Product
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const categoryColor = CATEGORY_COLORS[product.category ?? 'Other'] ?? '#607D8B';
  const categoryEmoji = CATEGORY_EMOJIS[product.category ?? 'Other'] ?? '📦';

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-nunito font-semibold text-sm">Back</span>
          </Link>
          <span className="font-fredoka font-bold text-gray-800">Product Detail</span>
          <Link href="/scan" className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 rounded-lg text-xs font-nunito font-bold text-gray-900 hover:bg-yellow-500 transition-colors">
            <ScanLine className="w-3.5 h-3.5" /> Scan
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Product Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          {/* Image area */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-56 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="h-full w-full object-contain p-6"
              />
            ) : (
              <div className="text-center">
                <span className="text-8xl block mb-2">{categoryEmoji}</span>
                <p className="text-gray-400 text-sm font-nunito">No image available</p>
              </div>
            )}
            {product.category && (
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-xs font-nunito font-bold shadow-md"
                style={{ backgroundColor: categoryColor }}
              >
                {categoryEmoji} {product.category}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6">
            <h1 className="font-fredoka text-3xl font-bold text-gray-900 mb-1">{product.productName}</h1>
            {product.brand && (
              <p className="font-nunito text-gray-500 font-medium mb-4">by {product.brand}</p>
            )}
            {product.description && (
              <p className="font-nunito text-gray-600 leading-relaxed mb-4">{product.description}</p>
            )}
          </div>
        </div>

        {/* Details grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs font-nunito text-gray-400 uppercase tracking-wide font-semibold mb-1">Barcode</p>
              <p className="font-mono font-bold text-gray-800 text-lg">{product.barcodeNumber}</p>
              <p className="font-mono text-gray-400 text-xs">{formatBarcode(product.barcodeNumber)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-nunito text-gray-400 uppercase tracking-wide font-semibold mb-1">Total Scans</p>
              <p className="font-fredoka font-bold text-gray-800 text-3xl">{scanCount}</p>
              <p className="text-gray-400 text-xs font-nunito">times scanned</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-nunito text-gray-400 uppercase tracking-wide font-semibold mb-1">Brand</p>
              <p className="font-nunito font-bold text-gray-800">{product.brand ?? '—'}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs font-nunito text-gray-400 uppercase tracking-wide font-semibold mb-1">Added</p>
              <p className="font-nunito font-semibold text-gray-800 text-sm">{formatDate(product.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/scan" className="flex-1 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl font-nunito font-bold text-center hover:scale-105 transition-all duration-200 shadow-md flex items-center justify-center gap-2">
            <ScanLine className="w-5 h-5" /> Scan Another
          </Link>
          <Link href={`/admin/products/edit/${product.id}`} className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-nunito font-bold text-center hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Info className="w-5 h-5" /> Edit Product
          </Link>
        </div>
      </div>
    </main>
  );
}
