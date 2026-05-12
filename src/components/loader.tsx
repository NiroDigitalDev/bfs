"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("loading");
    const t1 = window.setTimeout(() => setPhase("out"), 1600);
    const t2 = window.setTimeout(() => {
      setPhase("done");
      root.classList.remove("loading");
    }, 2400);
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
        <span className="loader-tag">BFS / 001</span>
        <span className="loader-mid">Approaching Total Black</span>
        <span className="loader-tag right">EST. ∞</span>
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
      <div className="loader-curtain" />
    </div>
  );
}
