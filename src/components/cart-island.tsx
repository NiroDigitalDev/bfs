"use client";

import { useEffect, useRef, useState } from "react";

const EVT = "bfs:cart-add";

type AddDetail = { productId: string; productTitle: string };

export function CartCount() {
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const onAdd = (e: Event) => {
      const detail = (e as CustomEvent<AddDetail>).detail;
      if (!detail) return;
      setCount((c) => c + 1);
      setBump((b) => b + 1);
      if (ref.current) {
        ref.current.setAttribute("data-just-added", detail.productId);
      }
    };
    window.addEventListener(EVT, onAdd as EventListener);
    return () => window.removeEventListener(EVT, onAdd as EventListener);
  }, []);

  const padded = String(count).padStart(2, "0");

  return (
    <span
      ref={ref}
      className="nav-cta-count"
      data-bump={bump}
      aria-live="polite"
      aria-label={`Cart: ${count} item${count === 1 ? "" : "s"}`}
    >
      {padded}
    </span>
  );
}

export function AddToCart({
  productId,
  productTitle,
}: {
  productId: string;
  productTitle: string;
}) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const onClick = () => {
    window.dispatchEvent(
      new CustomEvent<AddDetail>(EVT, {
        detail: { productId, productTitle },
      })
    );
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="chapter-cta"
      data-cursor="link"
      data-cursor-label={added ? "On list" : "Add"}
      aria-label={`Add ${productTitle} to cart`}
      data-added={added ? "true" : "false"}
    >
      <span className="chapter-cta-label">
        <span className="chapter-cta-default">Add to cart</span>
        <span className="chapter-cta-confirm" aria-hidden>
          On the list
        </span>
      </span>
      <span className="chapter-cta-glyph" aria-hidden>
        <span className="chapter-cta-glyph-arrow">↗</span>
        <span className="chapter-cta-glyph-check">✓</span>
      </span>
    </button>
  );
}
