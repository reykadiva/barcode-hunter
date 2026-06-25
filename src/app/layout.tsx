import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Barcode Adventure — Scan, Discover, Collect',
  description:
    'Scan barcodes on physical products to discover, track and collect product information. A fun, gamified barcode scanning experience for everyone.',
  keywords: ['barcode scanner', 'product lookup', 'barcode adventure', 'scan products'],
  openGraph: {
    title: 'Barcode Adventure',
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
      <body className="font-nunito antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
