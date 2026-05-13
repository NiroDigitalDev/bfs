"use client";

import type { CSSProperties } from "react";
import { CHAPTERS } from "@/data/chapters";
import { useActiveChapter } from "@/lib/use-active-chapter";

export function ChapterRail() {
  const { activeId, ratios } = useActiveChapter();

  return (
    <nav
      className="chapter-rail"
      aria-label="Chapter index"
      data-active={activeId}
    >
      <ol className="chapter-rail-list">
        {CHAPTERS.map((c) => {
          const isActive = c.id === activeId;
          const fill = ratios[c.id] ?? 0;
          return (
            <li key={c.id} className="chapter-rail-item">
              <a
                href={`#${c.id}`}
                className="chapter-rail-link"
                style={{ "--rail-fill": fill } as CSSProperties}
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
