'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X, Package, Upload, Loader2, ScanLine, Camera, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/types';
import { useSound } from '@/hooks/use-sound';
import { toast } from 'sonner';
import { BarcodeScanner } from '../scanner/barcode-scanner';
import { WebcamCapture } from '../product/webcam-capture';

interface RegisterProductModalProps {
  initialBarcode?: string;
  creatorId: string;
  onClose: () => void;
  onSuccess: (barcode: string) => void;
}

export function RegisterProductModal({
  initialBarcode = '',
  creatorId,
  onClose,
  onSuccess,
}: RegisterProductModalProps) {
  const { playSound } = useSound();

  const [form, setForm] = useState({
    barcodeNumber: initialBarcode,
    productName: '',
    brand: '',
    category: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScanningBarcode, setIsScanningBarcode] = useState(false);
  const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let imageUrl: string | null = null;

      // Upload image first if one was selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('barcode', form.barcodeNumber);

        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        if (!uploadData.success) throw new Error(uploadData.error || 'Image upload failed');
        imageUrl = uploadData.data.url;
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          barcodeNumber: form.barcodeNumber,
          productName: form.productName,
          brand: form.brand || null,
          category: form.category || null,
          description: form.description || null,
          imageUrl,
          creatorId,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Registration failed');

      playSound('success');
      toast.success('Product registered!', { description: form.productName });
      onSuccess(form.barcodeNumber);
    } catch (err) {
      playSound('error');
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 40 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
        className="bg-white rounded-[2rem] card-bubbly w-full max-w-lg max-h-[90dvh] overflow-y-auto shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white rounded-t-[2rem] z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-pink/10 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-brand-pink" strokeWidth={2.5} />
            </div>
            <h2 className="font-fredoka text-xl font-bold text-slate-800">Register Product</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Barcode */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-fredoka font-semibold text-slate-700 text-sm">
                Barcode Number <span className="text-brand-pink">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsScanningBarcode(true)}
                className="text-xs font-fredoka font-bold text-brand-cyan hover:underline flex items-center gap-1.5"
              >
                <ScanLine className="w-3.5 h-3.5" />
                Scan Barcode
              </button>
            </div>
            <input
              type="text"
              required
              maxLength={20}
              value={form.barcodeNumber}
              onChange={(e) => setForm({ ...form, barcodeNumber: e.target.value })}
              placeholder="e.g. 8991234567890"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 transition-all text-sm font-mono"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block font-fredoka font-semibold text-slate-700 text-sm mb-2">
              Product Name <span className="text-brand-pink">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={255}
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
              placeholder="e.g. Oreo Double Stuf"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 transition-all text-sm"
            />
          </div>

          {/* Brand + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-fredoka font-semibold text-slate-700 text-sm mb-2">Brand</label>
              <input
                type="text"
                maxLength={255}
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="e.g. Nabisco"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block font-fredoka font-semibold text-slate-700 text-sm mb-2">Category</label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="appearance-none w-full pl-4 pr-10 py-3 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-800 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 transition-all text-sm bg-white"
                >
                  <option value="">Select...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-fredoka font-semibold text-slate-700 text-sm mb-2">Description</label>
            <textarea
              maxLength={500}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief product description..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 font-nunito font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 transition-all text-sm resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-fredoka font-semibold text-slate-700 text-sm mb-2">Product Photo</label>
            {imagePreview ? (
              <div className="relative w-full h-36 rounded-2xl overflow-hidden border-2 border-slate-200">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-slate-600" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-brand-cyan hover:bg-brand-cyan/5 transition-colors gap-2 text-center p-3">
                  <Upload className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-500 font-nunito text-xs font-semibold">Upload Photo</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImageChange} />
                </label>
                <button
                  type="button"
                  onClick={() => setIsCapturingPhoto(true)}
                  className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-brand-pink hover:bg-brand-pink/5 transition-colors gap-2 text-center p-3 bg-white"
                >
                  <Camera className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-500 font-nunito text-xs font-semibold">Take Photo</span>
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-bubbly bg-brand-pink text-white py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Registering...</>
            ) : (
              <><Package className="w-5 h-5" /> Register Product</>
            )}
          </button>
        </form>
      </motion.div>

      {/* Barcode scanner sub-overlay */}
      {isScanningBarcode && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999]">
          <BarcodeScanner
            onClose={() => setIsScanningBarcode(false)}
            onScanSuccess={(text) => {
              setForm((prev) => ({ ...prev, barcodeNumber: text }));
              setIsScanningBarcode(false);
            }}
          />
        </div>,
        document.body
      )}

      {/* Camera Capture sub-overlay */}
      {isCapturingPhoto && typeof document !== 'undefined' && createPortal(
        <WebcamCapture
          onCapture={(file) => {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setIsCapturingPhoto(false);
          }}
          onClose={() => setIsCapturingPhoto(false)}
        />,
        document.body
      )}
    </div>
  );
}
