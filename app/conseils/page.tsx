import type { Metadata } from "next";
import { TIPS } from "@/lib/data";

export const metadata: Metadata = { title: "Conseils pratiques", description: "Culture, conservation et usage quotidien des herbes aromatiques." };

const SECTIONS = [
  { key: "culture", title: "Culture" },
  { key: "conservation", title: "Conservation" },
  { key: "quotidien", title: "Au quotidien" },
] as const;

export default function Conseils() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-5xl font-semibold">Conseils pratiques</h1>
      <nav aria-label="Rubriques" className="mt-6 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a key={s.key} href={`#${s.key}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm font-medium hover:border-leaf">{s.title}</a>
        ))}
      </nav>
      {SECTIONS.map((s) => (
        <section key={s.key} id={s.key} className="mt-12 scroll-mt-6">
          <h2 className="font-serif text-3xl font-semibold text-leaf">{s.title}</h2>
          <div className="mt-4 space-y-3">
            {TIPS.filter((t) => t.category === s.key).map((t) => (
              <article key={t.slug} className="rounded-lg border border-line bg-card p-5">
                <h3 className="text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 max-w-prose leading-relaxed">{t.body}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
