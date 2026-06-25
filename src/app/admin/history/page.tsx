'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { History, Search, RefreshCw, Monitor, Smartphone, Tablet, Package } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { CATEGORY_EMOJIS, type ScanLog } from '@/types';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

function DeviceIcon({ type }: { type: string | null }) {
  if (type === 'mobile') return <Smartphone className="w-3.5 h-3.5" />;
  if (type === 'tablet') return <Tablet className="w-3.5 h-3.5" />;
  return <Monitor className="w-3.5 h-3.5" />;
}

export default function HistoryPage() {
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 400);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (debouncedSearch) params.set('search', debouncedSearch);

      const res = await fetch(`/api/history?${params}`);
      const data = await res.json();

      if (data.success) {
        setLogs(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);
  useEffect(() => { setPage(1); }, [debouncedSearch]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-12 lg:pt-0">
        <div>
          <h1 className="font-fredoka text-3xl font-bold text-gray-800 mb-1">Scan History</h1>
          <p className="font-nunito text-gray-500">{total} total scans recorded</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search barcode or product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 font-nunito text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>
        <button onClick={fetchLogs} className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors" title="Refresh">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full" />
          </div>
        ) : logs.length === 0 ? (
          <div className="py-20 text-center">
            <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="font-fredoka text-xl text-gray-400 mb-2">No scan history</p>
            <p className="font-nunito text-gray-400 text-sm">
              {search ? 'No results for your search' : 'Start scanning products to see history here'}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide">Product</th>
                    <th className="text-left px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide hidden sm:table-cell">Barcode</th>
                    <th className="text-left px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">Device</th>
                    <th className="text-left px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide">Scanned At</th>
                    <th className="text-left px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide hidden sm:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {logs.map((log, i) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-base shrink-0">
                            {log.product
                              ? (CATEGORY_EMOJIS[log.product.category ?? 'Other'] ?? '📦')
                              : <Package className="w-4 h-4 text-gray-400" />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-nunito font-semibold text-gray-800 text-sm truncate">
                              {log.product?.productName ?? <span className="text-gray-400 italic">Unknown</span>}
                            </p>
                            {log.product?.brand && (
                              <p className="font-nunito text-gray-400 text-xs truncate">{log.product.brand}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="font-mono text-gray-500 text-xs">{log.barcodeNumber}</span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        {log.deviceType ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-nunito font-medium capitalize">
                            <DeviceIcon type={log.deviceType} />
                            {log.deviceType}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs font-nunito">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-gray-500 text-xs font-nunito">{formatDate(log.scannedAt)}</span>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-nunito font-semibold ${
                          log.product
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {log.product ? '✓ Found' : '✗ Not Found'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="font-nunito text-gray-500 text-sm">Page {page} of {totalPages} ({total} total)</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-nunito hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >Prev</button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-nunito hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >Next</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
