"use client";

import { useEffect } from "react";

/**
 * Writes window.scrollY as a unitless number to `--scroll-y` on :root,
 * once per animation frame. CSS rules consume it via
 * `calc(var(--scroll-y, 0) * <factor>px)` for differential parallax
 * without per-element listeners. Skipped entirely under reduced-motion.
 */
export function ParallaxRoot() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let raf = 0;
    let pending = false;

    const write = () => {
      pending = false;
      root.style.setProperty("--scroll-y", String(window.scrollY));
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
