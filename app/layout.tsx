import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import SwRegister from "@/components/SwRegister";
import InstallPrompt from "@/components/InstallPrompt";
import { getAllHerbs } from "@/lib/herbs";
import { SITE_NAME, SITE_URL, BASE_PATH } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: "Fiches pratiques sur les herbes aromatiques : usages traditionnels, préparations, précautions, culture et conservation.",
  manifest: `${BASE_PATH}/manifest.json`,
  appleWebApp: { capable: true, title: "Herbes", statusBarStyle: "default" },
  icons: { icon: `${BASE_PATH}/icons/icon-192.png`, apple: `${BASE_PATH}/icons/apple-touch-icon.png` },
  openGraph: { title: SITE_NAME, siteName: SITE_NAME, locale: "fr_FR", type: "website" },
};

// Site 100 % autonome : aucune ressource externe, tout est self-hosted.
// GitHub Pages ne permet pas d'en-têtes HTTP → CSP appliquée via <meta http-equiv>
// (React 19 remonte automatiquement cette balise dans le <head>).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
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
].join("; ");

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#12301f" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1510" },
  ],
  width: "device-width",
  initialScale: 1,
};

const NAV = [
  { href: "/", label: "Plantes" },
  { href: "/conseils/", label: "Conseils" },
  { href: "/favoris/", label: "Favoris" },
  { href: "/a-propos/", label: "À propos" },
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const herbs = await getAllHerbs();
  const urls = ["/", "/conseils/", "/favoris/", "/a-propos/", ...herbs.map((h) => `/plantes/${h.slug}/`)]
    .map((p) => `${BASE_PATH}${p}`);
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col">
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-card focus:p-3">Aller au contenu</a>
        <header className="bg-leaf-deep text-white">
          <nav aria-label="Navigation principale" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3">
            <Link href="/" className="font-serif text-xl font-semibold">Herbes &amp; Bienfaits</Link>
            <ul className="flex flex-wrap gap-x-5 text-sm font-medium">
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href} className="inline-flex min-h-11 items-center hover:underline">{n.label}</Link></li>
              ))}
            </ul>
          </nav>
        </header>
        <main id="contenu" className="flex-1">{children}</main>
        <footer className="bg-leaf-deep px-4 py-8 text-sm text-white/85">
          <div className="mx-auto max-w-6xl space-y-3 leading-relaxed">
            <p>
              <strong>Information, pas conseil médical.</strong> Ce site présente des usages traditionnels des plantes à titre
              informatif. Il ne remplace pas l’avis d’un médecin ou d’un pharmacien, surtout en cas de grossesse, d’allaitement,
              de traitement en cours ou de symptômes persistants.
            </p>
            <p><Link href="/a-propos/" className="underline">Sources et méthode</Link> · <Link href="/mentions-legales/" className="underline">Mentions légales</Link></p>
            <p className="!text-white/70">
              Site conçu et réalisé par <strong className="!text-white">BEN MESLI Hamiche</strong> ✦ — <a className="underline" href="mailto:hamiche08.08@gmail.com">hamiche08.08@gmail.com</a>
            </p>
          </div>
        </footer>
        <InstallPrompt />
        <SwRegister urls={urls} />
      </body>
    </html>
  );
}
