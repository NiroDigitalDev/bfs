"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import * as cart from "@/lib/cart";
import { products, type Product, type ProductId } from "@/data/products";
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

const productMap: Record<ProductId, Product> = products.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<ProductId, Product>
);

const priceLookup: Record<ProductId, number> = products.reduce(
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

export function CheckoutSummary() {
  const lines = useSyncExternalStore(
    cart.subscribe,
    cart.getCart,
    cart.getServerSnapshot
  );
  const subtotalAmount = useMemo(
    () => cart.subtotal(lines, priceLookup),
    [lines]
  );
  const totalAmount = subtotalAmount;

  return (
    <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
      <header className="checkout-summary-head">
        <span className="checkout-summary-mark" aria-hidden>
          §
        </span>
        <h2 id="checkout-summary-title" className="checkout-summary-title">
          <em>Edition · in hand</em>
        </h2>
      </header>
      <div className="checkout-summary-rule" aria-hidden />

      {lines.length === 0 ? (
        <div className="checkout-summary-empty">
          <p>
            <em>No selections held.</em>
          </p>
          <p className="checkout-summary-empty-sub">
            The cart summary will populate once a volume is added.
          </p>
        </div>
      ) : (
        <ul className="checkout-summary-lines" role="list">
          {lines.map((line) => {
            const product = productMap[line.productId];
            if (!product) return null;
            const Visual = visuals[product.id];
            const lineTotal = product.priceAmount * line.quantity;
            return (
              <li key={line.productId} className="checkout-summary-line">
                <div className="checkout-summary-figure" aria-hidden>
                  <div className="checkout-summary-figure-inner">
                    <Visual />
                  </div>
                </div>
                <div className="checkout-summary-meta">
                  <span className="checkout-summary-chapter">
                    {product.chapter}
                  </span>
                  <h3 className="checkout-summary-line-title">
                    {product.title}
                  </h3>
                  <span className="checkout-summary-qty">
                    {String(line.quantity).padStart(2, "0")} × {formatUSD(product.priceAmount)}
                  </span>
                </div>
                <span className="checkout-summary-amount">
                  {formatUSD(lineTotal)}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <dl className="checkout-summary-totals">
        <div className="checkout-summary-total-row">
          <dt>Subtotal</dt>
          <dd>{formatUSD(subtotalAmount)}</dd>
        </div>
        <div className="checkout-summary-total-row faint">
          <dt>Shipping</dt>
          <dd>
            <em>48-hour dispatch · gratis</em>
          </dd>
        </div>
        <div className="checkout-summary-rule small" aria-hidden />
        <div className="checkout-summary-total-row grand">
          <dt>Total</dt>
          <dd className="checkout-summary-grand">{formatUSD(totalAmount)}</dd>
        </div>
      </dl>

      <Link
        href="/"
        className="checkout-summary-return"
        data-cursor="link"
        data-cursor-label="Return"
      >
        <span>Return to the volume</span>
        <span className="checkout-summary-return-arrow" aria-hidden>
          ↗
        </span>
      </Link>
    </aside>
  );
}
