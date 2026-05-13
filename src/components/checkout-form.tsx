"use client";

import { useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import * as cart from "@/lib/cart";
import { products, type Product, type ProductId } from "@/data/products";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { SplitText } from "@/components/split-text";

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

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Netherlands",
  "Japan",
  "Australia",
  "Slovenia",
  "Elsewhere",
];

const consignments = [
  { id: "by-check", label: "By check" },
  { id: "by-wire", label: "By wire" },
  { id: "cash-on-dispatch", label: "Cash on dispatch" },
];

function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

type CapturedLine = {
  productId: ProductId;
  title: string;
  quantity: number;
  amount: number;
};

export function CheckoutForm() {
  const liveLines = useSyncExternalStore(
    cart.subscribe,
    cart.getCart,
    cart.getServerSnapshot
  );

  const [sealed, setSealed] = useState(false);
  const [captured, setCaptured] = useState<CapturedLine[]>([]);
  const [consignment, setConsignment] = useState<string>("by-check");
  const successRef = useRef<HTMLDivElement | null>(null);

  const emailId = useId();
  const newsletterId = useId();
  const firstNameId = useId();
  const lastNameId = useId();
  const countryId = useId();
  const addr1Id = useId();
  const addr2Id = useId();
  const cityId = useId();
  const regionId = useId();
  const postalId = useId();
  const notesId = useId();
  const consignmentLegendId = useId();

  const subtotalAmount = useMemo(
    () => cart.subtotal(liveLines, priceLookup),
    [liveLines]
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const snapshot: CapturedLine[] = liveLines
      .map((line) => {
        const p = productMap[line.productId];
        if (!p) return null;
        return {
          productId: line.productId,
          title: p.title,
          quantity: line.quantity,
          amount: p.priceAmount * line.quantity,
        };
      })
      .filter((x): x is CapturedLine => x !== null);
    setCaptured(snapshot);
    cart.clear();
    setSealed(true);
    window.setTimeout(() => {
      successRef.current?.focus({ preventScroll: false });
    }, 80);
  };

  if (sealed) {
    return (
      <section
        ref={successRef}
        tabIndex={-1}
        className="checkout-sealed"
        aria-labelledby="checkout-sealed-title"
      >
        <p className="sr-only" role="status" aria-live="polite">
          Order sealed. Dispatch in 48 hours.
        </p>
        <h2 id="checkout-sealed-title" className="checkout-sealed-title">
          <span className="checkout-sealed-word" aria-hidden>
            <SplitText as="span" text="Sealed" stagger={0.05} />
          </span>
          <span className="checkout-sealed-period" aria-hidden>
            <SplitText as="span" text="." stagger={0} start={0.4} />
          </span>
          <span className="sr-only">Sealed.</span>
        </h2>
        <p className="checkout-sealed-aside">
          <span className="checkout-sealed-aside-line" aria-hidden />
          <em>Dispatch in 48 hours.</em>
        </p>
        {captured.length > 0 ? (
          <dl className="checkout-sealed-ledger">
            {captured.map((line) => (
              <div key={line.productId} className="checkout-sealed-row">
                <dt>{line.title}</dt>
                <dd>
                  <span className="checkout-sealed-row-qty">
                    {String(line.quantity).padStart(2, "0")} ×
                  </span>
                  <span className="checkout-sealed-row-amount">
                    {formatUSD(line.amount)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="checkout-sealed-ctas">
          <Magnetic strength={0.22}>
            <Link
              href="/"
              className="btn-primary"
              data-cursor="link"
              data-cursor-label="Return"
            >
              <span>Return to the volume</span>
              <span className="btn-arrow" aria-hidden>
                ↑
              </span>
            </Link>
          </Magnetic>
        </div>
      </section>
    );
  }

  const hasLines = liveLines.length > 0;

  return (
    <form className="checkout-form" onSubmit={onSubmit} noValidate>
      <Reveal className="checkout-step" delay="0s">
        <header className="checkout-step-head">
          <span className="checkout-step-numeral" aria-hidden>
            <em>I</em>
          </span>
          <h2 className="checkout-step-title">
            <em>Step I · Correspondence</em>
          </h2>
          <span className="checkout-step-rule" aria-hidden />
        </header>
        <div className="checkout-fields">
          <div className="checkout-field full">
            <label htmlFor={emailId} className="checkout-label">
              <em>Email</em>
              <span className="checkout-label-req" aria-hidden>
                ·
              </span>
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              aria-required="true"
              className="checkout-input"
            />
          </div>
          <div className="checkout-field full checkout-field-check">
            <input
              id={newsletterId}
              name="newsletter"
              type="checkbox"
              className="checkout-checkbox"
            />
            <label htmlFor={newsletterId} className="checkout-check-label">
              <em>Send dispatch notes when new editions press.</em>
            </label>
          </div>
        </div>
      </Reveal>

      <Reveal className="checkout-step" delay="0.22s">
        <header className="checkout-step-head">
          <span className="checkout-step-numeral" aria-hidden>
            <em>II</em>
          </span>
          <h2 className="checkout-step-title">
            <em>Step II · Dispatch</em>
          </h2>
          <span className="checkout-step-rule" aria-hidden />
        </header>
        <div className="checkout-fields">
          <div className="checkout-field half">
            <label htmlFor={firstNameId} className="checkout-label">
              <em>First name</em>
            </label>
            <input
              id={firstNameId}
              name="firstName"
              type="text"
              autoComplete="given-name"
              className="checkout-input"
            />
          </div>
          <div className="checkout-field half">
            <label htmlFor={lastNameId} className="checkout-label">
              <em>Last name</em>
            </label>
            <input
              id={lastNameId}
              name="lastName"
              type="text"
              autoComplete="family-name"
              className="checkout-input"
            />
          </div>
          <div className="checkout-field full">
            <label htmlFor={countryId} className="checkout-label">
              <em>Country</em>
            </label>
            <select
              id={countryId}
              name="country"
              defaultValue="United States"
              autoComplete="country-name"
              className="checkout-input checkout-select"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="checkout-field full">
            <label htmlFor={addr1Id} className="checkout-label">
              <em>Address line 1</em>
              <span className="checkout-label-req" aria-hidden>
                ·
              </span>
            </label>
            <input
              id={addr1Id}
              name="addressLine1"
              type="text"
              required
              autoComplete="address-line1"
              aria-required="true"
              className="checkout-input"
            />
          </div>
          <div className="checkout-field full">
            <label htmlFor={addr2Id} className="checkout-label">
              <em>Address line 2</em>
            </label>
            <input
              id={addr2Id}
              name="addressLine2"
              type="text"
              autoComplete="address-line2"
              className="checkout-input"
            />
          </div>
          <div className="checkout-field half">
            <label htmlFor={cityId} className="checkout-label">
              <em>City</em>
            </label>
            <input
              id={cityId}
              name="city"
              type="text"
              autoComplete="address-level2"
              className="checkout-input"
            />
          </div>
          <div className="checkout-field quarter">
            <label htmlFor={regionId} className="checkout-label">
              <em>State / Region</em>
            </label>
            <input
              id={regionId}
              name="region"
              type="text"
              autoComplete="address-level1"
              className="checkout-input"
            />
          </div>
          <div className="checkout-field quarter">
            <label htmlFor={postalId} className="checkout-label">
              <em>Postal code</em>
            </label>
            <input
              id={postalId}
              name="postalCode"
              type="text"
              autoComplete="postal-code"
              inputMode="numeric"
              className="checkout-input"
            />
          </div>
          <div className="checkout-field full">
            <label htmlFor={notesId} className="checkout-label">
              <em>Notes to the press</em>
            </label>
            <textarea
              id={notesId}
              name="notes"
              rows={3}
              className="checkout-input checkout-textarea"
            />
          </div>
        </div>
      </Reveal>

      <Reveal className="checkout-step" delay="0.44s">
        <header className="checkout-step-head">
          <span className="checkout-step-numeral" aria-hidden>
            <em>III</em>
          </span>
          <h2 className="checkout-step-title">
            <em>Step III · Bind &amp; seal</em>
          </h2>
          <span className="checkout-step-rule" aria-hidden />
        </header>
        <fieldset className="checkout-radio-group" aria-labelledby={consignmentLegendId}>
          <legend id={consignmentLegendId} className="checkout-legend">
            <em>Method of consignment</em>
          </legend>
          <div className="checkout-radios">
            {consignments.map((opt) => (
              <label
                key={opt.id}
                className="checkout-radio"
                data-checked={consignment === opt.id ? "true" : "false"}
              >
                <input
                  type="radio"
                  name="consignment"
                  value={opt.id}
                  checked={consignment === opt.id}
                  onChange={() => setConsignment(opt.id)}
                  className="checkout-radio-input"
                />
                <span className="checkout-radio-mark" aria-hidden />
                <span className="checkout-radio-label">
                  <em>{opt.label}</em>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="checkout-submit">
          <Magnetic strength={0.22}>
            <button
              type="submit"
              className="checkout-cta"
              disabled={!hasLines}
              data-cursor="link"
              data-cursor-label="Seal"
              aria-describedby={hasLines ? undefined : "checkout-empty-msg"}
            >
              <span className="checkout-cta-label">
                <em>Place the order with the press</em>
              </span>
              <span className="checkout-cta-glyph" aria-hidden>
                ↗
              </span>
              <span className="checkout-cta-border" aria-hidden />
            </button>
          </Magnetic>
          {!hasLines ? (
            <p id="checkout-empty-msg" className="checkout-empty-note">
              <em>
                The press is idle. Add something from the catalogue first.
              </em>
            </p>
          ) : (
            <p className="checkout-fineprint">
              <em>Subtotal {formatUSD(subtotalAmount)}. Dispatch in 48 hours.</em>
            </p>
          )}
        </div>
      </Reveal>
    </form>
  );
}
