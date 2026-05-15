import type { Metadata } from "next";
import Link from "next/link";
import { JournalFolio } from "@/components/journal-folio";
import { JournalPostCard } from "@/components/journal-post-card";
import { Magnetic } from "@/components/magnetic";
import { SplitText } from "@/components/split-text";
import { WaxSealMark } from "@/components/wax-seal-mark";
import { getAllPosts } from "@/lib/journal";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Editorial dispatches from the press at Blacks For Sale — notes on monochrome, paper, and the italic.",
  alternates: {
    canonical: "/journal",
    types: {
      "application/rss+xml": [
        { url: "/journal/rss.xml", title: `${site.name} · Journal` },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: "/journal",
    siteName: site.name,
    title: `Journal · ${site.name}`,
    description:
      "Editorial dispatches from the press — notes on a single hue, paper, and the italic.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Journal · ${site.name}`,
    description:
      "Editorial dispatches from the press — notes on a single hue, paper, and the italic.",
  },
  robots: { index: true, follow: true },
};

export default function JournalIndexPage() {
  const posts = getAllPosts();

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/journal`,
    url: `${siteUrl}/journal`,
    name: `${site.name} · Journal`,
    description:
      "Editorial dispatches from the press at Blacks For Sale — notes on monochrome, paper, and the italic.",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${siteUrl}/journal/${p.slug}`,
      datePublished: p.publishedAt,
      author: { "@type": "Person", name: p.author },
    })),
  };

  return (
    <main className="journal">
      <nav className="nav journal-nav">
        <Link
          href="/"
          className="nav-logo"
          data-cursor="link"
          aria-label={site.name}
        >
          <span className="nav-logo-mark" aria-hidden>
            ■
          </span>
          <span>{site.name}</span>
          <span className="nav-logo-sub">Vol. III · MMXXVI</span>
        </Link>
        <div className="nav-center">
          <div className="nav-links">
            <Link href="/journal" data-cursor="link" aria-current="page">
              <span className="nav-num">·</span> Journal
            </Link>
            <Link href="/#supplies" data-cursor="link">
              <span className="nav-num">01</span> Catalogue
            </Link>
            <Link href="/#manifesto" data-cursor="link">
              <span className="nav-num">02</span> Position
            </Link>
            <Link href="/#cult" data-cursor="link">
              <span className="nav-num">03</span> Field Notes
            </Link>
          </div>
        </div>
      </nav>

      <header className="journal-header">
        <WaxSealMark />
        <span className="journal-eyebrow">
          <span className="journal-eyebrow-rule" aria-hidden />
          <em>Journal · Editorial dispatches</em>
        </span>
        <h1 className="journal-display" aria-label="The Journal.">
          <span className="journal-display-word journal-display-word-1" aria-hidden>
            <SplitText as="span" text="The" stagger={0.04} />
            <span className="journal-display-period">
              <SplitText as="span" text="." stagger={0} start={0.4} />
            </span>
          </span>
          <span className="journal-display-word journal-display-word-2" aria-hidden>
            <SplitText
              as="span"
              text="Journal"
              stagger={0.04}
              start={0.22}
              className="journal-display-outline"
            />
          </span>
        </h1>
        <p className="journal-lede">
          Notes from the press at <em>{site.name}</em> — short editorial pieces
          on paper, ink, and the single hue.
        </p>
      </header>

      <section className="journal-list" aria-label="Pieces">
        {posts.length === 0 ? (
          <p className="journal-empty">
            <em>The press is still setting. Check the colophon for dispatch.</em>
          </p>
        ) : (
          <ol className="journal-entries">
            {posts.map((p, i) => (
              <li key={p.slug} className="journal-entries-item">
                <JournalPostCard post={p} index={i} />
              </li>
            ))}
          </ol>
        )}
      </section>

      <footer className="journal-foot">
        <Magnetic strength={0.18}>
          <Link
            href="/"
            className="journal-foot-return"
            data-cursor="link"
            data-cursor-label="Back"
          >
            <span className="journal-foot-return-arrow" aria-hidden>
              ←
            </span>
            <em>Return to the volume</em>
          </Link>
        </Magnetic>
        <span className="journal-foot-signoff">
          <em>{site.edition}</em>
        </span>
      </footer>

      <JournalFolio variant="index" total={posts.length} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />
    </main>
  );
}
