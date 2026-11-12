"use client";
import Link from "next/link";
import { useFavorites } from "@/lib/favorites";
import type { Herb, Symptom } from "@/lib/types";
import HerbCard from "./HerbCard";

export default function FavoritesList({ herbs, symptoms }: { herbs: Herb[]; symptoms: Symptom[] }) {
  const { favs } = useFavorites();
  const list = herbs.filter((h) => favs.includes(h.slug));
  if (!list.length) {
    return (
      <div className="mt-8 rounded-lg border border-dashed border-line p-8 text-center">
        <p className="font-medium">Aucune plante enregistrée pour l’instant.</p>
        <p className="mt-1 text-mute">Touchez le cœur sur une fiche pour la retrouver ici, même hors ligne.</p>
        <Link href="/" className="mt-4 inline-flex min-h-11 items-center rounded-md bg-leaf px-5 font-medium text-on-leaf">Parcourir les plantes</Link>
      </div>
    );
  }
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((h) => <li key={h.slug}><HerbCard herb={h} symptoms={symptoms} /></li>)}
    </ul>
  );
}
