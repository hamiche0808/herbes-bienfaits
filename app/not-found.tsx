import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
      <p className="font-serif text-6xl font-semibold text-leaf-300" aria-hidden="true">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-leaf-900">
        Cette page n'existe pas (ou plus)
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-mute">
        Le lien est peut-être erroné, ou la page a été déplacée.
        Revenez à la liste des plantes pour retrouver ce que vous cherchez.
      </p>
      <Link
        href="/"
        className="mt-8 min-h-11 rounded-full bg-leaf-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-leaf-500"
      >
        ← Toutes les plantes
      </Link>
    </div>
  );
}
