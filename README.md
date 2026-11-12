# 🌿 Herbes & Bienfaits

Site + PWA sur les herbes aromatiques (**40 fiches**), 100 % gratuit : Next.js (export statique),
Tailwind CSS v4, Supabase (optionnel), hébergé sur GitHub Pages. Mode sombre automatique,
favoris hors ligne, installable comme une application.

**En ligne :** https://hamiche0808.github.io/herbes-bienfaits/

> ⚠️ **Information, pas conseil médical.** Les fiches présentent des usages traditionnels à
> titre informatif et ne remplacent pas l'avis d'un médecin ou d'un pharmacien.

## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # génère out/ (site statique)
npm run preview      # teste le site de production + la PWA
```

Sans configuration, le site lit `data/herbs.json`. Pour modifier ou ajouter des plantes :
éditez ce fichier (même structure que les fiches existantes) ou utilisez Supabase (ci-dessous).

## Supabase (facultatif)

1. Créez un projet gratuit sur supabase.com.
2. SQL Editor : exécutez `supabase/schema.sql`, puis `supabase/seed.sql`
   (`npm run seed:sql` le régénère à partir de `data/*.json`).
3. Copiez `.env.example` en `.env.local` et renseignez `SUPABASE_URL` et `SUPABASE_ANON_KEY` (Project Settings > API).
4. Ajoutez les mêmes variables sur votre hébergeur, et les secrets GitHub pour `keepalive.yml`.

Les données sont lues au moment du build : après une modification dans Supabase, redéployez
(`git commit --allow-empty -m rebuild && git push`). Si Supabase est indisponible, le site
retombe sur `data/herbs.json`.

## Déploiement (GitHub Pages, gratuit)

- Déploiement automatique via GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur `main`.
- Le `basePath` (`/herbes-bienfaits`) est défini dans `next.config.ts` et `lib/site.ts`.

## Installer la PWA

Android (Chrome) : menu ⋮ > Installer l'application. iPhone (Safari) : Partager > Sur l'écran d'accueil.

## Icônes

Régénérables avec : `npm run icons` (PowerShell, System.Drawing).

## Avant la mise en ligne publique

- Faire valider chaque fiche (EMA/HMPC, ANSM, ESCOP) et ajouter vos sources (voir `scripts/author_data.py`).
- Vérifier `app/mentions-legales/page.tsx`.

## Auteur

Site conçu et réalisé par **BEN MESLI Hamiche** ✦ — hamiche08.08@gmail.com
