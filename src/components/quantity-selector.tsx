"use client";

import { useCallback } from "react";

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 9,
  label = "Quantity",
}: Props) {
  const clamp = useCallback(
    (n: number) => Math.max(min, Math.min(max, Math.floor(n))),
    [min, max]
  );

  const dec = () => onChange(clamp(value - 1));
  const inc = () => onChange(clamp(value + 1));

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      dec();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      inc();
    }
  };

  const padded = String(value).padStart(2, "0");
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div
      className="quantity-selector"
      role="group"
      aria-label={label}
      onKeyDown={onKey}
    >
      <button
        type="button"
        className="quantity-selector-step"
        onClick={dec}
        disabled={atMin}
        aria-label="Decrease quantity"
        data-cursor="link"
      >
        <span aria-hidden>−</span>
      </button>
      <span
        className="quantity-selector-display"
        aria-live="polite"
        aria-atomic="true"
      >
        {padded}
      </span>
      <button
        type="button"
        className="quantity-selector-step"
        onClick={inc}
        disabled={atMax}
        aria-label="Increase quantity"
        data-cursor="link"
      >
        <span aria-hidden>+</span>
      </button>
    </div>
  );
}
