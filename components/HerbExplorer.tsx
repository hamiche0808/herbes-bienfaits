"use client";
import { useMemo, useState } from "react";
import { METHOD_LABEL, type Herb, type Method, type Symptom } from "@/lib/types";
import HerbCard from "./HerbCard";

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function HerbExplorer({ herbs, symptoms }: { herbs: Herb[]; symptoms: Symptom[] }) {
  const [q, setQ] = useState("");
  const [symptom, setSymptom] = useState<string | null>(null);
  const [method, setMethod] = useState<Method | "">("");
  const [inSeason, setInSeason] = useState(false);

  const methods = useMemo(
    () => Array.from(new Set(herbs.flatMap((h) => h.preparations.map((p) => p.method)))),
    [herbs],
  );

  const results = useMemo(() => {
    const label = (slug: string) => symptoms.find((s) => s.slug === slug)?.label ?? slug;
    const month = new Date().getMonth() + 1;
    const terms = norm(q.trim()).split(/\s+/).filter(Boolean);
    return herbs.filter((h) => {
      if (symptom && !h.benefits.some((b) => b.symptom === symptom)) return false;
      if (method && !h.preparations.some((p) => p.method === method)) return false;
      if (inSeason && !h.months.includes(month)) return false;
      if (!terms.length) return true;
      const haystack = norm([
        h.commonName, h.scientificName, h.family, h.summary, ...h.activePrinciples,
        ...h.benefits.map((b) => `${b.text} ${label(b.symptom)}`),
        ...h.preparations.map((p) => `${p.title} ${METHOD_LABEL[p.method]}`),
      ].join(" "));
      return terms.every((t) => haystack.includes(t));
    });
  }, [herbs, symptoms, q, symptom, method, inSeason]);

  const hasFilters = Boolean(q || symptom || method || inSeason);
  const reset = () => { setQ(""); setSymptom(null); setMethod(""); setInSeason(false); };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="-mt-10 rounded-lg border border-line bg-card p-4 sm:p-6">
        <label htmlFor="search" className="sr-only">Rechercher une plante, un besoin ou une préparation</label>
        <input
          id="search" type="search" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Essayez : digestion, thym, infusion, sommeil…"
          className="w-full rounded-md border border-line bg-paper px-4 py-3 text-lg text-ink placeholder:text-mute"
        />

        <fieldset className="mt-5">
          <legend className="mb-2 font-semibold text-ink">Je cherche à soutenir</legend>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((s) => {
              const active = symptom === s.slug;
              return (
                <button
                  key={s.slug} type="button" aria-pressed={active}
                  onClick={() => setSymptom(active ? null : s.slug)}
                  className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                    active ? "border-leaf bg-leaf text-on-leaf" : "border-line bg-paper text-ink hover:border-leaf"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <label className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Mode d’utilisation</span>
            <select
              value={method} onChange={(e) => setMethod(e.target.value as Method | "")}
              className="min-h-11 rounded-md border border-line bg-paper px-3 text-ink"
            >
              <option value="">Tous</option>
              {methods.map((m) => <option key={m} value={m}>{METHOD_LABEL[m]}</option>)}
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={inSeason} onChange={(e) => setInSeason(e.target.checked)} className="h-5 w-5 accent-[var(--leaf)]" />
            De saison ce mois-ci
          </label>
          {hasFilters && (
            <button type="button" onClick={reset} className="min-h-11 text-sm font-medium text-accent underline underline-offset-4">
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>

      <p className="mt-8 text-sm text-mute" role="status" aria-live="polite">
        {results.length} plante{results.length > 1 ? "s" : ""} trouvée{results.length > 1 ? "s" : ""}
      </p>

      {results.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-line p-8 text-center">
          <p className="font-medium">Aucune plante ne correspond.</p>
          <p className="mt-1 text-mute">Retirez un filtre ou cherchez un autre mot (ex. « tisane », « gorge »).</p>
          <button type="button" onClick={reset} className="mt-4 min-h-11 rounded-md bg-leaf px-5 font-medium text-on-leaf">Tout afficher</button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((h) => <li key={h.slug}><HerbCard herb={h} symptoms={symptoms} /></li>)}
        </ul>
      )}
    </section>
  );
}
