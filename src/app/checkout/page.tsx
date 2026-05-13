import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckoutSummary } from "@/components/checkout-summary";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Bind and dispatch. The press attends to the volume.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <main className="checkout" data-route="checkout">
      <header className="checkout-head">
        <span className="checkout-wordmark" aria-hidden>
          BFS
        </span>
        <h1 className="checkout-eyebrow">
          <span className="checkout-eyebrow-mark" aria-hidden>
            §
          </span>
          <em>Checkout · Bind &amp; dispatch</em>
        </h1>
        <span className="checkout-folio" aria-hidden>
          Folio · 007
        </span>
      </header>
      <div className="checkout-rule" aria-hidden />

      <div className="checkout-grid">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    </main>
  );
}
