import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-5xl font-semibold">Page introuvable</h1>
      <p className="mt-4 text-mute">Cette fiche n’existe pas ou a été déplacée.</p>
      <Link href="/" className="mt-6 inline-flex min-h-11 items-center rounded-md bg-leaf px-5 font-medium text-on-leaf">Retour aux plantes</Link>
    </div>
  );
}
