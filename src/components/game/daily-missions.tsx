'use client';

import { motion } from 'motion/react';
import { usePlayerStore } from '@/stores/player-store';
import { PixelCat } from '@/components/pixel-cat';

export function DailyMissions() {
  const dailyMissions = usePlayerStore((state) => state.dailyMissions);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-fredoka text-slate-800 text-lg font-bold flex items-center gap-2">
          <PixelCat variant="tabby" action="missions" size={28} />
          Today&apos;s Missions
        </h3>
        <span className="text-xs font-nunito font-semibold text-slate-400">
          Reset daily based on local timezone
        </span>
      </div>

      {dailyMissions.length === 0 ? (
        <div className="card-bubbly bg-white p-8 text-center text-slate-400 font-nunito font-semibold">
          No missions available. Complete nickname setup to generate missions!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyMissions.map((mission, idx) => {
            const percentage = Math.min(100, (mission.current / mission.target) * 100);

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`card-bubbly p-5 flex flex-col justify-between transition-all border ${
                  mission.completed
                    ? 'bg-slate-50/70 border-slate-200'
                    : 'bg-white border-slate-100 hover:border-brand-pink/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h4
                      className={`font-fredoka font-bold text-base leading-tight ${
                        mission.completed ? 'text-slate-400 line-through' : 'text-slate-800'
                      }`}
                    >
                      {mission.title}
                    </h4>
                    <p
                      className={`font-nunito text-xs mt-1 ${
                        mission.completed ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {mission.description}
                    </p>
                  </div>
                  <div className="shrink-0 overflow-hidden">
                    {mission.completed ? (
                      <PixelCat variant="cyan" action="achievements" size={28} aria-label="Completed" />
                    ) : (
                      <span className="bg-brand-pink/10 text-brand-pink text-xs font-fredoka font-bold px-2.5 py-1 rounded-full border border-brand-pink/20">
                        +{mission.xpReward} XP
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center font-nunito text-xs font-bold text-slate-500">
                    <span>Progress</span>
                    <span>
                      {mission.current} / {mission.target}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 border border-slate-250/20 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        mission.completed ? 'bg-green-500' : 'bg-brand-pink'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
