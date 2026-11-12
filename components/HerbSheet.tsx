import {
  EVIDENCE_LABEL, KIND_LABEL, METHOD_LABEL, MONTH_NAMES,
  type Herb, type Severity, type Symptom,
} from "@/lib/types";
import FavoriteButton from "./FavoriteButton";

const SEVERITY: Record<Severity, { label: string; box: string; text: string }> = {
  danger:    { label: "Important", box: "border-danger bg-danger-soft", text: "text-danger" },
  attention: { label: "Attention", box: "border-warn bg-warn-soft",     text: "text-warn" },
  info:      { label: "À noter",   box: "border-line bg-leaf-soft",      text: "text-leaf" },
};
const ORDER: Severity[] = ["danger", "attention", "info"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-serif text-2xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function HerbSheet({ herb, symptoms }: { herb: Herb; symptoms: Symptom[] }) {
  const labelOf = (slug: string) => symptoms.find((s) => s.slug === slug)?.label ?? slug;
  const precautions = [...herb.precautions].sort((a, b) => ORDER.indexOf(a.severity) - ORDER.indexOf(b.severity));

  return (
    <article className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-xl italic text-mute">{herb.scientificName}</p>
          <h1 className="mt-1 font-serif text-5xl font-semibold leading-tight text-ink sm:text-6xl">{herb.commonName}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/85">{herb.summary}</p>
        </div>
        <FavoriteButton slug={herb.slug} name={herb.commonName} className="shrink-0" />
      </header>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div>
          <Section title="À savoir avant utilisation">
            <ul className="space-y-3">
              {precautions.map((p, i) => (
                <li key={i} className={`rounded-md border-l-4 p-4 ${SEVERITY[p.severity].box}`}>
                  <p className={`text-sm font-bold ${SEVERITY[p.severity].text}`}>
                    {SEVERITY[p.severity].label} : {KIND_LABEL[p.kind].toLowerCase()}
                  </p>
                  <p className="mt-1 text-ink">{p.text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Bienfaits traditionnels">
            <ul className="space-y-3">
              {herb.benefits.map((b) => (
                <li key={b.symptom} className="rounded-lg border border-line bg-card p-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-leaf">{labelOf(b.symptom)}</h3>
                    <span className="text-sm text-mute">{EVIDENCE_LABEL[b.evidence]}</span>
                  </div>
                  <p className="mt-2 leading-relaxed">{b.text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Modes de consommation et préparations">
            <div className="space-y-3">
              {herb.preparations.map((p) => (
                <div key={p.title} className="rounded-lg border border-line bg-card p-5">
                  <p className="text-sm font-semibold text-accent">{METHOD_LABEL[p.method]}</p>
                  <h3 className="mt-0.5 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 leading-relaxed">{p.steps}</p>
                  {p.note && <p className="mt-2 text-sm text-mute">{p.note}</p>}
                </div>
              ))}
            </div>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="mt-10 rounded-lg border border-line bg-card p-5">
            <h2 className="font-serif text-xl font-semibold">Fiche d’identité</h2>
            <dl className="mt-3 space-y-3 text-sm">
              <div><dt className="font-semibold text-mute">Famille</dt><dd>{herb.family}</dd></div>
              <div><dt className="font-semibold text-mute">Parties utilisées</dt><dd>{herb.parts.join(", ")}</dd></div>
              <div>
                <dt className="font-semibold text-mute">Principes actifs</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {herb.activePrinciples.map((a) => (
                    <span key={a} className="rounded-full bg-leaf-soft px-2.5 py-1 text-xs font-medium text-leaf">{a}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-mute">Pleine saison</dt>
                <dd>
                  <ol className="mt-1.5 grid grid-cols-12 gap-0.5" aria-label="Mois de pleine saison">
                    {MONTH_NAMES.map((name, i) => {
                      const on = herb.months.includes(i + 1);
                      return (
                        <li key={name} className={`flex h-8 items-center justify-center rounded-sm text-xs font-semibold ${on ? "bg-leaf text-on-leaf" : "bg-leaf-soft text-mute"}`}>
                          <span aria-hidden="true">{name[0].toUpperCase()}</span>
                          <span className="sr-only">{name}{on ? " : en saison" : ""}</span>
                        </li>
                      );
                    })}
                  </ol>
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      <p className="mt-12 rounded-md bg-leaf-soft p-4 text-sm leading-relaxed text-ink">
        Ces informations relèvent d’usages traditionnels et ne remplacent pas un avis médical. En cas de doute,
        de grossesse, d’allaitement, de traitement en cours ou de symptômes qui persistent, parlez-en à un
        professionnel de santé.
      </p>
    </article>
  );
}
