// Génère supabase/seed.sql à partir de data/*.json  ->  npm run seed:sql
import { readFileSync, writeFileSync } from "node:fs";

const read = (f) => JSON.parse(readFileSync(new URL(`../data/${f}`, import.meta.url), "utf8"));
const herbs = read("herbs.json"), symptoms = read("symptoms.json"), tips = read("tips.json");

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const arr = (a) => `array[${a.map(q).join(",")}]::text[]`;
const hid = (slug) => `(select id from public.herbs where slug = ${q(slug)})`;
const sid = (slug) => `(select id from public.symptoms where slug = ${q(slug)})`;

const out = [
  "-- Généré par scripts/json-to-sql.mjs : exécutez schema.sql puis ce fichier (une seule fois).",
  "-- Pour repartir de zéro : truncate public.herbs, public.symptoms, public.tips cascade;",
  "",
];
for (const s of symptoms) out.push(`insert into public.symptoms (slug, label) values (${q(s.slug)}, ${q(s.label)}) on conflict (slug) do nothing;`);
out.push("");
for (const h of herbs) {
  out.push(`-- ${h.commonName}`);
  out.push(
    `insert into public.herbs (slug, common_name, scientific_name, family, summary, parts_used, active_principles, harvest_months, published) values (` +
    `${q(h.slug)}, ${q(h.commonName)}, ${q(h.scientificName)}, ${q(h.family)}, ${q(h.summary)}, ${arr(h.parts)}, ${arr(h.activePrinciples)}, ` +
    `array[${h.months.join(",")}]::int[], true) on conflict (slug) do nothing;`
  );
  for (const b of h.benefits)
    out.push(`insert into public.benefits (herb_id, symptom_id, description, evidence_level) values (${hid(h.slug)}, ${sid(b.symptom)}, ${q(b.text)}, ${q(b.evidence)}) on conflict do nothing;`);
  h.preparations.forEach((p, i) =>
    out.push(`insert into public.preparations (herb_id, method, title, instructions, note, sort_order) values (${hid(h.slug)}, ${q(p.method)}, ${q(p.title)}, ${q(p.steps)}, ${p.note ? q(p.note) : "null"}, ${i});`));
  for (const p of h.precautions)
    out.push(`insert into public.precautions (herb_id, kind, severity, description) values (${hid(h.slug)}, ${q(p.kind)}, ${q(p.severity)}, ${q(p.text)});`);
  out.push("");
}
for (const t of tips)
  out.push(`insert into public.tips (slug, category, title, body) values (${q(t.slug)}, ${q(t.category)}, ${q(t.title)}, ${q(t.body)}) on conflict (slug) do nothing;`);

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), out.join("\n") + "\n");
console.log(`seed.sql : ${herbs.length} plantes, ${tips.length} conseils`);
