import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getAdjacentPosts, romanNumeral } from "@/lib/journal";

export function RelatedJournalPosts({ current }: { current: string }) {
  const adjacent = getAdjacentPosts(current);
  if (!adjacent) return null;
  const siblings = [adjacent.prev, adjacent.next] as const;

  return (
    <section
      className="journal-related"
      aria-labelledby="journal-related-heading"
    >
      <header className="journal-related-head">
        <span className="journal-related-eyebrow">
          <span className="journal-related-eyebrow-rule" aria-hidden />
          <em>Cross-references</em>
        </span>
        <h2 id="journal-related-heading" className="journal-related-title">
          Two further pieces.
        </h2>
      </header>
      <ol className="journal-related-grid">
        {siblings.map(({ post: p, pieceIndex, direction, label }, i) => {
          const fig = romanNumeral(pieceIndex);
          return (
            <Reveal key={p.slug} delay={`${i * 0.08}s`}>
              <li
                className="journal-related-item"
                data-direction={direction}
              >
                <span className="journal-related-numeral" aria-hidden>
                  {fig}
                </span>
                <Link
                  href={`/journal/${p.slug}`}
                  className="journal-related-link"
                  data-cursor="link"
                  data-cursor-label="Open"
                  aria-label={`${label} piece · ${p.title} · Piece ${fig}`}
                >
                  <div className="journal-related-meta">
                    <span className="journal-related-eyebrow-pair">
                      {direction === "prev" ? (
                        <>
                          <em className="journal-related-eyebrow-label">
                            <span aria-hidden>← </span>
                            {label}
                          </em>
                          <span
                            className="journal-related-eyebrow-sep"
                            aria-hidden
                          >
                            ·
                          </span>
                          <span className="journal-related-piece">
                            Piece&thinsp;·&thinsp;{fig}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="journal-related-piece">
                            Piece&thinsp;·&thinsp;{fig}
                          </span>
                          <span
                            className="journal-related-eyebrow-sep"
                            aria-hidden
                          >
                            ·
                          </span>
                          <em className="journal-related-eyebrow-label">
                            {label}
                            <span aria-hidden> →</span>
                          </em>
                        </>
                      )}
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
          );
        })}
      </ol>
    </section>
  );
}
