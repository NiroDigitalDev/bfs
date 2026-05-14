import type { Metadata } from "next";
import { LegalPageFrame } from "@/components/legal-page-frame";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of trade for an edition from Blacks For Sale — what you receive, how the press dispatches, and what happens if something arrives wrong.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "/terms",
    siteName: site.name,
    title: `Terms · ${site.name}`,
    description:
      "Terms of trade for an edition from Blacks For Sale — what you receive, how the press dispatches, and what happens if something arrives wrong.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `Terms · ${site.name}`,
    description:
      "Editions, payment, dispatch, returns, and the press's small print.",
  },
};

export default function TermsPage() {
  return (
    <LegalPageFrame
      slug="terms"
      title="Terms"
      eyebrow="Statutory · Conditions of trade"
      lede="Plain language for a small press. Read it once; the press tries to keep it that short."
      revised="14 May 2026"
    >
      <h2>What you receive</h2>
      <p>
        An edition from <em>{site.name}</em> is a numbered piece in a small
        run — usually under five hundred copies, sometimes a hundred. When a
        run is bound, it is bound; the press does not reprint a sold-out
        edition under the same plate number. Subsequent printings (if a piece
        warrants one) are given a new plate and announced as such.
      </p>
      <p>
        Specifications listed in each edition&rsquo;s colophon — paper, weight,
        binding, dimensions — are accurate to the run. Minor handcraft
        variation between copies is part of the work, not a defect.
      </p>

      <h2>Payment</h2>
      <p>
        Prices are stated in <em>US dollars</em> and include any applicable
        sales tax for US destinations. The press accepts card payment at
        checkout through the integrated payment provider. Cards are charged
        when the order is taken, not at dispatch. The press does not retain
        card numbers — they are handled by the payment provider under{" "}
        <em>PCI-DSS</em> compliance.
      </p>

      <h2>Dispatch</h2>
      <p>
        Editions ship within <em>forty-eight hours</em> of an order being
        taken, except on press holidays announced in the colophon. Carriers
        used: domestic ground and air; international tracked. Shipping cost is
        calculated at checkout against the dispatch address.
      </p>
      <p>
        Title passes to you when the carrier accepts the parcel; risk of loss
        passes at delivery. If a parcel does not arrive within fourteen days
        of the carrier&rsquo;s estimate, write to the studio and the press
        will trace it.
      </p>

      <h2>Damage on receipt</h2>
      <p>
        Open the parcel within seven days of delivery. If an edition arrives
        damaged — torn jacket, dented corner, soaked board — photograph it,
        write to the studio, and the press will replace from the run reserve
        at no cost. After seven days the press cannot tell whether damage
        occurred in transit or after.
      </p>

      <h2>Returns</h2>
      <p>
        <strong>
          The press does not accept returns of opened editions.
        </strong>{" "}
        A bound edition is a one-time object; once a customer has held it,
        the run cannot reabsorb it. Unopened, sealed returns within fourteen
        days of receipt are accepted for refund minus dispatch. Damaged-on-
        receipt is handled under <em>Damage on receipt</em> above and is not a
        return.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The typography, photography, copy, and the press&rsquo;s name and
        marks are <em>&copy; {site.name}</em>, all rights reserved. You may
        photograph and post images of your edition for personal use; please
        credit <em>{site.name}</em> if you do. Commercial reuse — reprinting
        copy, building competing typographic compositions from press material
        — requires written permission from the studio.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the jurisdiction the studio
        operates from. Disputes are resolved first by writing to the studio.
        If unresolved, the courts of that jurisdiction apply.
      </p>

      <h2>Contact</h2>
      <p>
        Write to{" "}
        <a href="mailto:studio@blacksforsale.studio">
          studio@blacksforsale.studio
        </a>
        . The press replies within five working days.
      </p>
    </LegalPageFrame>
  );
}
