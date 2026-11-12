"use client";
import { useEffect, useState } from "react";

type BIPEvent = Event & { prompt: () => Promise<void> };
const KEY = "herbes:install-masque";

export default function InstallPrompt() {
  const [mode, setMode] = useState<"android" | "ios" | null>(null);
  const [evt, setEvt] = useState<BIPEvent | null>(null);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    let dismissed = false;
    try { dismissed = localStorage.getItem(KEY) === "1"; } catch { /* ignore */ }
    if (standalone || dismissed) return;

    const timer = /iphone|ipad|ipod/i.test(navigator.userAgent) ? setTimeout(() => setMode("ios"), 0) : undefined;
    const onBip = (e: Event) => { e.preventDefault(); setEvt(e as BIPEvent); setMode("android"); };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => { clearTimeout(timer); window.removeEventListener("beforeinstallprompt", onBip); };
  }, []);

  const hide = () => {
    try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setMode(null);
  };
  if (!mode) return null;

  return (
    <div role="region" aria-label="Installer l'application" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-lg border border-line bg-card p-4 shadow-lg">
      <p className="font-semibold">Installer Herbes &amp; Bienfaits</p>
      {mode === "ios" ? (
        <p className="mt-1 text-sm text-mute">
          Dans Safari, touchez <strong>Partager</strong> puis <strong>Sur l’écran d’accueil</strong> pour l’utiliser comme une application, même hors ligne.
        </p>
      ) : (
        <p className="mt-1 text-sm text-mute">Ajoutez le site à votre écran d’accueil : accès rapide et lecture hors ligne.</p>
      )}
      <div className="mt-3 flex gap-2">
        {mode === "android" && evt && (
          <button type="button" onClick={async () => { await evt.prompt(); hide(); }} className="min-h-11 rounded-md bg-leaf px-4 font-medium text-on-leaf">
            Installer
          </button>
        )}
        <button type="button" onClick={hide} className="min-h-11 rounded-md px-4 font-medium text-accent">Plus tard</button>
      </div>
    </div>
  );
}
