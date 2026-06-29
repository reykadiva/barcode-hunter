'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { usePlayerStore } from '@/stores/player-store';
import { Sparkles } from 'lucide-react';
import { PixelCat, CAT_PALETTES, type CatVariantId } from '@/components/pixel-cat';

const CAT_VARIANTS: CatVariantId[] = ['calico', 'gray', 'cyan', 'pink', 'black'];

interface NicknameSetupProps {
  onComplete: () => void;
}

export function NicknameSetup({ onComplete }: NicknameSetupProps) {
  const [nickname, setNickname] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<CatVariantId>('calico');
  const initializePlayer = usePlayerStore((state) => state.initializePlayer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    initializePlayer(nickname.trim(), selectedVariant);
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
        className="bg-white rounded-[2.5rem] card-bubbly max-w-md w-full p-8 md:p-10 shadow-2xl relative overflow-hidden border-none"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-cyan/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brand-pink/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          {/* Show selected cat as the header icon */}
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-slate-100 shadow-inner">
            <PixelCat variant={selectedVariant} size={52} />
          </div>
          <h2 className="font-fredoka text-3xl font-bold text-slate-800 mb-2">Create Character</h2>
          <p className="font-nunito text-slate-600 font-medium">Pick your cat companion to start hunting!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Cat variant picker */}
          <div>
            <label className="block font-fredoka font-semibold text-slate-700 text-sm mb-3">
              Choose Your Cat
            </label>
            <div className="grid grid-cols-5 gap-2">
              {CAT_VARIANTS.map((variant) => {
                const isSelected = selectedVariant === variant;
                return (
                  <button
                    type="button"
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    title={CAT_PALETTES[variant].label}
                    className={`relative flex flex-col items-center gap-1.5 p-2.5 rounded-2xl transition-all duration-150 card-bubbly ${
                      isSelected
                        ? 'bg-brand-cyan/20 ring-2 ring-brand-cyan scale-110 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 hover:scale-105'
                    }`}
                  >
                    <PixelCat variant={variant} size={36} />
                    <span
                      className={`font-fredoka text-[10px] font-bold leading-none ${
                        isSelected ? 'text-brand-cyan' : 'text-slate-500'
                      }`}
                    >
                      {CAT_PALETTES[variant].label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nickname input */}
          <div>
            <label htmlFor="nickname" className="block font-fredoka font-semibold text-slate-700 text-sm mb-2">
              Nickname
            </label>
            <input
              id="nickname"
              type="text"
              required
              maxLength={15}
              placeholder="Enter your name..."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10 transition-all text-lg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!nickname.trim()}
            className="w-full btn-bubbly bg-brand-cyan text-white py-4 text-xl flex items-center justify-center gap-2 hover:bg-brand-cyan-light disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5" />
            Let&apos;s Play!
          </button>
        </form>
      </motion.div>
    </div>
  );
}
