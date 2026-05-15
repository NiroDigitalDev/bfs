import type { ComponentType } from "react";

export type JournalPost = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  tags: string[];
  Body: ComponentType<Record<string, never>>;
  cover?: string;
};

const ROMAN = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

export function romanNumeral(n: number): string {
  if (n < 1) return "I";
  if (n <= ROMAN.length) return ROMAN[n - 1];
  return String(n);
}

export function formatJournalDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}

import { journalPosts } from "@/data/journal";

export function getAllPosts(): JournalPost[] {
  return [...journalPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );
}

export function getPostBySlug(slug: string): JournalPost | null {
  return journalPosts.find((p) => p.slug === slug) ?? null;
}

export function getPostIndex(slug: string): number {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  return i < 0 ? 0 : posts.length - i;
}

export function getRelatedPosts(slug: string, n = 2): JournalPost[] {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx < 0) return posts.slice(0, n);
  const siblings: JournalPost[] = [];
  const len = posts.length;
  if (len <= 1) return [];
  for (let step = 1; step <= len && siblings.length < n; step++) {
    const before = posts[(idx - step + len) % len];
    const after = posts[(idx + step) % len];
    if (before && before.slug !== slug && !siblings.includes(before)) {
      siblings.push(before);
      if (siblings.length >= n) break;
    }
    if (after && after.slug !== slug && !siblings.includes(after)) {
      siblings.push(after);
    }
  }
  return siblings;
}

export type AdjacentPost = {
  post: JournalPost;
  pieceIndex: number;
  direction: "prev" | "next";
  label: "Previous" | "Next";
};

export function getAdjacentPosts(
  slug: string,
): { prev: AdjacentPost; next: AdjacentPost } | null {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  const len = posts.length;
  if (idx < 0 || len <= 1) return null;
  const prevPost = posts[(idx - 1 + len) % len];
  const nextPost = posts[(idx + 1) % len];
  return {
    prev: {
      post: prevPost,
      pieceIndex: len - ((idx - 1 + len) % len),
      direction: "prev",
      label: "Previous",
    },
    next: {
      post: nextPost,
      pieceIndex: len - ((idx + 1) % len),
      direction: "next",
      label: "Next",
    },
  };
}
