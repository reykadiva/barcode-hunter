export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { CATEGORY_EMOJIS } from '@/types';
import { Package, ScanLine, TrendingUp, Clock, Plus, BarChart3, History } from 'lucide-react';


export default async function AdminDashboard() {
  const [totalProducts, totalScans, recentScans, topBarcode] = await Promise.all([
    prisma.product.count(),
    prisma.scanLog.count(),
    prisma.scanLog.findMany({
      take: 5,
      orderBy: { scannedAt: 'desc' },
      include: { product: true },
    }),
    prisma.scanLog.groupBy({
      by: ['barcodeNumber'],
      _count: { barcodeNumber: true },
      orderBy: { _count: { barcodeNumber: 'desc' } },
      take: 1,
    }),
  ]);

  let mostScanned = null;
  if (topBarcode.length > 0) {
    mostScanned = await prisma.product.findUnique({
      where: { barcodeNumber: topBarcode[0].barcodeNumber },
    });
  }

  const STATS = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Total Scans', value: totalScans, icon: ScanLine, color: 'from-yellow-400 to-orange-500', bg: 'bg-yellow-50', text: 'text-yellow-600' },
    { label: 'Most Scanned', value: mostScanned?.productName ?? '—', icon: TrendingUp, color: 'from-green-400 to-emerald-500', bg: 'bg-green-50', text: 'text-green-600', isText: true },
    { label: 'Last Scan', value: recentScans[0] ? formatDate(recentScans[0].scannedAt) : '—', icon: Clock, color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-600', isText: true },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 pt-12 lg:pt-0">
        <h1 className="font-fredoka text-3xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <p className="font-nunito text-gray-500">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {STATS.map(({ label, value, icon: Icon, color, bg, text, isText }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <p className="font-nunito text-gray-500 text-sm font-semibold">{label}</p>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className={`font-fredoka text-3xl font-bold text-gray-800 ${isText ? 'text-lg truncate' : ''}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/products/new" className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-5 flex items-center gap-4 text-white hover:scale-105 transition-all duration-200 shadow-md">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <p className="font-fredoka font-bold text-lg">Add Product</p>
            <p className="font-nunito text-white/80 text-sm">Register new barcode</p>
          </div>
        </Link>
        <Link href="/admin/statistics" className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl p-5 flex items-center gap-4 text-white hover:scale-105 transition-all duration-200 shadow-md">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <p className="font-fredoka font-bold text-lg">Statistics</p>
            <p className="font-nunito text-white/80 text-sm">View analytics</p>
          </div>
        </Link>
        <Link href="/admin/history" className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl p-5 flex items-center gap-4 text-white hover:scale-105 transition-all duration-200 shadow-md">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <History className="w-6 h-6" />
          </div>
          <div>
            <p className="font-fredoka font-bold text-lg">Scan History</p>
            <p className="font-nunito text-white/80 text-sm">Recent activity</p>
          </div>
        </Link>
      </div>

      {/* Recent scans */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-fredoka text-xl font-bold text-gray-800">Recent Scans</h2>
          <Link href="/admin/history" className="text-sm font-nunito font-semibold text-blue-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentScans.length === 0 ? (
            <div className="py-12 text-center">
              <ScanLine className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="font-nunito text-gray-400">No scans yet. Start scanning!</p>
            </div>
          ) : (
            recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                  {CATEGORY_EMOJIS[scan.product?.category ?? 'Other'] ?? '📦'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-nunito font-semibold text-gray-800 text-sm truncate">
                    {scan.product?.productName ?? 'Unknown Product'}
                  </p>
                  <p className="font-mono text-gray-400 text-xs">{scan.barcodeNumber}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-nunito text-gray-400 text-xs">{formatDate(scan.scannedAt)}</p>
                  {scan.deviceType && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-nunito">
                      {scan.deviceType}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
