'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePlayerStore } from '@/stores/player-store';
import { GAME_CONFIG } from '@/lib/game-config';

export function XpPopup() {
  const pendingXpGain = usePlayerStore((state) => state.pendingXpGain);
  const scanHistory = usePlayerStore((state) => state.scanHistory);
  const registeredBarcodes = usePlayerStore((state) => state.registeredBarcodes);
  const clearPendingXpGain = usePlayerStore((state) => state.clearPendingXpGain);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pendingXpGain <= 0) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      clearPendingXpGain();
    }, GAME_CONFIG.ui.xpPopupDurationMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pendingXpGain, clearPendingXpGain]);

  const key = `${pendingXpGain}-${scanHistory.length}-${registeredBarcodes.length}`;

  return (
    <AnimatePresence mode="wait">
      {pendingXpGain > 0 && (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{ opacity: 1, y: -48, scale: 1 }}
          exit={{ opacity: 0, y: -80, scale: 0.8 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.5 }}
          className="pointer-events-none fixed bottom-28 right-6 z-50"
        >
          <div className="bg-brand-yellow text-amber-900 rounded-full px-5 py-2 shadow-lg flex items-center gap-2 card-bubbly border-2 border-yellow-300">
            <span className="text-base font-fredoka font-black tracking-tight">
              +{pendingXpGain} XP ⚡
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
