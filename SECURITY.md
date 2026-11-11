# Politique de sécurité — Herbes & Bienfaits

## Signaler une faille

Signale toute faille de sécurité par e-mail à **hamiche08.08@gmail.com**
(compte GitHub : `hamiche0808`). Une réponse est apportée sous 7 jours.
Merci de ne pas ouvrir d'issue publique pour une faille non corrigée.

## Mesures en place

- **Content-Security-Policy** stricte (meta `http-equiv`) : tout est
  self-hosted, `object-src 'none'`, `frame-src 'none'`, aucune ressource externe.
- **Referrer-Policy** : `strict-origin-when-cross-origin`.
- **Service worker** : ne met en cache que les réponses `ok` same-origin,
  gestion d'erreurs sur toutes les opérations de cache, versionné (`herbes-v1`).
- **Aucune donnée personnelle collectée** : pas d'analytics, pas de cookies,
  pas de formulaire → pas de bandeau RGPD nécessaire.
- **Clés Supabase** (si activé plus tard) : uniquement la clé *anon/publishable*
  au build, jamais la `service_role` ; le fichier `.env.local` est ignoré par git.
- Rendu React échappé par défaut : aucun `dangerouslySetInnerHTML`,
  aucune donnée utilisateur injectée dans le DOM.

## Limites connues (hébergement GitHub Pages)

GitHub Pages ne permet pas de définir des en-têtes HTTP personnalisés
(`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`).
La CSP est donc appliquée via balise `<meta http-equiv>` ; HTTPS est fourni
par GitHub. Une migration vers Cloudflare Pages permettrait des en-têtes complets.

## Dépendances

`npm audit` signale 7 vulnérabilités **modérées** dans la chaîne ESLint
(`typescript-eslint`), imposées par `eslint-config-next` de Next 16.
Impact nul en production : ce sont des outils de développement jamais livrés
aux visiteurs. À revérifier après chaque mise à jour de Next.js.
