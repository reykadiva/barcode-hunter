'use client';

import { motion } from 'motion/react';

export function ScanOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      {/* Dark overlay with hole */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Scan window */}
      <div className="relative z-10 w-72 h-44">
        {/* Corner brackets */}
        {/* Top-left */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg"
          style={{ filter: 'drop-shadow(0 0 6px #FFC107)' }}
        />
        {/* Top-right */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-yellow-400 rounded-tr-lg"
          style={{ filter: 'drop-shadow(0 0 6px #FFC107)' }}
        />
        {/* Bottom-left */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-yellow-400 rounded-bl-lg"
          style={{ filter: 'drop-shadow(0 0 6px #FFC107)' }}
        />
        {/* Bottom-right */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yellow-400 rounded-br-lg"
          style={{ filter: 'drop-shadow(0 0 6px #FFC107)' }}
        />

        {/* Scanning laser line */}
        <motion.div
          animate={{ top: ['8%', '88%', '8%'] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute left-2 right-2 h-0.5 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, #FFC107, #FFD54F, #FFC107, transparent)',
            boxShadow: '0 0 10px 2px rgba(255, 193, 7, 0.6)',
          }}
        />

        {/* Center hint text */}
        <div className="absolute -bottom-10 left-0 right-0 text-center">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white text-sm font-nunito font-medium"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          >
            Align barcode within frame
          </motion.p>
        </div>
      </div>
    </div>
  );
}
