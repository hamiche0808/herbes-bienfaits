'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { METHOD_LABEL, type Herb, type Method, type Symptom } from '@/lib/types';

const norm = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function HerbExplorer({ herbs, symptoms }: { herbs: Herb[]; symptoms: Symptom[] }) {
  const [q, setQ] = useState('');
  const [symptom, setSymptom] = useState<string | null>(null);
  const [method, setMethod] = useState<Method | ''>('');
  const [inSeason, setInSeason] = useState(false);

  const labelOf = (slug: string) => symptoms.find((s) => s.slug === slug)?.label ?? slug;

  const methods = useMemo(
    () => Array.from(new Set(herbs.flatMap((h) => h.preparations.map((p) => p.method)))),
    [herbs],
  );

  const results = useMemo(() => {
    const month = new Date().getMonth() + 1;
    const terms = norm(q.trim()).split(/\s+/).filter(Boolean);
    return herbs.filter((h) => {
      if (symptom && !h.benefits.some((b) => b.symptom === symptom)) return false;
      if (method && !h.preparations.some((p) => p.method === method)) return false;
      if (inSeason && !h.months.includes(month)) return false;
      if (!terms.length) return true;
      const haystack = norm(
        [
          h.commonName, h.scientificName, h.family, h.summary,
          ...h.activePrinciples,
          ...h.benefits.map((b) => `${b.text} ${labelOf(b.symptom)}`),
          ...h.preparations.map((p) => `${p.title} ${METHOD_LABEL[p.method]}`),
        ].join(' '),
      );
      return terms.every((t) => haystack.includes(t));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [herbs, q, symptom, method, inSeason]);

  const reset = () => { setQ(''); setSymptom(null); setMethod(''); setInSeason(false); };
  const hasFilters = q || symptom || method || inSeason;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {/* Recherche */}
      <div className="-mt-14 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5 sm:p-6">
        <label htmlFor="search" className="sr-only">Rechercher une plante, un besoin ou une préparation</label>
        <input
          id="search" type="search" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Ex. : digestion, thym, infusion, sommeil…"
          className="w-full rounded-xl border border-leaf-300 bg-cream px-4 py-3 text-lg placeholder:text-mute/70"
        />

        {/* Besoins de santé */}
        <fieldset className="mt-4">
          <legend className="mb-2 text-sm font-semibold text-leaf-900">Je cherche à soutenir…</legend>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((s) => {
              const active = symptom === s.slug;
              return (
                <button
                  key={s.slug} type="button" aria-pressed={active}
                  onClick={() => setSymptom(active ? null : s.slug)}
                  className={`min-h-11 rounded-full px-4 text-sm font-medium transition ${
                    active ? 'bg-leaf-700 text-white' : 'bg-leaf-100 text-leaf-900 hover:bg-leaf-300'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Filtres secondaires */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-leaf-900">Mode d’utilisation</span>
            <select
              value={method} onChange={(e) => setMethod(e.target.value as Method | '')}
              className="min-h-11 rounded-lg border border-leaf-300 bg-white px-3"
            >
              <option value="">Tous</option>
              {methods.map((m) => <option key={m} value={m}>{METHOD_LABEL[m]}</option>)}
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={inSeason} onChange={(e) => setInSeason(e.target.checked)}
              className="h-5 w-5 accent-leaf-700" />
            De saison ce mois-ci
          </label>
          {hasFilters && (
            <button type="button" onClick={reset} className="text-sm font-medium text-clay underline underline-offset-2">
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Résultats */}
      <p className="mt-6 text-sm text-mute" role="status" aria-live="polite">
        {results.length} plante{results.length > 1 ? 's' : ''} trouvée{results.length > 1 ? 's' : ''}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 rounded-xl bg-white p-6 text-center text-mute">
          Aucun résultat. Essayez un autre mot ou retirez un filtre.
        </p>
      ) : (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((h) => (
            <li key={h.slug}>
              <Link
                href={`/plantes/${h.slug}/`}
                className="group block h-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h2 className="font-serif text-2xl font-semibold text-leaf-900 group-hover:text-leaf-700">{h.commonName}</h2>
                <p className="text-sm italic text-mute">{h.scientificName}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed">{h.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {h.benefits.map((b) => (
                    <span key={b.symptom} className="rounded-full bg-leaf-50 px-2.5 py-1 text-xs font-medium text-leaf-700">
                      {labelOf(b.symptom)}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
