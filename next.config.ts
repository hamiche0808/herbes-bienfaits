import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // site 100 % statique → dossier /out
  trailingSlash: true, // /plantes/thym/ fonctionne sur tous les hébergeurs statiques
  images: { unoptimized: true },
  basePath: "/herbes-bienfaits", // déploiement GitHub Pages projet
};

export default nextConfig;
