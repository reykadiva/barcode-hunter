import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePlayerStore } from '@/stores/player-store';
import { GAME_ACHIEVEMENTS } from '@/lib/game-engine';
import { useSound } from '@/hooks/use-sound';
import { PixelCat } from '@/components/pixel-cat';
import { getAchievementBadge } from '@/lib/game-utils';

export function AchievementPopup() {
  const pendingAchievementUnlocks = usePlayerStore((state) => state.pendingAchievementUnlocks);
  const clearPendingAchievementUnlocks = usePlayerStore((state) => state.clearPendingAchievementUnlocks);
  const { playSound } = useSound();

  const currentUnlockId = pendingAchievementUnlocks.length > 0 ? pendingAchievementUnlocks[0] : null;

  useEffect(() => {
    if (currentUnlockId) {
      playSound('achievement');
    }
  }, [currentUnlockId, playSound]);

  if (!currentUnlockId) return null;

  const achievement = GAME_ACHIEVEMENTS.find((a) => a.id === currentUnlockId);
  if (!achievement) {
    // Invalid id in queue — just clear it
    clearPendingAchievementUnlocks();
    return null;
  }

  const handleClose = () => {
    clearPendingAchievementUnlocks();
  };

  const badge = getAchievementBadge(achievement.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
          className="bg-white rounded-[2.5rem] card-bubbly max-w-sm w-full p-8 text-center shadow-2xl relative border-4 border-yellow-300"
        >
          {/* Decorative Sparkles */}
          <div className="absolute top-4 left-4 text-yellow-400 text-xl animate-pulse">✨</div>
          <div className="absolute top-6 right-6 text-yellow-400 text-2xl animate-bounce">✨</div>
          <div className="absolute bottom-6 left-8 text-yellow-400 text-lg">✨</div>

          {/* Achievement Icon / Emoji */}
          <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-yellow-50 rounded-full border-4 border-yellow-100 shadow-inner overflow-hidden">
            <PixelCat variant={badge.variant} action={badge.action} size={72} />
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-0.5 border-2 border-white shadow overflow-hidden flex items-center justify-center">
              <PixelCat variant="tabby" action="achievements" size={24} />
            </div>
          </div>

          {/* Texts */}
          <span className="text-xs font-fredoka font-black uppercase text-yellow-500 tracking-widest block mb-2">
            Achievement Unlocked!
          </span>
          <h3 className="font-fredoka font-black text-2xl text-slate-800 mb-2 leading-tight">
            {achievement.title}
          </h3>
          <p className="font-nunito text-sm text-slate-500 font-semibold mb-8 leading-relaxed">
            {achievement.description}
          </p>

          {/* Action button */}
          <button
            onClick={handleClose}
            className="w-full btn-bubbly bg-yellow-450 text-amber-900 border-yellow-300 hover:scale-105 transition-transform py-4 font-fredoka font-bold text-lg flex items-center justify-center gap-2 overflow-hidden"
          >
            <PixelCat variant="tabby" action="achievements" size={24} />
            Awesome!
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
