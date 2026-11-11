import { HERBS } from './seed';
import type { Herb } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
function toHerb(r: any): Herb {
  return {
    slug: r.slug,
    commonName: r.common_name,
    scientificName: r.scientific_name,
    family: r.family ?? '',
    summary: r.summary,
    parts: r.parts_used ?? [],
    activePrinciples: r.active_principles ?? [],
    months: r.harvest_months ?? [],
    benefits: (r.benefits ?? []).map((b: any) => ({
      symptom: b.symptoms.slug, text: b.description, evidence: b.evidence_level,
    })),
    preparations: (r.preparations ?? [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((p: any) => ({ method: p.method, title: p.title, steps: p.instructions, note: p.note ?? undefined })),
    precautions: (r.precautions ?? []).map((p: any) => ({
      kind: p.kind, severity: p.severity, text: p.description,
    })),
  };
}

// Lit Supabase au build si les variables d'environnement sont configurées,
// sinon repli automatique sur les données de départ (seed.ts).
async function fromSupabase(): Promise<Herb[] | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const select =
      '*,benefits(description,evidence_level,symptoms(slug)),' +
      'preparations(method,title,instructions,note,sort_order),' +
      'precautions(kind,severity,description)';
    const res = await fetch(
      `${url}/rest/v1/herbs?select=${encodeURIComponent(select)}&published=eq.true&order=common_name`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    return rows.length ? rows.map(toHerb) : null;
  } catch (e) {
    console.warn('[herbs] Supabase indisponible, repli sur seed.ts :', e);
    return null;
  }
}

let cache: Promise<Herb[]> | null = null;
export function getAllHerbs(): Promise<Herb[]> {
  return (cache ??= fromSupabase().then((r) => r ?? HERBS));
}
