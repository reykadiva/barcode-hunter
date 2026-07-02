import { motion } from 'motion/react';
import { usePlayerStore } from '@/stores/legacy/player-store';
import { GAME_ACHIEVEMENTS } from '@/lib/legacy/game-engine';
import { PixelCat } from '@/components/legacy/pixel-cat';
import { getAchievementBadge } from '@/lib/legacy/game-utils';

export function GameAchievements() {
  const unlockedAchievements = usePlayerStore((state) => state.unlockedAchievements);
  const unlockedSet = new Set(unlockedAchievements);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-fredoka text-slate-800 text-lg font-bold flex items-center gap-2">
          <PixelCat variant="tabby" action="achievements" size={28} />
          Unlocked Badges
        </h3>
        <span className="text-xs font-nunito font-semibold text-slate-400">
          {unlockedSet.size} / {GAME_ACHIEVEMENTS.length} completed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GAME_ACHIEVEMENTS.map((achievement, idx) => {
          const isUnlocked = unlockedSet.has(achievement.id);
          const badge = getAchievementBadge(achievement.id);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`card-bubbly p-4 flex items-center gap-4 border transition-all ${
                isUnlocked
                  ? 'bg-yellow-50/30 border-yellow-200 shadow-sm'
                  : 'bg-slate-50/50 border-slate-200 opacity-60'
              }`}
            >
              {/* Badge Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner overflow-hidden ${
                  isUnlocked
                    ? 'bg-white border-yellow-100'
                    : 'bg-slate-100 border-slate-200'
                }`}
              >
                {isUnlocked ? (
                  <PixelCat variant={badge.variant} action={badge.action} size={44} />
                ) : (
                  <PixelCat variant="gray" size={32} className="opacity-40 filter grayscale" />
                )}
              </div>

              {/* Title & Desc */}
              <div className="min-w-0 flex-1">
                <h4
                  className={`font-fredoka font-bold text-sm leading-snug truncate ${
                    isUnlocked ? 'text-slate-850' : 'text-slate-500'
                  }`}
                >
                  {achievement.title}
                </h4>
                <p className="font-nunito text-xs text-slate-450 mt-0.5 line-clamp-2 leading-tight">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
