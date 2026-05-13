import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Tilt } from "@/components/tilt";
import { formatJournalDate, getRelatedPosts, romanNumeral } from "@/lib/journal";

export function RelatedJournalPosts({ current }: { current: string }) {
  const siblings = getRelatedPosts(current, 2);
  if (siblings.length === 0) return null;

  return (
    <section className="journal-related" aria-labelledby="journal-related-heading">
      <header className="journal-related-head">
        <span className="journal-related-eyebrow">
          <span className="journal-related-eyebrow-rule" aria-hidden />
          <em>Related dispatches</em>
        </span>
        <h2 id="journal-related-heading" className="journal-related-title">
          Two further pieces.
        </h2>
      </header>
      <ol className="journal-related-grid">
        {siblings.map((p, i) => (
          <Reveal key={p.slug} delay={`${i * 0.08}s`}>
            <li className="journal-related-item">
              <Link
                href={`/journal/${p.slug}`}
                className="journal-related-link"
                data-cursor="link"
                data-cursor-label="Open"
                aria-label={`${p.title} — ${formatJournalDate(p.publishedAt)}`}
              >
                <Tilt className="journal-related-frame" max={3}>
                  <span className="journal-related-frame-rule" aria-hidden />
                  <span className="journal-related-frame-numeral" aria-hidden>
                    <em>{romanNumeral(i + 1)}</em>
                  </span>
                  <span className="journal-related-frame-glyph" aria-hidden />
                </Tilt>
                <div className="journal-related-meta">
                  <span className="journal-related-date">
                    <em>{formatJournalDate(p.publishedAt)}</em>
                  </span>
                  <h3 className="journal-related-name">{p.title}</h3>
                  <span className="journal-related-sub">
                    <em>{p.subtitle}</em>
                  </span>
                  <span className="journal-related-arrow" aria-hidden>
                    Read the piece ↗
                  </span>
                </div>
              </Link>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
