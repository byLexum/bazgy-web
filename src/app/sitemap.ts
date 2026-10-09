import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/projeler", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hakkimizda", priority: 0.8, changeFrequency: "yearly" },
  { path: "/career", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/kvkk", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cerez-politikasi", priority: 0.2, changeFrequency: "yearly" },
  { path: "/gizlilik-politikasi", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
