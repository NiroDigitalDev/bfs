"use client";

import { useEffect, useRef, useState } from "react";

type Chapter = {
  id: string;
  numeral: string;
  label: string;
};

const CHAPTERS: Chapter[] = [
  { id: "top", numeral: "I", label: "Atelier" },
  { id: "supplies", numeral: "II", label: "Catalogue" },
  { id: "manifesto", numeral: "III", label: "Position" },
  { id: "cult", numeral: "IV", label: "Cult" },
  { id: "faq", numeral: "V", label: "Notes" },
];

export function ChapterRail() {
  const [activeId, setActiveId] = useState<string>(CHAPTERS[0].id);
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const targets = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    const ratios = ratiosRef.current;
    targets.forEach((el) => ratios.set(el.id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let topId = CHAPTERS[0].id;
        let topRatio = -1;
        for (const c of CHAPTERS) {
          const r = ratios.get(c.id) ?? 0;
          if (r > topRatio) {
            topRatio = r;
            topId = c.id;
          }
        }
        if (topRatio > 0) setActiveId(topId);
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
