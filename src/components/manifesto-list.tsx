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
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const next = entry.intersectionRatio > 0.5 ? "true" : "false";
          (entry.target as HTMLElement).setAttribute("data-active", next);
        });
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
