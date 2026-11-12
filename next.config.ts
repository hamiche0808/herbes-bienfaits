import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",       // site 100 % statique -> dossier /out
  trailingSlash: true,    // /plantes/thym/ marche sur tous les hébergeurs statiques
  images: { unoptimized: true },
  basePath: "/herbes-bienfaits", // déploiement GitHub Pages projet
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;
