import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function Mentions() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 leading-relaxed">
      <h1 className="font-serif text-5xl font-semibold">Mentions légales</h1>

      <h2 className="mt-8 font-serif text-2xl font-semibold">Éditeur</h2>
      <p className="mt-2">
        Site conçu et réalisé par <strong>BEN MESLI Hamiche</strong> ✦, France.
        Contact : <a className="text-accent underline" href="mailto:hamiche08.08@gmail.com">hamiche08.08@gmail.com</a>.
        Directeur de la publication : BEN MESLI Hamiche.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-semibold">Hébergement</h2>
      <p className="mt-2">
        GitHub, Inc., 88 Colin P Kelly Jr Street, San Francisco, CA 94107, États-Unis
        (service <a className="text-accent underline" href="https://pages.github.com" rel="noopener noreferrer">GitHub Pages</a>).
      </p>

      <h2 className="mt-8 font-serif text-2xl font-semibold">Données personnelles</h2>
      <p className="mt-2">
        Le site n’utilise ni cookie publicitaire ni outil de mesure d’audience. Vos favoris sont stockés
        uniquement dans votre navigateur (stockage local) et ne sont jamais transmis.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-semibold">Avertissement santé</h2>
      <p className="mt-2">
        Les contenus sont informatifs et ne constituent pas un avis médical, un diagnostic ou une prescription.
        Ils présentent des usages traditionnels ; demandez conseil à un professionnel de santé avant tout usage.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-semibold">Crédits</h2>
      <p className="mt-2">
        Icônes et logo du site : créations originales du projet.
        Illustrations végétales éventuelles : sources libres de droits (Wikimedia Commons).
      </p>
    </div>
  );
}
