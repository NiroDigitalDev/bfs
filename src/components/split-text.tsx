"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  stagger?: number;
  start?: number;
  id?: string;
};

export function SplitText({
  text,
  className = "",
  as: As = "span",
  stagger = 0.04,
  start = 0,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("split-active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");
  let i = 0;

  return (
    <As
      ref={ref as never}
      id={id}
      className={`split ${className}`}
      aria-label={text}
    >
      {words.map((w, wi) => (
        <span key={wi} className="split-word" aria-hidden>
          {Array.from(w).map((c, ci) => {
            const idx = i++;
            return (
              <span
                key={ci}
                className="split-char"
                style={{ transitionDelay: `${start + idx * stagger}s` }}
              >
                {c}
              </span>
            );
          })}
          {wi < words.length - 1 ? <span className="split-space"> </span> : null}
        </span>
      ))}
    </As>
  );
}
