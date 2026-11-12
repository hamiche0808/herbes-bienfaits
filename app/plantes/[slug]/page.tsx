import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HerbSheet from "@/components/HerbSheet";
import { SYMPTOMS } from "@/lib/data";
import { getAllHerbs } from "@/lib/herbs";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllHerbs()).map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const herb = (await getAllHerbs()).find((h) => h.slug === slug);
  return herb ? { title: herb.commonName, description: herb.summary } : {};
}

export default async function HerbPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const herb = (await getAllHerbs()).find((h) => h.slug === slug);
  if (!herb) notFound();
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <Link href="/" className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline underline-offset-4">Toutes les plantes</Link>
      </div>
      <HerbSheet herb={herb} symptoms={SYMPTOMS} />
    </>
  );
}
