"use client";

import { useEffect, useRef } from "react";

export function Spotlight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 50;
    let ty = 50;
    let cx = 50;
    let cy = 50;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--sx", `${cx.toFixed(1)}%`);
      el.style.setProperty("--sy", `${cy.toFixed(1)}%`);
      raf = requestAnimationFrame(loop);
    };
    parent.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} className={`spotlight ${className}`} aria-hidden />;
}
