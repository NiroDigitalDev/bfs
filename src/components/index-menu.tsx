"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Entry = {
  num: string;
  title: string;
  folio: string;
  href: string;
};

const entries: Entry[] = [
  { num: "01", title: "Catalogue", folio: "p.014", href: "#supplies" },
  { num: "02", title: "Position", folio: "p.064", href: "#manifesto" },
  { num: "03", title: "Field Notes", folio: "p.108", href: "#cult" },
  { num: "04", title: "On Record", folio: "p.142", href: "#faq" },
];

export function IndexMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty("overflow");
      return;
    }
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      firstLinkRef.current?.focus({ preventScroll: true });
    }, 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        triggerRef.current?.focus({ preventScroll: true });
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusables).filter(
          (el) => !el.hasAttribute("disabled")
        );
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, handleClose]);

  const onEntryClick = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="index-trigger"
        data-cursor="link"
        data-cursor-label="Index"
        aria-label="Open table of contents"
        aria-haspopup="dialog"
        aria-expanded={open ? "true" : "false"}
      >
        <span className="index-trigger-glyph" aria-hidden>
          ▤
        </span>
        <span className="index-trigger-word">Index</span>
      </button>

      <div
        className="index-menu-root"
        data-open={open ? "true" : "false"}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="index-menu-scrim"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={handleClose}
        />
        <aside
          ref={panelRef}
          className="index-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="index-menu-title"
        >
          <header className="index-menu-head">
            <span className="index-menu-eyebrow">
              <span className="index-menu-eyebrow-mark" aria-hidden />
              <span className="index-menu-eyebrow-ord">00</span>
              <span className="index-menu-eyebrow-sep" aria-hidden>
                ·
              </span>
              <span className="index-menu-eyebrow-sub">
                Table of Contents
              </span>
            </span>
            <h2 id="index-menu-title" className="index-menu-title">
              The <em>issue</em>, indexed.
            </h2>
          </header>

          <ol className="index-menu-list" role="list">
            {entries.map((entry, i) => (
              <li
                key={entry.href}
                className="index-menu-item"
                style={
                  {
                    ["--index-item-delay"]: `${220 + i * 80}ms`,
                  } as React.CSSProperties
                }
              >
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={entry.href}
                  onClick={onEntryClick}
                  className="index-menu-link"
                  data-cursor="link"
                  data-cursor-label="Turn"
                >
                  <span className="index-menu-num">{entry.num}</span>
                  <span className="index-menu-title-row">
                    <span className="index-menu-title-word">{entry.title}</span>
                    <span className="index-menu-leader" aria-hidden />
                    <span className="index-menu-folio">{entry.folio}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <footer className="index-menu-foot">
            <span className="index-menu-colophon">
              <em>Vol. III</em> · MMXXVI
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="index-menu-close"
              data-cursor="link"
              data-cursor-label="Close"
              aria-label="Close menu"
            >
              <span>Close</span>
              <span className="index-menu-close-glyph" aria-hidden>
                ✕
              </span>
            </button>
          </footer>
        </aside>
      </div>
    </>
  );
}
