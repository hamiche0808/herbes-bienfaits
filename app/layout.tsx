import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import SwRegister from '@/components/SwRegister';
import { BASE_PATH } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });

export const metadata: Metadata = {
  title: { default: 'Herbes & Bienfaits', template: '%s · Herbes & Bienfaits' },
  description: 'Fiches pratiques sur les herbes aromatiques : usages traditionnels, préparations, précautions et conseils.',
  manifest: `${BASE_PATH}/manifest.json`,
  appleWebApp: { capable: true, title: 'Herbes', statusBarStyle: 'default' },
  icons: {
    icon: `${BASE_PATH}/icons/icon-192.png`,
    apple: `${BASE_PATH}/icons/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = {
  themeColor: '#2F5D3A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col">
        <header className="bg-leaf-700 text-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Navigation principale">
            <Link href="/" className="font-serif text-xl font-semibold">🌿 Herbes &amp; Bienfaits</Link>
            <div className="flex gap-5 text-sm font-medium">
              <Link href="/" className="hover:underline">Plantes</Link>
              <Link href="/conseils/" className="hover:underline">Conseils</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-leaf-900 px-4 py-8 text-sm text-leaf-100">
          <p className="mx-auto max-w-6xl leading-relaxed">
            <strong>Information, pas conseil médical.</strong> Ce site présente des usages traditionnels des plantes
            à titre informatif. Il ne remplace pas l’avis d’un médecin ou d’un pharmacien, surtout en cas de grossesse,
            d’allaitement, de traitement en cours ou de symptômes persistants.
          </p>
        </footer>
        <SwRegister />
      </body>
    </html>
  );
}
