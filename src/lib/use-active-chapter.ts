"use client";

import { useEffect, useState } from "react";
import { CHAPTERS } from "@/data/chapters";

export type ChapterScroll = {
  activeId: string;
  ratios: Record<string, number>;
};

const initialRatios = (): Record<string, number> =>
  Object.fromEntries(CHAPTERS.map((c) => [c.id, 0]));

export function useActiveChapter(): ChapterScroll {
  const [state, setState] = useState<ChapterScroll>(() => ({
    activeId: CHAPTERS[0].id,
    ratios: initialRatios(),
  }));

  useEffect(() => {
    const targets = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setState((prev) => {
          const next: Record<string, number> = { ...prev.ratios };
          for (const entry of entries) {
            next[entry.target.id] = entry.intersectionRatio;
          }
          let topId = prev.activeId;
          let topRatio = -1;
          for (const c of CHAPTERS) {
            const r = next[c.id] ?? 0;
            if (r > topRatio) {
              topRatio = r;
              topId = c.id;
            }
          }
          const activeId = topRatio > 0 ? topId : prev.activeId;
          return { activeId, ratios: next };
        });
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return state;
}
