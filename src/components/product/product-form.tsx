'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import { Upload, X, ScanLine, Save, ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { CATEGORIES, CATEGORY_EMOJIS, type Product } from '@/types';
import { toast } from 'sonner';
import { WebcamCapture } from './webcam-capture';

interface ProductFormProps {
  initialData?: Partial<Product>;
  mode: 'create' | 'edit';
  defaultBarcode?: string;
}

const Field = ({
  id, label, required, error, children,
}: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="block font-nunito font-semibold text-gray-700 text-sm mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
    {error && <p className="mt-1.5 text-red-500 text-xs font-nunito">{error}</p>}
  </div>
);

export function ProductForm({ initialData, mode, defaultBarcode }: ProductFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    barcodeNumber: initialData?.barcodeNumber ?? defaultBarcode ?? '',
    productName: initialData?.productName ?? '',
    brand: initialData?.brand ?? '',
    category: initialData?.category ?? '',
    description: initialData?.description ?? '',
    imageUrl: initialData?.imageUrl ?? '',
  });

  const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl ?? '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.barcodeNumber.trim()) newErrors.barcodeNumber = 'Barcode number is required';
    if (!form.productName.trim()) newErrors.productName = 'Product name is required';
    if (form.barcodeNumber && !/^[0-9A-Za-z-]+$/.test(form.barcodeNumber)) {
      newErrors.barcodeNumber = 'Barcode contains invalid characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Invalid file type. Use JPEG, PNG, or WebP.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum 5MB.');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    uploadImage(file);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleWebcamCapture = (file: File) => {
    setShowWebcam(false);
    handleFile(file);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      if (form.barcodeNumber) fd.append('barcode', form.barcodeNumber);

      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();

      if (data.success) {
        set('imageUrl', data.data.url);
        toast.success('Image uploaded!');
      } else {
        toast.error(data.error || 'Upload failed');
        setImagePreview('');
      }
    } catch {
      toast.error('Upload failed');
      setImagePreview('');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);

    try {
      const payload = {
        barcodeNumber: form.barcodeNumber.trim(),
        productName: form.productName.trim(),
        brand: form.brand.trim() || null,
        category: form.category || null,
        description: form.description.trim() || null,
        imageUrl: form.imageUrl || null,
      };

      let res: Response;
      if (mode === 'create') {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { barcodeNumber: _bc, ...updatePayload } = payload;
        res = await fetch(`/api/products/${initialData!.barcodeNumber}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload),
        });
      }

      const data = await res.json();

      if (data.success) {
        toast.success(mode === 'create' ? 'Product registered!' : 'Product updated!');
        router.push('/admin/products');
        router.refresh();
      } else if (res.status === 409) {
        setErrors({ barcodeNumber: 'A product with this barcode already exists' });
        toast.error('Barcode already exists');
      } else {
        toast.error(data.error || 'Save failed');
      }
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };



  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded-xl border font-nunito text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${
      hasError ? 'border-red-300 bg-red-50' : 'border-gray-200'
    }`;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pt-12 lg:pt-0">
        <Link href="/admin/products" className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-fredoka text-3xl font-bold text-gray-800">
            {mode === 'create' ? 'Register Product' : 'Edit Product'}
          </h1>
          <p className="font-nunito text-gray-500 text-sm">
            {mode === 'create' ? 'Add a new product to the database' : 'Update product information'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} id="product-form">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Main fields */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-fredoka text-lg font-bold text-gray-700 border-b border-gray-100 pb-3">
                Product Information
              </h2>

              <Field id="barcodeNumber" label="Barcode Number" required error={errors.barcodeNumber}>
                <div className="flex gap-2">
                  <input
                    id="barcodeNumber"
                    type="text"
                    value={form.barcodeNumber}
                    onChange={(e) => set('barcodeNumber', e.target.value)}
                    placeholder="e.g. 8996001600267"
                    disabled={mode === 'edit'}
                    className={`${inputClass(!!errors.barcodeNumber)} ${mode === 'edit' ? 'bg-gray-50 text-gray-500' : ''} flex-1 font-mono`}
                  />
                  {mode === 'create' && (
                    <Link href="/scan" className="px-4 py-3 bg-yellow-400 rounded-xl text-gray-900 font-nunito font-semibold text-sm hover:bg-yellow-500 transition-colors flex items-center gap-1.5 whitespace-nowrap">
                      <ScanLine className="w-4 h-4" /> Scan
                    </Link>
                  )}
                </div>
              </Field>

              <Field id="productName" label="Product Name" required error={errors.productName}>
                <input
                  id="productName"
                  type="text"
                  value={form.productName}
                  onChange={(e) => set('productName', e.target.value)}
                  placeholder="e.g. Chitato Lite BBQ"
                  className={inputClass(!!errors.productName)}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="brand" label="Brand">
                  <input
                    id="brand"
                    type="text"
                    value={form.brand}
                    onChange={(e) => set('brand', e.target.value)}
                    placeholder="e.g. Indofood"
                    className={inputClass()}
                  />
                </Field>

                <Field id="category" label="Category">
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                    className={`${inputClass()} bg-white`}
                  >
                    <option value="">Select category...</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{CATEGORY_EMOJIS[c]} {c}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field id="description" label="Description">
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Brief product description..."
                  rows={4}
                  className={`${inputClass()} resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* Right: Image */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-fredoka text-lg font-bold text-gray-700 border-b border-gray-100 pb-3 mb-5">
                Product Image
              </h2>

              {/* Image preview */}
              <div
                onClick={() => !uploading && fileRef.current?.click()}
                className="relative aspect-square rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-all overflow-hidden"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
                    <p className="text-gray-500 text-sm font-nunito">Uploading...</p>
                  </div>
                ) : imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setImagePreview(''); set('imageUrl', ''); }}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <ImageIcon className="w-10 h-10" />
                    <div className="text-center">
                      <p className="font-nunito font-semibold text-sm">Click to upload</p>
                      <p className="font-nunito text-xs">JPEG, PNG, WebP — max 5MB</p>
                    </div>
                  </div>
                )}
              </div>

              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="hidden" />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full py-2.5 border border-gray-200 rounded-xl text-gray-600 font-nunito font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setShowWebcam(true)}
                  disabled={uploading}
                  className="w-full py-2.5 border border-yellow-200 bg-yellow-50 rounded-xl text-yellow-700 font-nunito font-semibold text-sm hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2"
                >
                  <ScanLine className="w-4 h-4" />
                  Camera
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving || uploading}
              id="product-save-btn"
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl font-nunito font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {mode === 'create' ? 'Register Product' : 'Save Changes'}
                </>
              )}
            </button>

            <Link href="/admin/products" className="block w-full py-3 text-center border border-gray-200 rounded-xl text-gray-600 font-nunito font-semibold text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </Link>
          </div>
        </div>
      </form>

      {/* Custom Webcam Modal for Desktop & Mobile */}
      <AnimatePresence>
        {showWebcam && (
          <WebcamCapture 
            onCapture={handleWebcamCapture} 
            onClose={() => setShowWebcam(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
