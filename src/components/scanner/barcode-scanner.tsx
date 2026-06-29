'use client';

import { useState, useCallback, useEffect } from 'react';
import { useZxing } from 'react-zxing';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw } from 'lucide-react';
import { ScanOverlay } from './scan-overlay';
import { ScanResult } from './scan-result';
import { useSound } from '@/hooks/use-sound';
import { getDeviceType } from '@/lib/utils';
import type { ScanResult as ScanResultType } from '@/types';
import { usePlayerStore } from '@/stores/player-store';

interface BarcodeScannerProps {
  onClose?: () => void;
  fullscreen?: boolean;
  onScanSuccess?: (barcodeText: string) => void;
}

export function BarcodeScanner({ onClose, fullscreen = false, onScanSuccess }: BarcodeScannerProps) {
  const [result, setResult] = useState<ScanResultType | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { playSound } = useSound();
  const recordScan = usePlayerStore((state) => state.recordScan);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    // Enumerate devices once mounted
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      setDevices(videoDevices);
    }).catch(console.error);
  }, []);

  const switchCamera = () => {
    if (devices.length > 1) {
      const currentIndex = devices.findIndex(d => d.deviceId === deviceId);
      const nextIndex = (currentIndex + 1) % devices.length;
      setDeviceId(devices[nextIndex].deviceId);
    }
  };

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
          
          // Record the scan in player store
          recordScan(
            barcodeText,
            !data.data.found,
            data.data.product?.category || 'Other'
          );
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
    [isLoading, result, playSound, recordScan]
  );

  const { ref } = useZxing({
    paused: !isScanning,
    timeBetweenDecodingAttempts: 100, // 🔥 Super fast scanning!
    formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39'], // Restrict to retail barcodes for performance
    trySkew: true, // Helps with slightly tilted barcodes
    constraints: {
      video: deviceId 
        ? { deviceId: { exact: deviceId }, width: { ideal: 1280, min: 640 }, height: { ideal: 720, min: 480 } }
        : { facingMode: 'environment', width: { ideal: 1280, min: 640 }, height: { ideal: 720, min: 480 } }
    },
    onDecodeResult(decodedResult) {
      // react-zxing v3 uses Barcode Detection API — result has rawValue
      const text = typeof decodedResult === 'string'
        ? decodedResult
        : (decodedResult as { rawValue?: string; getText?: () => string }).rawValue
          ?? (decodedResult as { rawValue?: string; getText?: () => string }).getText?.()
          ?? '';
      if (text) {
        playSound('beep');
        if (onScanSuccess) {
          onScanSuccess(text);
        } else {
          handleScan(text);
        }
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
      className={`relative overflow-hidden bg-slate-100 flex items-center justify-center ${
        fullscreen ? 'fixed inset-0 z-50' : 'w-full h-full rounded-[2.5rem] card-bubbly'
      }`}
    >
      {/* Camera feed */}
      <video ref={ref} className="absolute inset-0 w-full h-full object-cover" playsInline muted />

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
          <ScanResult result={result} onScanAgain={handleReset} />
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
            <div className="card-bubbly p-8 max-w-sm w-full text-center">
              <div className="w-20 h-20 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-brand-pink/30">
                <X className="w-10 h-10 text-pink-500" />
              </div>
              <h3 className="text-2xl font-fredoka font-bold text-slate-800 mb-2">Oops!</h3>
              <p className="text-slate-600 font-nunito mb-6 font-medium">{error}</p>
              <button
                onClick={handleReset}
                className="btn-bubbly px-8 py-4 bg-brand-cyan text-white text-lg w-full"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Switch Camera Button */}
      {devices.length > 1 && (
        <button
          onClick={switchCamera}
          aria-label="Switch camera"
          className="absolute top-6 left-6 z-30 w-12 h-12 card-bubbly flex items-center justify-center text-slate-700 hover:text-brand-cyan hover:scale-110 transition-all shadow-lg"
        >
          <RefreshCw className="w-6 h-6" strokeWidth={3} />
        </button>
      )}

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close scanner"
          className="absolute top-6 right-6 z-30 w-12 h-12 card-bubbly flex items-center justify-center text-slate-700 hover:text-brand-pink hover:scale-110 transition-all"
        >
          <X className="w-6 h-6" strokeWidth={3} />
        </button>
      )}

    </div>
  );
}
