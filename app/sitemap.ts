import type { MetadataRoute } from "next";

const base = "https://ehcc.club";
const routes = ["", "/about", "/events", "/projects", "/learn", "/games", "/team", "/join"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
