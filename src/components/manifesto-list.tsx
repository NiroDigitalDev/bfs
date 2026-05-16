"use client";

import { useEffect, useRef } from "react";

export type ManifestoItem = { t: string; d: string };

export function ManifestoList({ items }: { items: ManifestoItem[] }) {
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter((el): el is HTMLLIElement => el !== null);
    if (els.length === 0) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      els.forEach((el) => el.setAttribute("data-active", "true"));
      document.dispatchEvent(
        new CustomEvent("bfs:manifesto:active", { detail: { index: null } })
      );
      return;
    }

    const ratios = new Map<HTMLLIElement, number>();
    let lastDispatched: number | null = -1;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLLIElement;
          ratios.set(target, entry.intersectionRatio);
          target.setAttribute(
            "data-active",
            entry.intersectionRatio > 0.5 ? "true" : "false"
          );
        });
        let bestIdx = -1;
        let bestRatio = 0.5;
        ratios.forEach((ratio, target) => {
          if (ratio > bestRatio) {
            const idx = els.indexOf(target);
            if (idx !== -1) {
              bestIdx = idx;
              bestRatio = ratio;
            }
          }
        });
        const next: number | null = bestIdx === -1 ? null : bestIdx;
        if (next !== lastDispatched) {
          lastDispatched = next;
          document.dispatchEvent(
            new CustomEvent("bfs:manifesto:active", {
              detail: { index: next },
            })
          );
        }
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ol className="manifesto-list">
      {items.map((m, i) => (
        <li
          key={m.t}
          className="manifesto-item"
          data-active="false"
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <span className="manifesto-num">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3>{m.t}</h3>
            <p>{m.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
