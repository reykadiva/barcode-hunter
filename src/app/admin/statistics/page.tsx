'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, ScanLine, TrendingUp, BarChart3, RefreshCw } from 'lucide-react';
import { CATEGORY_EMOJIS } from '@/types';
import { formatDate } from '@/lib/utils';
import type { Statistics } from '@/types';

function StatCard({ label, value, icon: Icon, gradient, delay }: {
  label: string; value: string | number; icon: any; gradient: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <p className="font-nunito text-gray-500 text-sm font-semibold">{label}</p>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="font-fredoka text-3xl font-bold text-gray-800">{value}</p>
    </motion.div>
  );
}

function TrendBar({ date, count, maxCount }: { date: string; count: number; maxCount: number }) {
  const pct = maxCount > 0 ? Math.max(4, (count / maxCount) * 100) : 4;
  const label = new Date(date).toLocaleDateString('en', { weekday: 'short' });
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <span className="font-nunito text-gray-500 text-xs font-semibold">{count}</span>
      <div className="w-full flex items-end justify-center h-24">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="w-full max-w-[32px] bg-gradient-to-t from-yellow-400 to-orange-400 rounded-t-lg"
        />
      </div>
      <span className="font-nunito text-gray-400 text-xs">{label}</span>
    </div>
  );
}

export default function StatisticsPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/statistics');
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const maxTrend = stats?.dailyScanTrend
    ? Math.max(...stats.dailyScanTrend.map((d) => d.count), 1)
    : 1;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-12 lg:pt-0">
        <div>
          <h1 className="font-fredoka text-3xl font-bold text-gray-800 mb-1">Statistics</h1>
          <p className="font-nunito text-gray-500">Analytics and scan trends</p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-nunito font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            className="w-10 h-10 border-3 border-yellow-400 border-t-transparent rounded-full" />
        </div>
      ) : stats ? (
        <div className="space-y-6">
          {/* KPI cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard label="Total Products" value={stats.totalProducts} icon={Package} gradient="from-blue-400 to-blue-600" delay={0} />
            <StatCard label="Total Scans" value={stats.totalScans} icon={ScanLine} gradient="from-yellow-400 to-orange-500" delay={0.1} />
            <StatCard
              label="Most Scanned"
              value={stats.mostScannedProduct ? `${stats.mostScannedProduct.scanCount}×` : '—'}
              icon={TrendingUp}
              gradient="from-green-400 to-emerald-500"
              delay={0.2}
            />
            <StatCard
              label="7-Day Scans"
              value={stats.dailyScanTrend.reduce((a, b) => a + b.count, 0)}
              icon={BarChart3}
              gradient="from-purple-400 to-purple-600"
              delay={0.3}
            />
          </div>

          {/* 7-day trend chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h2 className="font-fredoka text-xl font-bold text-gray-800 mb-6">7-Day Scan Trend</h2>
            <div className="flex items-end gap-2">
              {stats.dailyScanTrend.map(({ date, count }) => (
                <TrendBar key={date} date={date} count={count} maxCount={maxTrend} />
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Most Scanned Product */}
            {stats.mostScannedProduct && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <h2 className="font-fredoka text-xl font-bold text-gray-800 mb-5">⭐ Most Scanned</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center text-4xl border border-yellow-100 overflow-hidden shrink-0">
                    {stats.mostScannedProduct.imageUrl ? (
                      <img src={stats.mostScannedProduct.imageUrl} alt={stats.mostScannedProduct.productName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{CATEGORY_EMOJIS[stats.mostScannedProduct.category ?? 'Other'] ?? '📦'}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-nunito font-bold text-gray-800 truncate">{stats.mostScannedProduct.productName}</p>
                    {stats.mostScannedProduct.brand && (
                      <p className="font-nunito text-gray-500 text-sm">{stats.mostScannedProduct.brand}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full font-nunito font-bold text-sm">
                        <ScanLine className="w-3.5 h-3.5" />
                        {stats.mostScannedProduct.scanCount} scans
                      </span>
                      {stats.mostScannedProduct.category && (
                        <span className="px-2.5 py-1.5 bg-gray-100 text-gray-600 rounded-full font-nunito text-xs font-medium">
                          {CATEGORY_EMOJIS[stats.mostScannedProduct.category]} {stats.mostScannedProduct.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recent Scans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-fredoka text-xl font-bold text-gray-800">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                {stats.recentScans.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="font-nunito text-gray-400 text-sm">No scans yet</p>
                  </div>
                ) : (
                  stats.recentScans.map((scan) => (
                    <div key={scan.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-base shrink-0">
                        {CATEGORY_EMOJIS[scan.product?.category ?? 'Other'] ?? '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-nunito font-semibold text-gray-800 text-xs truncate">
                          {scan.product?.productName ?? 'Unknown'}
                        </p>
                        <p className="font-mono text-gray-400 text-xs">{scan.barcodeNumber}</p>
                      </div>
                      <span className="text-gray-400 text-xs font-nunito shrink-0">
                        {formatDate(scan.scannedAt)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="font-fredoka text-xl text-gray-400">Failed to load statistics</p>
        </div>
      )}
    </div>
  );
}
