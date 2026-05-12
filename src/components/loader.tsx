"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const root = document.documentElement;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const raf = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(raf);
    }

    root.classList.add("loading");
    const t1 = window.setTimeout(() => setPhase("out"), 900);
    const t2 = window.setTimeout(() => {
      setPhase("done");
      root.classList.remove("loading");
    }, 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      root.classList.remove("loading");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`loader ${phase === "out" ? "loader-out" : ""}`}
      aria-hidden
    >
      <div className="loader-grid">
        <span className="loader-tag">BFS / Vol. III</span>
        <span className="loader-mid">Approaching total black</span>
        <span className="loader-tag right">No. 0/0</span>
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
      <div className="loader-curtain" />
    </div>
  );
}
