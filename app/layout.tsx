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
  openGraph: {
    title: 'Herbes & Bienfaits',
    description: 'Fiches pratiques sur les herbes aromatiques : usages traditionnels, préparations, précautions et conseils.',
    url: 'https://hamiche0808.github.io/herbes-bienfaits/',
    siteName: 'Herbes & Bienfaits',
    locale: 'fr_FR',
    type: 'website',
  },
};

// Site 100 % autonome : aucune ressource externe, tout est self-hosted.
// GitHub Pages ne permet pas d'en-têtes HTTP → CSP appliquée via <meta http-equiv>
// (React 19 remonte automatiquement cette balise dans le <head>).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // inline requis par le bootstrap Next.js
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

export const viewport: Viewport = {
  themeColor: '#2F5D3A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col">
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
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
