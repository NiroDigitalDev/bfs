"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import * as cart from "@/lib/cart";
import type { ProductId } from "@/data/products";
import { QuantitySelector } from "@/components/quantity-selector";

function useCartLines() {
  return useSyncExternalStore(
    cart.subscribe,
    cart.getCart,
    cart.getServerSnapshot
  );
}

export function CartCount() {
  const lines = useCartLines();
  const count = cart.totalCount(lines);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    const onAdd = () => setBump((b) => b + 1);
    window.addEventListener(cart.ADD_EVT, onAdd);
    return () => window.removeEventListener(cart.ADD_EVT, onAdd);
  }, []);

  const padded = String(count).padStart(2, "0");

  return (
    <span
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
  productId: ProductId;
  productTitle: string;
}) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const onClick = () => {
    cart.add(productId, productTitle);
    cart.open();
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

export function PDPAddToCart({
  productId,
  productTitle,
}: {
  productId: ProductId;
  productTitle: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  const onClick = () => {
    cart.add(productId, productTitle, quantity);
    cart.open();
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="pdp-addtocart">
      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={9}
        label={`Quantity of ${productTitle}`}
      />
      <button
        type="button"
        onClick={onClick}
        className="chapter-cta"
        data-cursor="link"
        data-cursor-label={added ? "On list" : "Add"}
        aria-label={`Add ${quantity} of ${productTitle} to cart`}
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
    </div>
  );
}

export function NavCart({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => cart.open()}
      className="nav-cta"
      data-cursor="link"
      data-cursor-label="Manifest"
      aria-label="Open cart"
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
}
