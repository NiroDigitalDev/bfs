"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { Magnetic } from "@/components/magnetic";

const STORAGE_KEY = "bfs-cookie-consent";
const CHANGE_EVT = "bfs:cookie-consent-changed";

type Consent = "accepted" | "declined";
type Phase = "unknown" | "shown" | "hidden";

function readPhase(): Phase {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "declined" ? "hidden" : "shown";
  } catch {
    // Storage unavailable (private mode, quota etc.) — show the banner;
    // choose() will silently no-op the write below.
    return "shown";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

function getServerSnapshot(): Phase {
  return "unknown";
}

function emit(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
  window.dispatchEvent(new CustomEvent(CHANGE_EVT, { detail: value }));
}

export function CookieBanner() {
  const phase = useSyncExternalStore(subscribe, readPhase, getServerSnapshot);
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase !== "shown") return;
    const t = window.setTimeout(() => firstBtnRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") emit("declined");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  if (phase !== "shown") return null;

  return (
    <div className="cookie-banner" role="region" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-eye">A note on cookies.</p>
        <p className="cookie-banner-body">
          We keep two small things in your browser — a cart and a consent
          flag. No analytics tags, no third-party trackers.{" "}
          <Link href="/cookies" className="cookie-banner-link">
            Read the cookie policy →
          </Link>
        </p>
        <div className="cookie-banner-actions">
          <Magnetic strength={0.18} className="cookie-banner-magnet">
            <button
              ref={firstBtnRef}
              type="button"
              className="cookie-banner-btn cookie-banner-btn--ghost"
              onClick={() => emit("declined")}
            >
              Essentials only
            </button>
          </Magnetic>
          <Magnetic strength={0.18} className="cookie-banner-magnet">
            <button
              type="button"
              className="cookie-banner-btn cookie-banner-btn--solid"
              onClick={() => emit("accepted")}
            >
              Accept all
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
