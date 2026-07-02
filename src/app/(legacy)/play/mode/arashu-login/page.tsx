'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Heart, Lock, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { usePlayerStore } from '@/stores/legacy/player-store';
import { GameMode } from '@/lib/game-config';
import { toast } from 'sonner';

export default function ArashuLoginPage() {
  const router = useRouter();
  const setMode = usePlayerStore((state) => state.setMode);
  
  // Also initialize player store data when logging in as Arashu
  const initializePlayer = usePlayerStore((state) => state.initializePlayer);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.session) {
        // Logged in!
        setMode(GameMode.ARASHU);
        
        // Initialize player profile stats under ARASHU mode.
        // Nickname is "Arashu", Avatar is "👑".
        // This sets the mode and initializes the state structure.
        initializePlayer('Arashu', '👑');
        // Ensure the mode remains ARASHU (initializePlayer resets mode to GUEST by default)
        setMode(GameMode.ARASHU);

        toast.success("Welcome back, Arashu! 👑");
        router.push('/play');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed. Please check credentials.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
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
        className="w-full max-w-md z-10"
      >
        {/* Back Link */}
        <div className="mb-6 text-left">
          <Link
            href="/play/mode"
            className="inline-flex items-center gap-2 font-fredoka font-semibold text-slate-500 hover:text-slate-700 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to modes
          </Link>
        </div>

        {/* Card */}
        <div className="card-bubbly bg-white p-8 shadow-xl border-none">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-pink/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 border border-brand-pink/10">
              <Heart className="w-8 h-8 text-brand-pink fill-brand-pink/10" strokeWidth={2.5} />
            </div>
            <h1 className="font-fredoka text-3xl font-bold text-slate-800">
              Arashu&apos;s Login
            </h1>
            <p className="font-nunito text-slate-500 text-sm mt-1 font-semibold">
              Enter your developer credentials to log in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block font-fredoka font-semibold text-slate-700 text-sm mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-855 placeholder-slate-400 focus:outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-fredoka font-semibold text-slate-700 text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 font-nunito font-semibold text-slate-855 placeholder-slate-400 focus:outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/10 transition-all text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-bubbly bg-brand-pink text-white py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Log In'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
