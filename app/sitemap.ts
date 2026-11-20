import type { MetadataRoute } from "next";
import { CLUB } from "@/content/site";

const base = CLUB.url;
const routes = ["", "/courses", "/games"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
