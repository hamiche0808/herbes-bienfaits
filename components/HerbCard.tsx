"use client";
import Link from "next/link";
import type { Herb, Symptom } from "@/lib/types";
import FavoriteButton from "./FavoriteButton";

export default function HerbCard({ herb, symptoms }: { herb: Herb; symptoms: Symptom[] }) {
  const label = (s: string) => symptoms.find((x) => x.slug === s)?.label ?? s;
  return (
    <div className="relative h-full">
      <Link
        href={`/plantes/${herb.slug}/`}
        className="group flex h-full flex-col rounded-lg border border-line bg-card p-5 pr-14 transition-colors hover:border-leaf"
      >
        <p className="font-serif text-sm italic text-mute">{herb.scientificName}</p>
        <h2 className="mt-1 font-serif text-2xl font-semibold text-ink group-hover:text-leaf">{herb.commonName}</h2>
        <p className="mt-2 line-clamp-2 leading-relaxed text-ink/80">{herb.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {herb.benefits.map((b) => (
            <li key={b.symptom} className="rounded-full bg-leaf-soft px-2.5 py-1 text-xs font-medium text-leaf">
              {label(b.symptom)}
            </li>
          ))}
        </ul>
      </Link>
      <FavoriteButton slug={herb.slug} name={herb.commonName} className="absolute right-2 top-2" />
    </div>
  );
}
