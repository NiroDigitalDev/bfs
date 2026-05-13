"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import * as cart from "@/lib/cart";
import {
  products as productData,
  type Product,
  type ProductId,
} from "@/data/products";
import {
  NotebookVisual,
  CardstockVisual,
  SketchpadVisual,
  StickyVisual,
  PenVisual,
  PlannerVisual,
} from "@/components/product-visuals";

const visuals: Record<ProductId, ComponentType> = {
  "void-book": NotebookVisual,
  "abyssal-cardstock": CardstockVisual,
  "event-horizon-pad": SketchpadVisual,
  "sticky-voids": StickyVisual,
  "savior-pen": PenVisual,
  "executive-despair": PlannerVisual,
};

const productMap: Record<ProductId, Product> = productData.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<ProductId, Product>
);

const priceLookup: Record<ProductId, number> = productData.reduce(
  (acc, p) => {
    acc[p.id] = p.priceAmount;
    return acc;
  },
  {} as Record<ProductId, number>
);

function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const lines = useSyncExternalStore(
    cart.subscribe,
    cart.getCart,
    cart.getServerSnapshot
  );
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = () => {
      const active = document.activeElement;
      if (active instanceof HTMLElement) returnFocusRef.current = active;
      setOpen(true);
    };
    window.addEventListener(cart.OPEN_EVT, onOpen);
    return () => {
      window.removeEventListener(cart.OPEN_EVT, onOpen);
    };
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty("overflow");
      if (returnFocusRef.current) {
        returnFocusRef.current.focus({ preventScroll: true });
        returnFocusRef.current = null;
      }
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
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
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, handleClose]);

  const itemCount = useMemo(() => cart.totalCount(lines), [lines]);
  const subtotalAmount = useMemo(
    () => cart.subtotal(lines, priceLookup),
    [lines]
  );

  return (
    <div
      className="cart-drawer-root"
      data-open={open ? "true" : "false"}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="cart-drawer-scrim"
        aria-label="Close cart"
        tabIndex={open ? 0 : -1}
        onClick={handleClose}
      />
      <aside
        ref={panelRef}
        className="cart-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        aria-describedby="cart-drawer-sub"
      >
        <header className="cart-drawer-head">
          <span className="cart-drawer-eyebrow">
            <span className="cart-drawer-eyebrow-mark" aria-hidden />
            <span className="cart-drawer-eyebrow-ord">005</span>
            <span className="cart-drawer-eyebrow-sep" aria-hidden>
              ·
            </span>
            <span className="cart-drawer-eyebrow-sub">Manifest</span>
          </span>
          <h2 id="cart-drawer-title" className="cart-drawer-title">
            Your selections.
          </h2>
          <p id="cart-drawer-sub" className="cart-drawer-sub">
            {itemCount === 0
              ? "Nothing chosen yet."
              : `${String(itemCount).padStart(2, "0")} ${itemCount === 1 ? "item" : "items"} held.`}
          </p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={handleClose}
            className="cart-drawer-close"
            data-cursor="link"
            data-cursor-label="Close"
            aria-label="Close cart"
          >
            <span className="cart-drawer-close-glyph" aria-hidden>
              ×
            </span>
            <span className="cart-drawer-close-ring" aria-hidden />
          </button>
        </header>

        <div className="cart-drawer-rule" aria-hidden />

        {lines.length === 0 ? (
          <CartEmpty onClose={handleClose} />
        ) : (
          <ul className="cart-drawer-lines" role="list">
            {lines.map((line, i) => {
              const product = productMap[line.productId];
              if (!product) return null;
              const Visual = visuals[product.id];
              const lineTotal = product.priceAmount * line.quantity;
              return (
                <li
                  key={line.productId}
                  className="cart-line"
                  style={
                    {
                      ["--cart-line-delay"]: `${80 + i * 60}ms`,
                    } as React.CSSProperties
                  }
                >
                  <div className="cart-line-figure" aria-hidden>
                    <div className="cart-line-figure-inner">
                      <Visual />
                    </div>
                  </div>
                  <div className="cart-line-meta">
                    <span className="cart-line-chapter">{product.chapter}</span>
                    <h3 className="cart-line-title">{product.title}</h3>
                    <span className="cart-line-spec">{product.subtitle}</span>
                  </div>
                  <div className="cart-line-controls">
                    <span className="cart-line-price">
                      {formatUSD(lineTotal)}
                    </span>
                    <div
                      className="cart-line-stepper"
                      role="group"
                      aria-label={`Quantity of ${product.title}`}
                    >
                      <button
                        type="button"
                        className="cart-line-step"
                        onClick={() =>
                          cart.setQuantity(product.id, line.quantity - 1)
                        }
                        aria-label={`Decrease quantity of ${product.title}`}
                      >
                        −
                      </button>
                      <span
                        className="cart-line-qty"
                        aria-live="polite"
                        aria-label={`${line.quantity} in cart`}
                      >
                        {String(line.quantity).padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        className="cart-line-step"
                        onClick={() =>
                          cart.setQuantity(product.id, line.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${product.title}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-line-remove"
                      onClick={() => cart.remove(product.id)}
                      aria-label={`Remove ${product.title} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {lines.length > 0 ? (
          <footer className="cart-drawer-foot">
            <dl className="cart-drawer-totals">
              <div className="cart-drawer-total-row">
                <dt>Subtotal</dt>
                <dd>{formatUSD(subtotalAmount)}</dd>
              </div>
              <div className="cart-drawer-total-row faint">
                <dt>Freight · tax</dt>
                <dd>at the threshold</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              onClick={handleClose}
              className="cart-drawer-cta"
              data-cursor="link"
              data-cursor-label="Proceed"
            >
              <span className="cart-drawer-cta-label">
                <span className="cart-drawer-cta-default">
                  Proceed to checkout
                </span>
              </span>
              <span className="cart-drawer-cta-glyph" aria-hidden>
                <span className="cart-drawer-cta-glyph-arrow">↗</span>
              </span>
            </Link>
            <p className="cart-drawer-fineprint">
              Bind &amp; dispatch on the next page. No payment routed in this
              volume.
            </p>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}

function CartEmpty({ onClose }: { onClose: () => void }) {
  return (
    <div className="cart-empty">
      <span className="cart-empty-numeral" aria-hidden>
        00
      </span>
      <p className="cart-empty-lede">
        <em>Nothing held yet.</em>
      </p>
      <p className="cart-empty-copy">
        Selections collect here. Quiet until you say otherwise.
      </p>
      <a
        href="#supplies"
        onClick={onClose}
        className="cart-empty-cta"
        data-cursor="link"
        data-cursor-label="Browse"
      >
        <span>Browse the catalogue</span>
        <span aria-hidden>↘</span>
      </a>
    </div>
  );
}
