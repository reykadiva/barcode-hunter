import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePlayerStore } from '@/stores/player-store';
import { Search } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/types';
import { PixelCat } from '@/components/pixel-cat';
import { useDebounce } from '@/hooks/use-debounce';
import { getCategoryVariant } from '@/lib/game-utils';

export function ScanHistory() {
  const scanHistory = usePlayerStore((state) => state.scanHistory);
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);

  useEffect(() => {
    async function fetchScannedProducts() {
      if (scanHistory.length === 0) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const uniqueBarcodes = Array.from(new Set(scanHistory));
        const res = await fetch(`/api/products?limit=50&barcodes=${uniqueBarcodes.join(',')}`);
        const data = await res.json();
        if (data.success) {
          const productMap: Record<string, Product> = {};
          data.data.forEach((p: Product) => {
            productMap[p.barcodeNumber] = p;
          });
          setProducts(productMap);
        }
      } catch (err) {
        console.error('Failed to load products for scan history:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchScannedProducts();
  }, [scanHistory]);

  const filteredHistory = scanHistory.filter((barcode) => {
    if (!debouncedSearch) return true;
    const prod = products[barcode];
    if (prod) {
      return (
        prod.productName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        barcode.includes(debouncedSearch) ||
        (prod.brand && prod.brand.toLowerCase().includes(debouncedSearch.toLowerCase()))
      );
    }
    return barcode.includes(debouncedSearch) || 'unregistered'.includes(debouncedSearch.toLowerCase());
  });

  return (
    <div className="space-y-4">
      {/* Search Input */}
      {scanHistory.length > 0 && (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your scan history..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 transition-all text-sm bg-white"
          />
        </div>
      )}

      {loading ? (
        <div className="py-12 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            className="w-8 h-8 border-3 border-brand-cyan border-t-transparent rounded-full"
          />
        </div>
      ) : scanHistory.length === 0 ? (
        <div className="card-bubbly bg-white p-12 text-center">
          <PixelCat variant="gray" action="history" size={64} className="mx-auto mb-4" />
          <p className="font-fredoka text-xl font-bold text-slate-500 mb-1">No Scans Yet</p>
          <p className="font-nunito text-slate-400 text-sm mb-6">Start scanning barcodes to build your history!</p>
          <Link href="/scan">
            <button className="btn-bubbly bg-brand-cyan text-white px-6 py-3 font-fredoka font-semibold">
              Go Scan Barcode
            </button>
          </Link>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="card-bubbly bg-white p-8 text-center text-slate-400 font-nunito font-semibold">
          No matches found for &quot;{debouncedSearch}&quot;
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((barcode, idx) => {
            const product = products[barcode];
            const catVariant = getCategoryVariant(product ? product.category : null);

            return (
              <motion.div
                key={`${barcode}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                className="card-bubbly bg-white p-4 flex items-center justify-between gap-4 border border-slate-100 hover:border-brand-cyan/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                    <PixelCat variant={catVariant} size={36} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-fredoka font-bold text-slate-800 text-sm leading-tight truncate">
                      {product ? product.productName : 'Unregistered Product'}
                    </p>
                    <p className="font-nunito text-xs text-slate-400 font-semibold mt-0.5 truncate">
                      {product?.brand ? `${product.brand} • ` : ''}Barcode: <span className="font-mono">{barcode}</span>
                    </p>
                  </div>
                </div>

                <div>
                  {product ? (
                    <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-fredoka font-bold border border-green-200">
                      ✓ Found
                    </span>
                  ) : (
                    <Link href={`/play?register=${barcode}`}>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-pink/10 hover:bg-brand-pink/20 text-brand-pink rounded-full text-xs font-fredoka font-bold transition-colors overflow-hidden">
                        <PixelCat variant="pink" action="items" size={16} />
                        Register
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
