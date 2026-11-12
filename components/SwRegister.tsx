"use client";
import { useEffect } from "react";
import { BASE_PATH } from "@/lib/site";

// Enregistre le service worker et lui demande de mettre toutes les fiches en cache (mode hors ligne).
export default function SwRegister({ urls }: { urls: string[] }) {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") return;
    navigator.serviceWorker
      .register(`${BASE_PATH}/sw.js`)
      .then(() => navigator.serviceWorker.ready)
      .then((reg) => reg.active?.postMessage({ type: "PRECACHE", urls }))
      .catch(() => {});
  }, [urls]);
  return null;
}
