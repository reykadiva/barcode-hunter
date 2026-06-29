'use client';

import { motion } from 'motion/react';
import { Check, AlertTriangle, ScanLine, Plus, Eye, Package } from 'lucide-react';
import Link from 'next/link';
import type { ScanResult as ScanResultType } from '@/types';

interface ScanResultProps {
  result: ScanResultType;
  onScanAgain: () => void;
}

export function ScanResult({ result, onScanAgain }: ScanResultProps) {
  const { found, product, scanLog } = result;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center z-20 p-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 100 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="card-bubbly w-full max-w-sm overflow-hidden animate-pop-in"
      >
        {found && product ? (
          <>
            {/* Found header */}
            <div className="bg-brand-mint p-6 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none" />
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400, bounce: 0.6 }}
                className="w-14 h-14 bg-white rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-sm"
              >
                <Check className="w-8 h-8 text-emerald-500" strokeWidth={4} />
              </motion.div>
              <div className="relative z-10">
                <p className="text-emerald-900 text-xs font-nunito font-bold uppercase tracking-widest mb-1">Found It!</p>
                <h3 className="text-slate-800 font-fredoka font-bold text-xl leading-tight line-clamp-1">{product.productName}</h3>
              </div>
            </div>

            {/* Product info */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-5">
                {/* Product image or emoji */}
                <div className="w-24 h-24 rounded-3xl bg-brand-cyan/10 border-4 border-brand-cyan/20 flex items-center justify-center text-5xl shrink-0 overflow-hidden shadow-inner">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover" />
                  ) : (
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      <Package className="w-12 h-12 text-brand-cyan" strokeWidth={1.5} />
                    </motion.div>
                  )}
                </div>

                <div className="flex-1 min-w-0 py-1">
                  {product.brand && (
                    <p className="text-slate-500 text-sm font-nunito font-bold">{product.brand}</p>
                  )}
                  {product.category && (
                    <span className="inline-block mt-2 px-3 py-1 bg-brand-yellow text-yellow-900 rounded-full text-xs font-fredoka font-semibold">
                      {product.category}
                    </span>
                  )}
                  <p className="text-slate-400 text-xs font-nunito mt-3 font-mono bg-slate-100 px-2 py-1 rounded-md inline-block">
                    {product.barcodeNumber}
                  </p>
                </div>
              </div>

              {product.description && (
                <p className="text-slate-600 text-sm font-nunito line-clamp-2 bg-slate-50 p-3 rounded-2xl">{product.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={onScanAgain}
                className="btn-bubbly flex-1 py-4 bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center gap-2 text-sm"
              >
                <ScanLine className="w-5 h-5" />
                Scan Again
              </button>
              <Link
                href={`/product/${product.barcodeNumber}`}
                className="btn-bubbly flex-1 py-4 bg-brand-cyan text-white flex items-center justify-center gap-2 text-sm"
              >
                <Eye className="w-5 h-5" />
                Details
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Not found header */}
            <div className="bg-brand-pink p-6 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none" />
              <motion.div
                initial={{ scale: 0, rotate: 45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                className="w-14 h-14 bg-white rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-sm"
              >
                <AlertTriangle className="w-8 h-8 text-pink-500" strokeWidth={3} />
              </motion.div>
              <div className="relative z-10">
                <p className="text-pink-900 text-xs font-nunito font-bold uppercase tracking-widest mb-1">New Item!</p>
                <h3 className="text-white font-fredoka font-bold text-xl leading-tight">Product Not Found</h3>
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="bg-slate-50 rounded-3xl p-5 mb-5 border-2 border-slate-100 border-dashed">
                <p className="text-slate-500 text-sm font-nunito font-bold text-center">Barcode scanned:</p>
                <p className="text-slate-800 font-fredoka font-bold text-center text-2xl mt-1 tracking-wider">{scanLog.barcodeNumber}</p>
              </div>
              <p className="text-slate-600 text-sm font-nunito font-medium text-center px-4">
                You&apos;re the first to find this! Be a hero and add it to the database.
              </p>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={onScanAgain}
                className="btn-bubbly flex-1 py-4 bg-slate-100 text-slate-700 flex items-center justify-center gap-2 text-sm"
              >
                <ScanLine className="w-5 h-5" />
                Try Again
              </button>
              <Link
                href={`/play?register=${scanLog.barcodeNumber}`}
                className="btn-bubbly flex-1 py-4 bg-brand-pink text-white flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-5 h-5" strokeWidth={3} />
                Register
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
