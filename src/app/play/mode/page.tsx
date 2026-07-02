'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Link from 'next/link';

import { usePlayerStore } from '@/stores/player-store';
import { GameMode } from '@/lib/game-config';
import { PixelCat } from '@/components/pixel-cat';

export default function ModeSelectionPage() {
  const router = useRouter();
  const setMode = usePlayerStore((state) => state.setMode);

  const handleSelectGuest = () => {
    setMode(GameMode.GUEST);
    router.push('/play');
  };

  return (
    <main className="min-h-screen bg-mesh-soft flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        className="w-full max-w-2xl text-center z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 bg-white rounded-[1.2rem] flex items-center justify-center card-bubbly shadow-md overflow-hidden">
            <PixelCat variant="calico" action="scan" size={48} />
          </div>
          <span className="font-fredoka font-bold text-3xl text-slate-800 tracking-tight">
            Scan Chan
          </span>
        </div>

        <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Choose Game Mode
        </h1>
        <p className="font-nunito text-lg text-slate-600 mb-12 max-w-md mx-auto font-medium">
          Select how you want to play Scan Chan today.
        </p>

        {/* Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Guest Mode */}
          <motion.button
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSelectGuest}
            className="card-bubbly bg-white p-8 flex flex-col text-left justify-between h-64 border-none hover:border-brand-cyan hover:shadow-lg transition-all group"
          >
            <div className="w-14 h-14 bg-brand-cyan/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-cyan/20 transition-colors overflow-hidden">
              <PixelCat variant="guest-smiling" size={48} aria-label="Guest Mode" />
            </div>
            <div>
              <h2 className="font-fredoka text-2xl font-bold text-slate-800 mb-2">Guest</h2>
              <p className="font-nunito text-slate-600 font-medium">
                Play instantly without logging in.
              </p>
            </div>
          </motion.button>

          {/* Arashu's Mode */}
          <Link href="/play/mode/arashu-login" className="block w-full">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="card-bubbly bg-white p-8 flex flex-col justify-between h-64 border-none hover:border-brand-pink hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-brand-pink/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-pink/20 transition-colors overflow-hidden">
                <PixelCat variant="arashu-smiling" size={48} aria-label="Arashu's Mode" />
              </div>
              <div>
                <h2 className="font-fredoka text-2xl font-bold text-slate-800 mb-2">Arashu&apos;s</h2>
                <p className="font-nunito text-slate-600 font-medium">
                  For dev&apos;s gf only.
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="font-fredoka font-semibold text-slate-500 hover:text-slate-700 text-base transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
