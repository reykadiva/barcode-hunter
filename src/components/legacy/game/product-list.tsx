import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Trash2, Loader2, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/types';
import { CATEGORIES } from '@/types';
import { PixelCat } from '@/components/legacy/pixel-cat';
import { useDebounce } from '@/hooks/use-debounce';
import { getCategoryVariant } from '@/lib/legacy/game-utils';

interface ProductListProps {
  creatorId: string;
  onProductDeleted: (barcode: string) => void;
}

const PAGE_LIMIT = 12;

export function ProductList({ creatorId, onProductDeleted }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deletingBarcode, setDeletingBarcode] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_LIMIT),
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(category && { category }),
        });
        const res = await fetch(`/api/products?${params}`);
        const data = await res.json();
        if (data.success && active) {
          setProducts(data.data);
          setTotal(data.total);
        }
      } catch {
        toast.error('Failed to load products');
      } finally {
        if (active) setIsLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [page, debouncedSearch, category, refreshKey]);

  const handleDelete = async (product: Product) => {
    if (deletingBarcode) return;
    setDeletingBarcode(product.barcodeNumber);
    try {
      const res = await fetch(`/api/products/${product.barcodeNumber}`, {
        method: 'DELETE',
        headers: { 'x-creator-id': creatorId },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Delete failed');
      toast.success('Product deleted');
      onProductDeleted(product.barcodeNumber);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingBarcode(null);
    }
  };

  const totalPages = Math.ceil(total / PAGE_LIMIT);

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 transition-all text-sm bg-white"
          />
        </div>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="appearance-none pl-4 pr-10 py-3 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-700 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 transition-all text-sm bg-white w-full sm:w-auto"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2.5} />
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="card-bubbly bg-white p-12 text-center">
          <PixelCat variant="gray" action="items" size={64} className="mx-auto mb-4" />
          <p className="font-fredoka text-xl font-bold text-slate-500 mb-1">No products found</p>
          <p className="font-nunito text-slate-400 text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            const isOwner = !!creatorId && product.creatorId === creatorId;
            const isDeleting = deletingBarcode === product.barcodeNumber;
            const catVariant = getCategoryVariant(product.category);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-bubbly bg-white p-4 flex gap-4 items-start"
              >
                {/* Image or emoji replacement */}
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover" />
                  ) : (
                    <PixelCat variant={catVariant} size={38} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-fredoka font-bold text-slate-800 text-sm leading-tight line-clamp-1">
                    {product.productName}
                  </p>
                  {product.brand && (
                    <p className="font-nunito text-slate-500 text-xs mt-0.5">{product.brand}</p>
                  )}
                  {product.category && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-brand-yellow/30 text-yellow-800 rounded-full text-xs font-fredoka font-semibold">
                      {product.category}
                    </span>
                  )}
                  <p className="font-mono text-slate-400 text-xs mt-1.5">{product.barcodeNumber}</p>
                </div>

                {isOwner && (
                  <button
                    onClick={() => handleDelete(product)}
                    disabled={isDeleting}
                    title="Delete product"
                    className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors shrink-0 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-3.5 h-3.5 text-red-500 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5 text-red-500" strokeWidth={2.5} />
                    )}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="font-nunito text-slate-500 text-sm font-semibold">
            {total} product{total !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-xl card-bubbly bg-white flex items-center justify-center disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <span className="font-fredoka font-semibold text-slate-700 text-sm px-2">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-xl card-bubbly bg-white flex items-center justify-center disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
