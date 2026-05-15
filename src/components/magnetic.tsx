"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  reveal?: boolean;
};

export function Magnetic({
  children,
  className = "",
  strength = 0.3,
  reveal = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let td = 0;
    let cd = 1;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      tx = mx * strength;
      ty = my * strength;
      if (reveal) {
        const dist = Math.hypot(mx, my);
        const fieldRadius = Math.hypot(r.width, r.height) / 2;
        td = Math.max(0, Math.min(1, 1 - dist / fieldRadius));
      }
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (reveal) td = 0;
    };
    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (reveal) {
        cd += (td - cd) * 0.15;
        el.style.setProperty("--magnetic-distance", cd.toFixed(3));
      }
      raf = requestAnimationFrame(loop);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, reveal]);

  const classes = `magnetic${reveal ? " magnetic-reveal" : ""}${className ? " " + className : ""}`;
  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
