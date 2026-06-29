import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/next';

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Barcode Hunter — Scan, Discover, Collect',
  description:
    'Scan barcodes on physical products to discover, track and collect product information. A fun, gamified barcode scanning experience for everyone.',
  keywords: ['barcode scanner', 'product lookup', 'Barcode Hunter', 'scan products'],
  openGraph: {
    title: 'Barcode Hunter',
    description: 'Scan, Discover, Collect — Your barcode scanning adventure starts here!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${nunito.variable} font-nunito antialiased bg-mesh-soft min-h-[100dvh]`}>
        {children}
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
