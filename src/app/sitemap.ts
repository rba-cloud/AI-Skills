import type { MetadataRoute } from "next";
import { projects, resources, tools } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes = ["", "/learn", "/tools", "/projects", "/resources", "/training", "/training/practical-ai-skills", "/about", "/contact", "/insights", "/privacy", "/terms", "/refund-policy"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...tools.filter((item) => item.isPublished).map((item) => ({ url: `${base}/tools/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...projects.filter((item) => item.published).map((item) => ({ url: `${base}/projects/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...resources.filter((item) => item.published).map((item) => ({ url: `${base}/resources/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
