'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { ScanLine, Package, LogOut } from 'lucide-react';
import { PixelCat, type CatVariantId } from '@/components/pixel-cat';
import { usePlayerStore } from '@/stores/player-store';
import { GameMode } from '@/lib/game-config';
import { NicknameSetup } from '@/components/game/nickname-setup';
import { RegisterProductModal } from '@/components/game/register-product-modal';
import { ProductList } from '@/components/game/product-list';
import { GameStats } from '@/components/game/game-stats';
import { ScanHistory } from '@/components/game/scan-history';
import { XpPopup } from '@/components/game/xp-popup';
import { DailyMissions } from '@/components/game/daily-missions';
import { GameAchievements } from '@/components/game/game-achievements';
import { AchievementPopup } from '@/components/game/achievement-popup';
import { createClient } from '@/lib/supabase/client';

// Separate component so useSearchParams is inside a Suspense boundary
function RegisterParamHandler({ onBarcode }: { onBarcode: (b: string) => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const barcode = searchParams.get('register');
    if (barcode) {
      onBarcode(barcode);
      router.replace('/play');
    }
  }, [searchParams, onBarcode, router]);

  return null;
}

type Tab = 'missions' | 'stats' | 'history' | 'achievements' | 'products';

export default function GameHubPage() {
  const router = useRouter();

  const mode = usePlayerStore((state) => state.mode);
  const nickname = usePlayerStore((state) => state.nickname);
  const avatar = usePlayerStore((state) => state.avatar);
  const xp = usePlayerStore((state) => state.xp);
  const level = usePlayerStore((state) => state.level);
  const streak = usePlayerStore((state) => state.streak);
  const creatorId = usePlayerStore((state) => state.creatorId);
  const resetPlayer = usePlayerStore((state) => state.resetPlayer);
  const registerProduct = usePlayerStore((state) => state.registerProduct);
  const unregisterProduct = usePlayerStore((state) => state.unregisterProduct);
  const checkDailyReset = usePlayerStore((state) => state.checkDailyReset);

  const [activeTab, setActiveTab] = useState<Tab>('missions');
  const [showSetup, setShowSetup] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerInitialBarcode, setRegisterInitialBarcode] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted || mode === null) return;
    const localDateString = new Date().toLocaleDateString('en-CA');
    checkDailyReset(localDateString);
  }, [mounted, mode, checkDailyReset]);

  useEffect(() => {
    if (!mounted) return;

    if (mode === null) {
      router.push('/play/mode');
      return;
    }
    
    if (mode === GameMode.GUEST && !nickname) {
      const t = setTimeout(() => setShowSetup(true), 0);
      return () => clearTimeout(t);
    }
  }, [mode, nickname, mounted, router]);

  // Session check for Arashu's Mode
  useEffect(() => {
    if (!mounted || mode !== GameMode.ARASHU) return;

    async function verifySession() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Session expired. Please log in again.');
        resetPlayer();
        router.push('/play/mode');
      }
    }

    verifySession();
  }, [mounted, mode, router, resetPlayer]);

  // Handle ?register=<barcode> from scanner "Register" button
  // This is in a separate component because useSearchParams needs Suspense
  const handleRegisterParam = useCallback((barcode: string) => {
    setRegisterInitialBarcode(barcode);
    setShowRegisterModal(true);
    setActiveTab('products');
  }, []);

  const handleOpenRegisterModal = useCallback(() => {
    setRegisterInitialBarcode('');
    setShowRegisterModal(true);
  }, []);

  const handleRegisterSuccess = useCallback((barcode: string) => {
    registerProduct(barcode);
    setShowRegisterModal(false);
    setActiveTab('products');
  }, [registerProduct]);

  const handleProductDeleted = useCallback((barcode: string) => {
    unregisterProduct(barcode);
  }, [unregisterProduct]);

  const handleExit = async () => {
    if (mode === GameMode.ARASHU) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    resetPlayer();
    router.push('/play/mode');
  };

  if (!mounted || mode === null) {
    return (
      <div className="min-h-screen bg-mesh-soft flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-4 border-brand-cyan border-t-transparent"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-mesh-soft pb-24 relative">
      {/* Handles ?register=<barcode> query param from scanner — must be in Suspense */}
      <Suspense fallback={null}>
        <RegisterParamHandler onBarcode={handleRegisterParam} />
      </Suspense>

      <XpPopup />
      <AchievementPopup />

      <AnimatePresence>
        {showSetup && <NicknameSetup onComplete={() => setShowSetup(false)} />}
        {showRegisterModal && (
          <RegisterProductModal
            key="register-modal"
            initialBarcode={registerInitialBarcode}
            creatorId={creatorId}
            onClose={() => setShowRegisterModal(false)}
            onSuccess={handleRegisterSuccess}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="px-4 md:px-8 py-5 sticky top-0 bg-white/30 backdrop-blur-md z-40 border-b border-white/20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Pixel cat logo */}
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center card-bubbly shadow-sm overflow-hidden">
              <PixelCat variant="calico" size={32} aria-label="Barcode Hunter logo" />
            </div>
            <span className="font-fredoka font-bold text-xl text-slate-800 tracking-tight">Game Hub</span>
          </div>
          <button
            onClick={handleExit}
            className="flex items-center gap-2 px-4 py-1.5 bg-white/80 hover:bg-white text-slate-600 rounded-full font-fredoka font-semibold text-sm card-bubbly hover:scale-105 transition-transform overflow-hidden"
          >
            <PixelCat variant="gray" action="exit" size={24} aria-hidden="true" />
            Exit
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-8 space-y-6">
        {/* Profile Card */}
        <div className="card-bubbly bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-cyan/10 to-brand-pink/10 rounded-2xl flex items-center justify-center select-none border-2 border-white shadow-md overflow-hidden">
              {mode === GameMode.ARASHU
                ? <PixelCat variant="arashu-smiling" size={52} aria-label="Arashu profile avatar" />
                : <PixelCat variant={(avatar as CatVariantId) || 'calico'} size={52} />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-fredoka text-xl font-bold text-slate-800">
                  {mode === GameMode.ARASHU ? "Arashu's" : nickname || 'Guest Player'}
                </h2>
                {streak > 0 && (
                  <span className="text-sm text-orange-500 font-semibold" title={`${streak}-day streak`}>
                    🔥 {streak}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-brand-cyan/20 text-cyan-800 text-xs font-fredoka font-bold px-2.5 py-0.5 rounded-full">
                  LVL {level}
                </span>
                <span className="text-slate-500 font-nunito text-xs font-semibold">{xp} XP</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/scan" className="w-full sm:w-auto">
              <button className="btn-bubbly bg-brand-cyan text-white px-6 py-3 w-full flex items-center justify-center gap-2 font-fredoka font-semibold overflow-hidden">
                <PixelCat variant="cyan" action="scan" size={28} />
                Scan Barcode
              </button>
            </Link>
            <button
              onClick={handleOpenRegisterModal}
              className="btn-bubbly bg-brand-pink text-white px-6 py-3 w-full sm:w-auto flex items-center justify-center gap-2 font-fredoka font-semibold overflow-hidden"
            >
              <PixelCat variant="pink" action="items" size={28} />
              Register Product
            </button>
          </div>
        </div>

        {/* Tab controls */}
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
          {([
            { id: 'missions', label: 'Missions', action: 'missions', variant: 'tabby' },
            { id: 'stats', label: 'Stats', action: 'stats', variant: 'cyan' },
            { id: 'history', label: 'History', action: 'history', variant: 'gray' },
            { id: 'achievements', label: 'Achievements', action: 'achievements', variant: 'calico' },
            { id: 'products', label: 'Products', action: 'items', variant: 'pink' },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full font-fredoka font-semibold text-sm whitespace-nowrap transition-all tab-bubbly flex items-center gap-2 focus:outline-none focus:ring-0 active:scale-95 ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white hover:bg-slate-700'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <PixelCat variant={tab.variant} action={tab.action} size={24} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-[300px]">
          {activeTab === 'missions' && (
            <DailyMissions />
          )}
          {activeTab === 'stats' && (
            <GameStats />
          )}
          {activeTab === 'history' && (
            <ScanHistory />
          )}
          {activeTab === 'achievements' && (
            <GameAchievements />
          )}
          {activeTab === 'products' && (
            <ProductList
              creatorId={creatorId}
              onProductDeleted={handleProductDeleted}
            />
          )}
        </div>
      </div>
    </main>
  );
}
