"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const setMode = (mode: string, label = "") => {
      ringRef.current?.setAttribute("data-mode", mode);
      dotRef.current?.setAttribute("data-mode", mode);
      if (labelRef.current) labelRef.current.textContent = label;
    };

    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select, label"
      );
      if (!t) return setMode("default");
      const m = t.dataset.cursor || (t.tagName === "BUTTON" || t.tagName === "A" ? "link" : "default");
      setMode(m, t.dataset.cursorLabel || "");
    };

    const onDown = () => ringRef.current?.setAttribute("data-press", "1");
    const onUp = () => ringRef.current?.removeAttribute("data-press");
    const onLeave = () => ringRef.current?.setAttribute("data-hidden", "1");
    const onEnter = () => ringRef.current?.removeAttribute("data-hidden");

    ringRef.current?.removeAttribute("data-init");
    dotRef.current?.removeAttribute("data-init");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-init="1" aria-hidden>
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" data-init="1" aria-hidden />
    </>
  );
}
