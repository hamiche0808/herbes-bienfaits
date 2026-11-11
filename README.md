# 🌿 Herbes & Bienfaits

Fiches pratiques sur les herbes aromatiques : usages traditionnels, préparations,
précautions et conseils de culture. Site éducatif 100 % gratuit, installable
comme application (PWA) et consultable hors ligne.

**En ligne :** https://hamiche0808.github.io/herbes-bienfaits/

> ⚠️ **Information, pas conseil médical.** Les contenus présentent des usages
> traditionnels à titre informatif et ne remplacent pas l'avis d'un médecin ou
> d'un pharmacien.

## Fonctionnalités

- 🔎 Recherche plein texte (nom, besoin, préparation, principe actif)
- 🏷️ Filtres par besoin de santé, mode d'utilisation, saison
- 🌱 Fiches plantes : précautions d'abord, bienfaits (avec niveau de preuve),
  principes actifs, préparations, saisonnalité sur 12 mois
- 📓 Page conseils : culture, conservation, au quotidien
- 📱 PWA : manifest + service worker (cache hors ligne)
- ♿ Accessibilité : contrastes AA, focus visible, zones tactiles 44 px

## Stack

Next.js 16 (App Router, `output: 'export'`) · TypeScript · Tailwind CSS v4 ·
PWA manuelle · Données de départ dans [`lib/seed.ts`](lib/seed.ts)
(supabase optionnel : voir [`lib/herbs.ts`](lib/herbs.ts)).

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # génère le dossier out/
```

## Déploiement

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) :
chaque push sur `main` build le site et publie `out/`.
Le `basePath` (`/herbes-bienfaits`) est défini dans `next.config.ts` et
[`lib/site.ts`](lib/site.ts).

## Icônes PWA

Régénérables avec :

```bash
powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1
```

## Auteur

Site conçu et réalisé par **BEN MESLI Hamiche** ✦ — hamiche08.08@gmail.com
