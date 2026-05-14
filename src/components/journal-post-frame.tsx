import Link from "next/link";
import { SplitText } from "@/components/split-text";
import { Magnetic } from "@/components/magnetic";
import { RelatedJournalPosts } from "@/components/related-journal-posts";
import { formatJournalDate, romanNumeral } from "@/lib/journal";
import type { JournalPost } from "@/lib/journal";
import { site } from "@/lib/site";

export function JournalPostFrame({
  post,
  index,
}: {
  post: JournalPost;
  index: number;
}) {
  const heroWords = post.title.trim().split(/\s+/);
  const titleWord1 =
    heroWords.length > 1 ? heroWords.slice(0, -1).join(" ") : heroWords[0];
  const titleWord2 = heroWords.length > 1 ? heroWords[heroWords.length - 1] : "";

  const { Body } = post;

  return (
    <main className="journal-post" data-post={post.slug}>
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

      <nav className="journal-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link
              href="/journal"
              className="journal-breadcrumb-link"
              data-cursor="link"
            >
              <span className="journal-breadcrumb-arrow" aria-hidden>
                ←
              </span>
              <em>Vol. III · Journal</em>
            </Link>
          </li>
          <li aria-current="page" className="journal-breadcrumb-current">
            <span aria-hidden> / </span>
            <span>{post.title}</span>
          </li>
        </ol>
      </nav>

      <header className="journal-post-hero">
        <aside className="journal-post-edge" aria-hidden>
          <span className="journal-post-edge-stem">
            <span className="journal-post-edge-num">
              <em>{romanNumeral(index)}</em>
            </span>
            <span className="journal-post-edge-rule" />
            <span className="journal-post-edge-label">
              Piece · {romanNumeral(index)}
            </span>
          </span>
        </aside>

        <div className="journal-post-hero-frame">
          <span className="journal-post-eyebrow">
            <em>
              Piece {romanNumeral(index)} · {formatJournalDate(post.publishedAt)}
            </em>
          </span>

          <div className="journal-post-title-stack">
            <h1 className="journal-post-title" aria-label={post.title}>
              {titleWord2 ? (
                <>
                  <span
                    className="journal-post-word journal-post-word-1"
                    aria-hidden
                  >
                    <SplitText as="span" text={titleWord1} stagger={0.025} />
                  </span>
                  <span
                    className="journal-post-word journal-post-word-2"
                    aria-hidden
                  >
                    <SplitText
                      as="span"
                      text={titleWord2}
                      stagger={0.025}
                      start={0.18}
                      className="journal-post-outline"
                    />
                  </span>
                </>
              ) : (
                <span
                  className="journal-post-word journal-post-word-1"
                  aria-hidden
                >
                  <SplitText as="span" text={titleWord1} stagger={0.025} />
                </span>
              )}
            </h1>
            <span className="journal-post-aside">
              <span className="journal-post-aside-line" aria-hidden />
              <em>{post.subtitle}</em>
            </span>
            <span className="journal-post-byline">
              <em>By {post.author}</em>
            </span>
          </div>
        </div>
      </header>

      <article className="journal-prose">
        <Body />
      </article>

      <footer className="journal-post-foot">
        <ul className="journal-post-tags" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag} className="journal-post-tag">
              <em>{tag}</em>
            </li>
          ))}
        </ul>
        <div className="journal-post-foot-actions">
          <Magnetic strength={0.18}>
            <Link
              href="/journal"
              className="journal-post-return"
              data-cursor="link"
              data-cursor-label="Back"
            >
              <span className="journal-post-return-arrow" aria-hidden>
                ←
              </span>
              <em>Return to the journal</em>
            </Link>
          </Magnetic>
          <span className="journal-post-signoff">
            <em>{site.edition}</em>
          </span>
        </div>
      </footer>

      <RelatedJournalPosts current={post.slug} />
    </main>
  );
}
