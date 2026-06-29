import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePlayerStore } from '@/stores/player-store';
import { toast } from 'sonner';
import type { Product } from '@/types';
import { PixelCat, type CatVariantId, type CatActionId } from '@/components/pixel-cat';

interface GlobalStats {
  totalProducts: number;
  totalScans: number;
}

export function GameStats() {
  const scanHistory = usePlayerStore((state) => state.scanHistory);
  const registeredBarcodes = usePlayerStore((state) => state.registeredBarcodes);
  const level = usePlayerStore((state) => state.level);
  const xp = usePlayerStore((state) => state.xp);

  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [categoriesMastered, setCategoriesMastered] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        // 1. Fetch global statistics
        const res = await fetch('/api/statistics');
        const data = await res.json();
        if (data.success) {
          setGlobalStats({
            totalProducts: data.data.totalProducts,
            totalScans: data.data.totalScans,
          });
        }

        // 2. Fetch categories mastered by scanning unique barcodes
        const uniqueBarcodes = Array.from(new Set(scanHistory));
        if (uniqueBarcodes.length > 0) {
          const resProducts = await fetch(
            `/api/products?limit=50&barcodes=${uniqueBarcodes.join(',')}`
          );
          const productsData = await resProducts.json();
          if (productsData.success) {
            const categories = new Set(
              productsData.data
                .map((p: Product) => p.category)
                .filter((cat: string | null) => cat !== null && cat !== '')
            );
            setCategoriesMastered(categories.size);
          }
        } else {
          setCategoriesMastered(0);
        }
      } catch {
        toast.error('Failed to load some statistics');
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [scanHistory]);

  const uniqueScansCount = new Set(scanHistory).size;

  const stats = [
    {
      title: 'Total Scans',
      value: scanHistory.length,
      description: 'Total barcodes you scanned',
      variant: 'cyan' as CatVariantId,
      action: 'scan' as CatActionId,
      color: 'bg-brand-cyan/10 border-brand-cyan/20',
    },
    {
      title: 'Unique Scans',
      value: uniqueScansCount,
      description: 'Different products found',
      variant: 'gray' as CatVariantId,
      action: 'stats' as CatActionId,
      color: 'bg-brand-yellow/15 border-brand-yellow/35',
    },
    {
      title: 'Registered Products',
      value: registeredBarcodes.length,
      description: 'Products added by you',
      variant: 'pink' as CatVariantId,
      action: 'items' as CatActionId,
      color: 'bg-brand-pink/10 border-brand-pink/20',
    },
    {
      title: 'Categories Mastered',
      value: categoriesMastered,
      description: 'Distinct product categories',
      variant: 'tabby' as CatVariantId,
      action: 'achievements' as CatActionId,
      color: 'bg-green-50 border-green-250',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`card-bubbly bg-white p-5 border flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-fredoka text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h3 className="font-fredoka font-black text-3xl text-slate-800">
                    {loading && stat.title === 'Categories Mastered' ? (
                      <span className="inline-block w-8 h-8 rounded bg-slate-100 animate-pulse" />
                    ) : (
                      stat.value
                    )}
                  </h3>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border overflow-hidden ${stat.color}`}>
                  <PixelCat variant={stat.variant} action={stat.action} size={32} />
                </div>
              </div>
              <p className="font-nunito text-xs text-slate-500 font-semibold">{stat.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Global & Level Progression Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-bubbly bg-white p-6 flex flex-col justify-between"
        >
          <div>
            <h4 className="font-fredoka font-bold text-lg text-slate-800 mb-2 flex items-center gap-2">
              <PixelCat variant="cyan" action="items" size={24} />
              Global Game Stats
            </h4>
            <p className="font-nunito text-sm text-slate-500 mb-6">
              Activity across the entire Barcode Hunter universe.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="font-fredoka text-xs text-slate-400 font-bold uppercase block mb-1">
                Database Products
              </span>
              <span className="font-fredoka font-black text-2xl text-slate-700">
                {globalStats ? globalStats.totalProducts : '...'}
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="font-fredoka text-xs text-slate-400 font-bold uppercase block mb-1">
                Total Global Scans
              </span>
              <span className="font-fredoka font-black text-2xl text-slate-700">
                {globalStats ? globalStats.totalScans : '...'}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-bubbly bg-white p-6 flex flex-col justify-between"
        >
          <div>
            <h4 className="font-fredoka font-bold text-lg text-slate-800 mb-2 flex items-center gap-2">
              Level Progression
            </h4>
            <p className="font-nunito text-sm text-slate-500 mb-4">
              Your overall experience level. Every scan and product registration adds XP.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="font-fredoka text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full">
                Level {level}
              </span>
              <span className="font-nunito text-slate-600">{xp} Total XP</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200/50 overflow-hidden">
              <div
                className="bg-brand-cyan h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (xp % 1000) / 10)}%` }}
              />
            </div>
            <p className="font-nunito text-xs text-slate-400 font-medium">
              Keep scanning barcodes to rank up and unlock premium features!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
