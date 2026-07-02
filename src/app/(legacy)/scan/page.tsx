'use client';

import { useRouter } from 'next/navigation';
import { BarcodeScanner } from '@/components/scanner/barcode-scanner';
import { usePlayerStore } from '@/stores/legacy/player-store';
import { ScanLine } from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const recordScan = usePlayerStore((state) => state.recordScan);

  return (
    <main className="h-[100dvh] overflow-hidden bg-mesh-soft flex flex-col">
      {/* Minimal header */}
      <div className="flex items-center justify-between px-4 py-3 z-50 relative">
        <Link href="/play" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-[1rem] flex items-center justify-center card-bubbly">
            <ScanLine className="w-5 h-5 text-brand-cyan" />
          </div>
          <span className="font-fredoka font-bold text-slate-800 text-xl tracking-tight hidden sm:block">Scan Chan</span>
        </Link>
        <div className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-sm">
          <span className="text-slate-700 text-sm font-fredoka font-semibold tracking-wide">Scanner Active</span>
        </div>
      </div>

      {/* Full-area scanner */}
      <div className="flex-1 relative px-4 pb-6 flex items-center justify-center">
        <BarcodeScanner
          fullscreen={false}
          onClose={() => router.push('/play')}
          onScanComplete={(barcodeText, result) => {
            recordScan(
              barcodeText,
              !result.found,
              result.product?.category || 'Other'
            );
          }}
        />
      </div>
    </main>
  );
}
