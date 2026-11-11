import Link from 'next/link';
import {
  EVIDENCE_LABEL, KIND_LABEL, METHOD_LABEL,
  type Herb, type Severity, type Symptom,
} from '@/lib/types';

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTH_NAMES = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

const SEVERITY: Record<Severity, { label: string; cls: string }> = {
  danger:    { label: 'Important',  cls: 'border-danger bg-red-50 text-danger' },
  attention: { label: 'Attention',  cls: 'border-warn bg-amber-50 text-warn' },
  info:      { label: 'À noter',    cls: 'border-leaf-300 bg-leaf-50 text-leaf-900' },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-serif text-2xl font-semibold text-leaf-900">{title}</h2>
      {children}
    </section>
  );
}

export default function HerbSheet({ herb, symptoms }: { herb: Herb; symptoms: Symptom[] }) {
  const labelOf = (slug: string) => symptoms.find((s) => s.slug === slug)?.label ?? slug;
  const order: Severity[] = ['danger', 'attention', 'info'];
  const precautions = [...herb.precautions].sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity));

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm font-medium text-leaf-700 underline underline-offset-2">← Toutes les plantes</Link>

      {/* En-tête */}
      <header className="mt-4">
        <h1 className="font-serif text-4xl font-semibold text-leaf-900 sm:text-5xl">{herb.commonName}</h1>
        <p className="mt-1 text-lg italic text-mute">{herb.scientificName} · {herb.family}</p>
        <p className="mt-4 text-lg leading-relaxed">{herb.summary}</p>
        <p className="mt-3 text-sm text-mute"><strong>Parties utilisées :</strong> {herb.parts.join(', ')}</p>
      </header>

      {/* Sécurité d'abord */}
      <Section title="À savoir avant utilisation">
        <ul className="space-y-3">
          {precautions.map((p, i) => (
            <li key={i} className={`rounded-xl border-l-4 p-4 ${SEVERITY[p.severity].cls}`}>
              <p className="text-xs font-bold uppercase tracking-wide">
                {SEVERITY[p.severity].label} · {KIND_LABEL[p.kind]}
              </p>
              <p className="mt-1 text-ink">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Bienfaits */}
      <Section title="Bienfaits traditionnels">
        <ul className="space-y-4">
          {herb.benefits.map((b) => (
            <li key={b.symptom} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-leaf-700">{labelOf(b.symptom)}</h3>
                <span className="rounded-full bg-leaf-100 px-2.5 py-0.5 text-xs font-medium text-leaf-900">
                  {EVIDENCE_LABEL[b.evidence]}
                </span>
              </div>
              <p className="mt-2 leading-relaxed">{b.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Principes actifs */}
      <Section title="Principes actifs">
        <ul className="flex flex-wrap gap-2">
          {herb.activePrinciples.map((a) => (
            <li key={a} className="rounded-full bg-leaf-100 px-3 py-1.5 text-sm font-medium text-leaf-900">{a}</li>
          ))}
        </ul>
      </Section>

      {/* Préparations */}
      <Section title="Modes de consommation et préparations">
        <div className="space-y-4">
          {herb.preparations.map((p) => (
            <div key={p.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <p className="text-xs font-bold uppercase tracking-wide text-clay">{METHOD_LABEL[p.method]}</p>
              <h3 className="mt-1 text-lg font-semibold text-leaf-900">{p.title}</h3>
              <p className="mt-2 leading-relaxed">{p.steps}</p>
              {p.note && <p className="mt-2 text-sm text-mute">💡 {p.note}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* Saisonnalité */}
      <Section title="Saisonnalité">
        <ol className="grid grid-cols-12 gap-1" aria-label="Mois de pleine saison">
          {MONTHS.map((m, i) => {
            const on = herb.months.includes(i + 1);
            return (
              <li key={i} title={MONTH_NAMES[i]}
                className={`flex h-10 items-center justify-center rounded-md text-sm font-semibold ${
                  on ? 'bg-leaf-700 text-white' : 'bg-leaf-100 text-leaf-900/50'
                }`}>
                <span aria-hidden="true">{m}</span>
                <span className="sr-only">{MONTH_NAMES[i]}{on ? ' : en saison' : ''}</span>
              </li>
            );
          })}
        </ol>
      </Section>

      <p className="mt-12 rounded-xl bg-leaf-50 p-4 text-sm leading-relaxed text-leaf-900">
        Ces informations relèvent d’usages traditionnels et ne remplacent pas un avis médical.
        En cas de doute, de grossesse, d’allaitement, de traitement en cours ou de symptômes qui persistent,
        parlez-en à un professionnel de santé.
      </p>
    </article>
  );
}
