'use client';

import { useRouter } from 'next/navigation';
import { BarcodeScanner } from '@/components/scanner/barcode-scanner';
import { ScanLine } from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col">
      {/* Minimal header */}
      <div className="flex items-center justify-between px-4 py-3 z-50 relative">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <ScanLine className="w-4 h-4 text-white" />
          </div>
          <span className="font-fredoka font-bold text-white text-base">Barcode Adventure</span>
        </Link>
        <div className="px-3 py-1.5 bg-white/10 rounded-full">
          <span className="text-white/70 text-xs font-nunito">Scanner</span>
        </div>
      </div>

      {/* Full-area scanner */}
      <div className="flex-1 relative">
        <BarcodeScanner fullscreen={false} onClose={() => router.push('/')} />
      </div>
    </main>
  );
}
