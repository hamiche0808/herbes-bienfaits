import HerbExplorer from "@/components/HerbExplorer";
import { SYMPTOMS } from "@/lib/data";
import { getAllHerbs } from "@/lib/herbs";

export default async function Home() {
  const herbs = await getAllHerbs();
  return (
    <>
      <section className="hero-herbes text-white">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:pt-16">
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.1] sm:text-6xl">
            Quelle herbe pour quel besoin&nbsp;?
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            {herbs.length} fiches d’herbes aromatiques : à quoi elles servent, comment les préparer, et surtout
            dans quels cas s’en abstenir.
          </p>
        </div>
      </section>
      <HerbExplorer herbs={herbs} symptoms={SYMPTOMS} />
    </>
  );
}
