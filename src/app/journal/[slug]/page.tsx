import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalPostFrame } from "@/components/journal-post-frame";
import {
  getAllPosts,
  getPostBySlug,
  getPostIndex,
} from "@/lib/journal";
import { site, siteUrl } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Piece not found",
      description: "The journal does not list this entry.",
      robots: { index: false, follow: true },
    };
  }
  const canonical = `/journal/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      url: canonical,
      siteName: site.name,
      title: `${post.title} · Journal · ${site.name}`,
      description: post.excerpt,
      locale: "en_US",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} · Journal · ${site.name}`,
      description: post.excerpt,
    },
    robots: { index: true, follow: true },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const index = getPostIndex(post.slug);
  const canonical = `${siteUrl}/journal/${post.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonical,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: `${siteUrl}/journal/${post.slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    keywords: post.tags.join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Vol. III · Journal",
        item: `${siteUrl}/journal`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <JournalPostFrame post={post} index={index} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
