"use client";
import { useFavorites } from "@/lib/favorites";

export default function FavoriteButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const { favs, toggle } = useFavorites();
  const on = favs.includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={on}
      aria-label={on ? `Retirer ${name} des favoris` : `Ajouter ${name} aux favoris`}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-2xl transition-colors hover:bg-leaf-soft ${on ? "text-accent" : "text-mute"} ${className}`}
    >
      <span aria-hidden="true">{on ? "♥" : "♡"}</span>
    </button>
  );
}
