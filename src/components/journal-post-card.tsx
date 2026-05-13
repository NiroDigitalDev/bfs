import Link from "next/link";
import { Reveal } from "@/components/reveal";
import type { JournalPost } from "@/lib/journal";
import { formatJournalDate, romanNumeral } from "@/lib/journal";

export function JournalPostCard({
  post,
  index,
}: {
  post: JournalPost;
  index: number;
}) {
  return (
    <Reveal delay={`${index * 0.06}s`}>
      <article className="journal-entry" aria-labelledby={`entry-${post.slug}`}>
        <aside className="journal-entry-edge" aria-hidden>
          <span className="journal-entry-numeral">
            <em>{romanNumeral(index + 1)}</em>
          </span>
          <span className="journal-entry-rule" />
        </aside>
        <div className="journal-entry-body">
          <span className="journal-entry-meta">
            <span className="journal-entry-date">
              <em>{formatJournalDate(post.publishedAt)}</em>
            </span>
            <span className="journal-entry-tag-row" aria-hidden>
              <span className="journal-entry-tag-rule" />
            </span>
          </span>
          <h2 id={`entry-${post.slug}`} className="journal-entry-title">
            <Link
              href={`/journal/${post.slug}`}
              className="journal-entry-link"
              data-cursor="link"
              data-cursor-label="Read"
            >
              {post.title}
            </Link>
          </h2>
          <p className="journal-entry-subtitle">
            <em>{post.subtitle}</em>
          </p>
          <p className="journal-entry-excerpt">{post.excerpt}</p>
          <Link
            href={`/journal/${post.slug}`}
            className="journal-entry-cta"
            data-cursor="link"
            data-cursor-label="Open"
          >
            <em>Read the piece</em>
            <span className="journal-entry-cta-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
