import type { MetadataRoute } from "next";
import { CLUB } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${CLUB.url}/sitemap.xml`,
  };
}
