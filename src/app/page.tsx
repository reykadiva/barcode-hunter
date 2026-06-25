'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScanLine, Package, Star, Zap, ChevronDown, BarChart3, History, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FLOATING_BARCODES = [
  { id: 1, emoji: '🍿', label: 'Snack', x: '10%', y: '20%', delay: 0 },
  { id: 2, emoji: '🥤', label: 'Drink', x: '80%', y: '15%', delay: 0.5 },
  { id: 3, emoji: '🍬', label: 'Candy', x: '15%', y: '65%', delay: 1 },
  { id: 4, emoji: '🍪', label: 'Biscuit', x: '75%', y: '60%', delay: 1.5 },
  { id: 5, emoji: '🥛', label: 'Dairy', x: '50%', y: '80%', delay: 0.8 },
];

const STEPS = [
  {
    icon: ScanLine,
    title: 'Scan',
    description: 'Point your camera at any product barcode and let the magic happen.',
    color: 'from-yellow-400 to-amber-500',
    bg: 'bg-yellow-50',
  },
  {
    icon: Package,
    title: 'Discover',
    description: 'Instantly see product information from our growing database.',
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Star,
    title: 'Collect',
    description: 'Build your personal collection. Track every product you scan!',
    color: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50',
  },
];

const FEATURES = [
  { icon: Zap, title: 'Instant Lookup', desc: 'Real-time barcode recognition via camera', color: 'text-yellow-500' },
  { icon: Package, title: 'Product Database', desc: 'Growing collection of product information', color: 'text-blue-500' },
  { icon: BarChart3, title: 'Statistics', desc: 'Track scan history and trends over time', color: 'text-orange-500' },
  { icon: History, title: 'Scan History', desc: 'Every scan logged with timestamp and device', color: 'text-purple-500' },
  { icon: Shield, title: 'Admin Panel', desc: 'Full product management with image upload', color: 'text-green-500' },
  { icon: Star, title: 'Multi-format', desc: 'EAN-13, UPC-A, UPC-E, Code-128 support', color: 'text-pink-500' },
];

function FloatingCard({ emoji, label, x, y, delay }: { emoji: string; label: string; x: string; y: string; delay: number }) {
  return (
    <div
      className="animate-float hidden md:flex"
      style={{ animationDelay: `${delay}s`, position: 'absolute', left: x, top: y }}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 border border-white/50">
        <span className="text-2xl">{emoji}</span>
        <span className="text-xs font-nunito font-semibold text-gray-700">{label}</span>
      </div>
    </div>
  );
}


export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ totalProducts: 0, totalScans: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);

  // Fetch live stats
  useEffect(() => {
    fetch('/api/statistics')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setStats({
            totalProducts: d.data.totalProducts,
            totalScans: d.data.totalScans,
          });
        }
      })
      .catch(() => {});
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Steps cards
      gsap.fromTo(
        '.step-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.7,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 75%',
          },
        }
      );

      // Feature cards
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 75%',
          },
        }
      );

      // Stats counter
      gsap.fromTo(
        '.stat-num',
        { textContent: '0' },
        {
          textContent: (_i: number, el: Element) => el.getAttribute('data-target') || '0',
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [stats]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <ScanLine className="w-5 h-5 text-white" />
            </div>
            <span className="font-fredoka font-bold text-xl text-gray-800">Barcode Adventure</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link
              href="/scan"
              className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-nunito font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Start Scanning
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-nunito font-semibold text-sm border border-gray-200 hover:bg-white transition-all duration-200"
            >
              Admin
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Floating background elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
        >
          {FLOATING_BARCODES.map((b) => (
            <FloatingCard key={b.id} {...b} />
          ))}
        </div>

        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100/60 rounded-full blur-2xl pointer-events-none" />

        <motion.div style={{ y: heroY }} className="relative z-10 text-center max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full mb-6"
          >
            <span className="text-lg">🎉</span>
            <span className="text-sm font-nunito font-semibold text-yellow-800">
              Scan any product barcode!
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-fredoka text-6xl md:text-8xl font-bold leading-tight mb-4"
          >
            <span
              className="inline-block animate-gradient"
              style={{
                background: 'linear-gradient(135deg, #FF9800, #FFC107, #2196F3, #FF9800)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Barcode
            </span>{' '}
            <span className="text-gray-800">Adventure</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl md:text-2xl font-nunito text-gray-500 mb-4"
          >
            Scan · Discover · Collect
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg font-nunito text-gray-500 max-w-xl mx-auto mb-10"
          >
            Point your camera at any product barcode — snacks, drinks, candy — and instantly
            discover what's inside the database!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/scan"
              id="hero-scan-btn"
              className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl font-nunito font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-glow flex items-center gap-3"
            >
              <ScanLine className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Start Scanning!
              <span className="text-2xl">📱</span>
            </Link>
            <Link
              href="/admin"
              className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-nunito font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200 flex items-center gap-2"
            >
              <Package className="w-5 h-5" />
              Admin Panel
            </Link>
          </motion.div>

          {/* Live stats pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-4 mt-10 flex-wrap"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-nunito font-semibold text-gray-700">
                {stats.totalProducts} Products
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-nunito font-semibold text-gray-700">
                {stats.totalScans} Scans
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={stepsRef} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg font-nunito text-gray-500">Three simple steps to your barcode adventure</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="step-card bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 shadow-md`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-500 font-fredoka font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="font-nunito text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE STATISTICS */}
      <section ref={statsRef} className="py-24 px-6 bg-gradient-to-br from-yellow-400 via-orange-400 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-white mb-4">
            Live Statistics
          </h2>
          <p className="text-lg font-nunito text-white/80 mb-16">Real numbers, updated in real-time</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Products', value: stats.totalProducts, emoji: '📦' },
              { label: 'Total Scans', value: stats.totalScans, emoji: '📊' },
              { label: 'Categories', value: 10, emoji: '🏷️' },
              { label: 'Formats', value: 4, emoji: '📱' },
            ].map(({ label, value, emoji }) => (
              <div key={label} className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 border border-white/30">
                <div className="text-4xl mb-2">{emoji}</div>
                <div
                  className="stat-num font-fredoka text-4xl font-bold text-white mb-1"
                  data-target={value}
                >
                  {value}
                </div>
                <p className="font-nunito text-white/80 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-fredoka text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg font-nunito text-gray-500">Packed with powerful features</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="feature-card bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <f.icon className={`w-8 h-8 ${f.color} mb-4`} />
                <h3 className="font-fredoka text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="font-nunito text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCANNER CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background barcode pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 bg-white"
              style={{
                left: `${i * 5.2}%`,
                width: `${1 + (i % 3) * 1.5}px`,
              }}
            />
          ))}
        </div>

        {/* Laser line animation */}
        <motion.div
          animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute top-1/2 left-10 right-10 h-0.5 -translate-y-1/2"
          style={{ background: 'linear-gradient(90deg, transparent, #FFC107, transparent)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse-glow"
          >
            <ScanLine className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-fredoka text-5xl md:text-6xl font-bold text-white mb-5"
          >
            Ready to Scan?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl font-nunito text-gray-300 mb-10"
          >
            Grab a snack, drink, or any product nearby and start your barcode adventure!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Link
              href="/scan"
              id="cta-scan-btn"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl font-nunito font-bold text-xl shadow-2xl hover:scale-105 hover:shadow-yellow-500/30 transition-all duration-300"
            >
              <ScanLine className="w-7 h-7" />
              Launch Scanner
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <ScanLine className="w-4 h-4 text-white" />
            </div>
            <span className="font-fredoka font-bold text-white text-lg">Barcode Adventure</span>
          </div>
          <p className="font-nunito text-gray-500 text-sm mb-4">
            Scan · Discover · Collect — Your barcode adventure awaits!
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-nunito">
            <Link href="/scan" className="text-gray-400 hover:text-yellow-400 transition-colors">Scanner</Link>
            <Link href="/admin" className="text-gray-400 hover:text-yellow-400 transition-colors">Admin</Link>
            <Link href="/admin/statistics" className="text-gray-400 hover:text-yellow-400 transition-colors">Statistics</Link>
          </div>
          <p className="font-nunito text-gray-600 text-xs mt-6">
            Built with Next.js 15 · Supabase · Prisma · ZXing
          </p>
        </div>
      </footer>
    </main>
  );
}
