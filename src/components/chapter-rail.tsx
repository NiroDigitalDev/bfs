"use client";

import { CHAPTERS } from "@/data/chapters";
import { useActiveChapter } from "@/lib/use-active-chapter";

export function ChapterRail() {
  const activeId = useActiveChapter();

  return (
    <nav
      className="chapter-rail"
      aria-label="Chapter index"
      data-active={activeId}
    >
      <ol className="chapter-rail-list">
        {CHAPTERS.map((c) => {
          const isActive = c.id === activeId;
          return (
            <li key={c.id} className="chapter-rail-item">
              <a
                href={`#${c.id}`}
                className="chapter-rail-link"
                aria-current={isActive ? "true" : undefined}
                data-cursor="link"
                data-cursor-label={c.label}
              >
                <span className="chapter-rail-numeral" aria-hidden>
                  {c.numeral}
                </span>
                <span className="chapter-rail-rule" aria-hidden />
                <span className="chapter-rail-label">{c.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
