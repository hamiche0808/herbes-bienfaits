import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HerbSheet from '@/components/HerbSheet';
import { getAllHerbs } from '@/lib/herbs';
import { SYMPTOMS } from '@/lib/seed';

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
  return <HerbSheet herb={herb} symptoms={SYMPTOMS} />;
}
