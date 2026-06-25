'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Package, Edit2, Trash2, Eye, ScanLine, RefreshCw } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { CATEGORY_EMOJIS, CATEGORIES, type Product } from '@/types';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 400);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (category) params.set('category', category);

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { setPage(1); }, [debouncedSearch, category]);

  const handleDelete = async (barcode: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(barcode);
    try {
      const res = await fetch(`/api/products/${barcode}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Product deleted');
        fetchProducts();
      } else {
        toast.error(data.error || 'Delete failed');
      }
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-12 lg:pt-0">
        <div>
          <h1 className="font-fredoka text-3xl font-bold text-gray-800 mb-1">Products</h1>
          <p className="font-nunito text-gray-500">{total} products registered</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-nunito font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products or barcodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 font-nunito text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 font-nunito text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{CATEGORY_EMOJIS[c]} {c}</option>
          ))}
        </select>
        <button
          onClick={fetchProducts}
          className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full"
            />
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="font-fredoka text-xl text-gray-400 mb-2">No products found</p>
            <p className="font-nunito text-gray-400 text-sm mb-6">
              {search || category ? 'Try adjusting your filters' : 'Start by adding your first product!'}
            </p>
            {!search && !category && (
              <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-5 py-3 bg-yellow-400 text-gray-900 rounded-xl font-nunito font-bold text-sm hover:bg-yellow-500 transition-colors">
                <Plus className="w-4 h-4" /> Add First Product
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide">Product</th>
                    <th className="text-left px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide hidden sm:table-cell">Barcode</th>
                    <th className="text-left px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">Category</th>
                    <th className="text-left px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide hidden lg:table-cell">Added</th>
                    <th className="text-right px-5 py-3 font-nunito font-semibold text-gray-500 text-xs uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <AnimatePresence>
                    {products.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg shrink-0 overflow-hidden">
                              {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover" />
                              ) : (
                                <span>{CATEGORY_EMOJIS[product.category ?? 'Other'] ?? '📦'}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-nunito font-semibold text-gray-800 text-sm truncate">{product.productName}</p>
                              {product.brand && <p className="font-nunito text-gray-400 text-xs truncate">{product.brand}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="font-mono text-gray-500 text-xs">{product.barcodeNumber}</span>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          {product.category ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-nunito font-medium">
                              {CATEGORY_EMOJIS[product.category] ?? '📦'} {product.category}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-xs font-nunito">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-gray-400 text-xs font-nunito">{formatDate(product.createdAt)}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link href={`/product/${product.barcodeNumber}`} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link href={`/admin/products/edit/${product.id}`} className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center hover:bg-yellow-100 transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product.barcodeNumber, product.productName)}
                              disabled={deleting === product.barcodeNumber}
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="font-nunito text-gray-500 text-sm">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-nunito hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-nunito hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
