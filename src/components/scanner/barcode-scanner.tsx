'use client';

import { useState, useCallback } from 'react';
import { useZxing } from 'react-zxing';
import { motion, AnimatePresence } from 'motion/react';
import { X, ScanLine } from 'lucide-react';
import { ScanOverlay } from './scan-overlay';
import { ScanResult } from './scan-result';
import { useSound } from '@/hooks/use-sound';
import { getDeviceType } from '@/lib/utils';
import type { ScanResult as ScanResultType } from '@/types';

interface BarcodeScannerProps {
  onClose?: () => void;
  fullscreen?: boolean;
}

export function BarcodeScanner({ onClose, fullscreen = false }: BarcodeScannerProps) {
  const [result, setResult] = useState<ScanResultType | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { playSound } = useSound();

  const handleScan = useCallback(
    async (barcodeText: string) => {
      if (isLoading || result) return;
      setIsLoading(true);
      setIsScanning(false);

      try {
        const response = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            barcodeNumber: barcodeText,
            deviceType: getDeviceType(),
          }),
        });
        const data = await response.json();

        if (data.success) {
          setResult(data.data);
          playSound(data.data.found ? 'success' : 'error');
        } else {
          setError(data.error || 'Scan failed');
          playSound('error');
        }
      } catch {
        setError('Network error. Please try again.');
        playSound('error');
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, result, playSound]
  );

  const { ref } = useZxing({
    paused: !isScanning,
    onDecodeResult(decodedResult) {
      // react-zxing v3 uses Barcode Detection API — result has rawValue
      const text = typeof decodedResult === 'string'
        ? decodedResult
        : (decodedResult as any).rawValue ?? (decodedResult as any).getText?.() ?? '';
      if (text) {
        playSound('beep');
        handleScan(text);
      }
    },

    onError(err) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions and refresh.');
        setIsScanning(false);
      }
    },
  });

  const handleReset = () => {
    setResult(null);
    setError(null);
    setIsScanning(true);
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-900 ${
        fullscreen ? 'fixed inset-0 z-50' : 'w-full aspect-[4/3] rounded-3xl'
      }`}
    >
      {/* Camera feed */}
      <video ref={ref} className="w-full h-full object-cover" playsInline muted />

      {/* Scan overlay */}
      {isScanning && !isLoading && <ScanOverlay />}

      {/* Loading */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20 gap-5"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
              className="w-14 h-14 rounded-full border-4 border-yellow-400 border-t-transparent"
            />
            <p className="text-white font-nunito text-lg font-medium">Looking up barcode...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan result overlay */}
      <AnimatePresence>
        {result && (
          <ScanResult result={result} onScanAgain={handleReset} onClose={onClose} />
        )}
      </AnimatePresence>

      {/* Error overlay */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center z-20 p-6"
          >
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-2">Oops!</h3>
              <p className="text-gray-600 font-nunito mb-6 text-sm">{error}</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-nunito font-semibold hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close scanner"
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Bottom tip */}
      {isScanning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 left-0 right-0 flex justify-center z-10"
        >
          <div className="px-5 py-2.5 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-2">
            <ScanLine className="w-4 h-4 text-yellow-400" />
            <p className="text-white font-nunito text-sm">Point camera at a barcode</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
