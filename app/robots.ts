import type { MetadataRoute } from "next";
import { isIndexableProduction, SITE_URL } from "../lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexableProduction
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
