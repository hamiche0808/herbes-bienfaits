import type { Metadata } from "next";
import FavoritesList from "@/components/FavoritesList";
import { SYMPTOMS } from "@/lib/data";
import { getAllHerbs } from "@/lib/herbs";

export const metadata: Metadata = { title: "Mes favoris" };

export default async function Favoris() {
  const herbs = await getAllHerbs();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-5xl font-semibold">Mes favoris</h1>
      <p className="mt-3 text-mute">Enregistrés sur cet appareil uniquement : aucun compte, aucune donnée envoyée.</p>
      <FavoritesList herbs={herbs} symptoms={SYMPTOMS} />
    </div>
  );
}
