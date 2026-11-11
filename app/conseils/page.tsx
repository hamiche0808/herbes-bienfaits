import type { Metadata } from 'next';
import { TIPS } from '@/lib/seed';

export const metadata: Metadata = { title: 'Conseils pratiques' };

const SECTIONS = [
  { key: 'culture', title: '🌱 Culture' },
  { key: 'conservation', title: '🫙 Conservation' },
  { key: 'quotidien', title: '🍵 Au quotidien' },
] as const;

export default function Conseils() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-4xl font-semibold text-leaf-900">Conseils pratiques</h1>
      {SECTIONS.map((s) => (
        <section key={s.key} className="mt-10">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-leaf-700">{s.title}</h2>
          <div className="space-y-4">
            {TIPS.filter((t) => t.category === s.key).map((t) => (
              <article key={t.slug} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <h3 className="font-semibold text-leaf-900">{t.title}</h3>
                <p className="mt-2 leading-relaxed">{t.body}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
