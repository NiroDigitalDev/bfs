import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { products } from "@/data/products";
import { getAllPosts } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();
  const journalLastModified =
    posts.length > 0 ? new Date(`${posts[0].publishedAt}T00:00:00Z`) : now;
  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...products.map((p) => ({
      url: `${siteUrl}/supplies/${p.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/journal`,
      lastModified: journalLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${siteUrl}/journal/${p.slug}`,
      lastModified: new Date(`${p.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...(["privacy", "terms", "cookies"] as const).map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
