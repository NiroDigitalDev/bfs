"use client";

import { useSyncExternalStore } from "react";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"] as const;

let _active: number | null = null;

function subscribeActive(notify: () => void) {
  if (typeof document === "undefined") return () => {};
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<{ index: number | null }>).detail;
    _active = detail?.index ?? null;
    notify();
  };
  document.addEventListener("bfs:manifesto:active", handler);
  return () => document.removeEventListener("bfs:manifesto:active", handler);
}

function getActiveSnapshot() {
  return _active;
}

function getActiveServerSnapshot(): number | null {
  return null;
}

function subscribeReduced(notify: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", notify);
  return () => mq.removeEventListener("change", notify);
}

function getReducedSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedServerSnapshot() {
  return false;
}

export function ManifestoCredoMark() {
  const active = useSyncExternalStore(
    subscribeActive,
    getActiveSnapshot,
    getActiveServerSnapshot
  );
  const reduced = useSyncExternalStore(
    subscribeReduced,
    getReducedSnapshot,
    getReducedServerSnapshot
  );

  if (reduced) {
    return (
      <sup className="manifesto-credo-mark" data-static="true" aria-hidden>
        ·–·
      </sup>
    );
  }

  const numeral = active !== null ? ROMAN[active] ?? null : null;

  return (
    <sup
      className="manifesto-credo-mark"
      data-visible={numeral !== null ? "true" : "false"}
      aria-hidden
    >
      {numeral}
    </sup>
  );
}
