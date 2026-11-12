import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sources et méthode" };

export default function APropos() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 leading-relaxed">
      <h1 className="font-serif text-5xl font-semibold">Sources et méthode</h1>
      <p className="mt-6 text-lg">
        Herbes &amp; Bienfaits est un projet éditorial gratuit, sans publicité ni compte utilisateur. Chaque fiche résume
        des usages traditionnels et met les précautions avant les bienfaits.
      </p>

      <h2 className="mt-10 font-serif text-3xl font-semibold text-leaf">Niveaux de preuve</h2>
      <dl className="mt-4 space-y-3">
        <div className="rounded-lg border border-line bg-card p-4"><dt className="font-semibold">Usage traditionnel</dt><dd className="mt-1">Usage ancien et documenté, sans preuve clinique solide. Il ne garantit ni efficacité ni innocuité.</dd></div>
        <div className="rounded-lg border border-line bg-card p-4"><dt className="font-semibold">Monographie officielle (EMA/HMPC)</dt><dd className="mt-1">Usage reconnu par une monographie européenne de plante médicinale (usage bien établi ou traditionnel).</dd></div>
        <div className="rounded-lg border border-line bg-card p-4"><dt className="font-semibold">Études scientifiques</dt><dd className="mt-1">Des essais existent, souvent de portée limitée. Ce niveau est réservé aux cas documentés.</dd></div>
      </dl>

      <h2 className="mt-10 font-serif text-3xl font-semibold text-leaf">Références à consulter</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li><a className="text-accent underline" href="https://www.ema.europa.eu" rel="noopener noreferrer">Agence européenne des médicaments (EMA)</a> : monographies du comité des médicaments à base de plantes (HMPC).</li>
        <li><a className="text-accent underline" href="https://ansm.sante.fr" rel="noopener noreferrer">ANSM</a> : alertes et recommandations de sécurité.</li>
        <li><a className="text-accent underline" href="https://escop.com" rel="noopener noreferrer">ESCOP</a> : monographies scientifiques sur les plantes médicinales.</li>
      </ul>

      <h2 className="mt-10 font-serif text-3xl font-semibold text-leaf">Limites</h2>
      <p className="mt-4">
        Ces fiches sont des synthèses prudentes, relues pour l’information du grand public. Elles ne remplacent ni un
        diagnostic ni un traitement. Les plantes peuvent interagir avec des médicaments, et les doses réellement
        efficaces dépendent de la préparation. En cas de doute, demandez conseil à un pharmacien.
      </p>
      <p className="mt-4">Une erreur ou une source à ajouter ? Écrivez-nous (voir les mentions légales).</p>
    </div>
  );
}
