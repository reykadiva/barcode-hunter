'use client';

import { useCallback, useRef, useEffect } from 'react';

type SoundType = 'success' | 'error' | 'achievement' | 'beep';

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioElementsRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    // Preload the MP3 files on client side
    if (typeof window !== 'undefined') {
      audioElementsRef.current.beep = new Audio('/beep.mp3');
      audioElementsRef.current.success = new Audio('/success.mp3');
    }
  }, []);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) audioContextRef.current = new AudioCtx();
    }
    return audioContextRef.current!;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = 'sine', startTime?: number) => {
      try {
        const ctx = getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = type;
        const t = startTime ?? ctx.currentTime;
        oscillator.frequency.setValueAtTime(frequency, t);

        gainNode.gain.setValueAtTime(0.25, t);
        gainNode.gain.exponentialRampToValueAtTime(0.001, t + duration);

        oscillator.start(t);
        oscillator.stop(t + duration);
      } catch {
        // Ignore audio errors silently
      }
    },
    [getContext]
  );

  const playSound = useCallback(
    (sound: SoundType) => {
      try {
        if (sound === 'beep' && audioElementsRef.current.beep) {
          audioElementsRef.current.beep.currentTime = 0;
          audioElementsRef.current.beep.play().catch(() => {});
          return;
        }
        
        if (sound === 'success' && audioElementsRef.current.success) {
          audioElementsRef.current.success.currentTime = 0;
          audioElementsRef.current.success.play().catch(() => {});
          return;
        }

        const ctx = getContext();
        const now = ctx.currentTime;
        switch (sound) {
          case 'error':
            playTone(330, 0.18, 'square', now);
            playTone(262, 0.25, 'square', now + 0.2);
            break;
          case 'achievement':
            playTone(523, 0.1, 'sine', now);
            playTone(659, 0.1, 'sine', now + 0.1);
            playTone(784, 0.1, 'sine', now + 0.2);
            playTone(1047, 0.3, 'sine', now + 0.3);
            break;
        }
      } catch {
        // Ignore audio errors
      }
    },
    [playTone, getContext]
  );

  return { playSound };
}

