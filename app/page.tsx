import HerbExplorer from '@/components/HerbExplorer';
import { getAllHerbs } from '@/lib/herbs';
import { SYMPTOMS } from '@/lib/seed';

export default async function Home() {
  const herbs = await getAllHerbs();
  return (
    <>
      <section className="bg-leaf-100">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h1 className="font-serif text-4xl font-semibold text-leaf-900 sm:text-5xl">
            Les herbes aromatiques,<br className="hidden sm:block" /> au service de votre quotidien
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-mute">
            Trouvez une plante par besoin, par mode de préparation ou par nom, et consultez ses usages
            comme ses précautions avant de l’utiliser.
          </p>
        </div>
      </section>
      <HerbExplorer herbs={herbs} symptoms={SYMPTOMS} />
    </>
  );
}
