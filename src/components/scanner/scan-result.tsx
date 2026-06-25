'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertTriangle, ScanLine, Plus, Eye, Package } from 'lucide-react';
import Link from 'next/link';
import type { ScanResult as ScanResultType } from '@/types';
import { CATEGORY_EMOJIS } from '@/types';

interface ScanResultProps {
  result: ScanResultType;
  onScanAgain: () => void;
  onClose?: () => void;
}

export function ScanResult({ result, onScanAgain, onClose }: ScanResultProps) {
  const { found, product, scanLog } = result;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-20 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
      >
        {found && product ? (
          <>
            {/* Found header */}
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-5 flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center shrink-0"
              >
                <Check className="w-7 h-7 text-white" strokeWidth={3} />
              </motion.div>
              <div>
                <p className="text-green-100 text-xs font-nunito font-semibold uppercase tracking-wide">Product Found!</p>
                <h3 className="text-white font-fredoka font-bold text-lg leading-tight">{product.productName}</h3>
              </div>
            </div>

            {/* Product info */}
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-4">
                {/* Product image or emoji */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-100 flex items-center justify-center text-4xl shrink-0 overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{CATEGORY_EMOJIS[product.category ?? 'Other'] ?? '📦'}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {product.brand && (
                    <p className="text-gray-500 text-sm font-nunito">{product.brand}</p>
                  )}
                  {product.category && (
                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-nunito font-semibold">
                      {CATEGORY_EMOJIS[product.category] ?? '📦'} {product.category}
                    </span>
                  )}
                  <p className="text-gray-400 text-xs font-nunito mt-2 font-mono">
                    {product.barcodeNumber}
                  </p>
                </div>
              </div>

              {product.description && (
                <p className="text-gray-600 text-sm font-nunito line-clamp-2">{product.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 flex gap-3">
              <button
                onClick={onScanAgain}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-nunito font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ScanLine className="w-4 h-4" />
                Scan Again
              </button>
              <Link
                href={`/product/${product.barcodeNumber}`}
                className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-nunito font-semibold text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Not found header */}
            <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-5 flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center shrink-0"
              >
                <AlertTriangle className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <p className="text-orange-100 text-xs font-nunito font-semibold uppercase tracking-wide">Not Registered</p>
                <h3 className="text-white font-fredoka font-bold text-lg leading-tight">Product Not Found</h3>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="bg-orange-50 rounded-2xl p-4 mb-4">
                <p className="text-orange-700 text-sm font-nunito text-center">Barcode scanned:</p>
                <p className="text-orange-900 font-mono font-bold text-center text-lg mt-1">{scanLog.barcodeNumber}</p>
              </div>
              <p className="text-gray-500 text-sm font-nunito text-center">
                This product isn't in the database yet. You can register it!
              </p>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 flex gap-3">
              <button
                onClick={onScanAgain}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-nunito font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ScanLine className="w-4 h-4" />
                Scan Again
              </button>
              <Link
                href={`/admin/products/new?barcode=${scanLog.barcodeNumber}`}
                className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-nunito font-semibold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Register
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
