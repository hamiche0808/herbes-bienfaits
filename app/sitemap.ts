import type { MetadataRoute } from "next";
import { getAllHerbs } from "@/lib/herbs";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const herbs = await getAllHerbs();
  const pages = ["/", "/conseils/", "/a-propos/", "/mentions-legales/"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}` })),
    ...herbs.map((h) => ({ url: `${SITE_URL}/plantes/${h.slug}/` })),
  ];
}
