import type { Metadata } from "next";
import { LegalPageFrame } from "@/components/legal-page-frame";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Blacks For Sale collects, uses, and retains the small set of data the press needs to take and dispatch an edition.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "/privacy",
    siteName: site.name,
    title: `Privacy · ${site.name}`,
    description:
      "How Blacks For Sale collects, uses, and retains the small set of data the press needs to take and dispatch an edition.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `Privacy · ${site.name}`,
    description:
      "What we collect, why, and how long we keep it. Short, plain, and honest.",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageFrame
      slug="privacy"
      title="Privacy"
      eyebrow="Statutory · The press at the desk"
      lede="The press collects what it needs to take an order and dispatch the edition — nothing more. Below is a plain accounting of what is held, why, and for how long."
      revised="14 May 2026"
    >
      <h2>The data controller</h2>
      <p>
        <em>{site.name}</em> is the press responsible for any personal data
        processed through this site. Correspondence about data goes to{" "}
        <a href="mailto:studio@blacksforsale.studio">
          studio@blacksforsale.studio
        </a>{" "}
        — the same address that runs the studio.
      </p>

      <h2>What the press holds</h2>
      <p>
        Three small things, and only when you give them. <strong>One.</strong>{" "}
        Your email address, supplied at checkout, so the press can confirm an
        edition is on its way. <strong>Two.</strong> A dispatch address — the
        physical place an edition is sent. <strong>Three.</strong> An optional
        note left at checkout, if you write one.
      </p>
      <p>
        The press uses <em>Vercel Analytics</em> in aggregate — page views,
        approximate region, the device class. None of it is tied to a name,
        and none of it is sold. See <a href="/cookies">the cookie note</a> for
        the small storage that does this work.
      </p>

      <h2>Why the press holds it</h2>
      <p>
        Email and address are processed under <em>contractual necessity</em>{" "}
        (GDPR Art. 6(1)(b)) — the press cannot take an edition without them.
        Analytics is processed under <em>legitimate interest</em>{" "}
        (Art. 6(1)(f)) so the press knows whether anyone is reading. If you
        decline analytics in the cookie note, this stops.
      </p>

      <h2>How long the press holds it</h2>
      <ul>
        <li>
          <em>Order records</em> — kept until the edition is dispatched, plus
          twelve months for warranty and accounting. Then archived in
          anonymised form for statutory bookkeeping.
        </li>
        <li>
          <em>Analytics</em> — twenty-six months on a rolling window. Older
          aggregates are not retained.
        </li>
        <li>
          <em>Newsletter list</em> — held until you ask the studio to remove
          you. There is no automated unsubscribe yet; write to the studio.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Under the General Data Protection Regulation (Articles 15–22) you may
        request the press to: <em>show you what is held</em>, correct it,
        delete it, restrict how it is used, port it to another controller, or
        object to a particular processing. Write to the studio and the press
        will respond within thirty days.
      </p>

      <h2>Children</h2>
      <p>
        The press does not knowingly hold data on anyone under sixteen. If a
        record is found, the press will erase it on notice.
      </p>

      <h2>Where the data lives</h2>
      <p>
        The site runs on Vercel infrastructure. Analytics is processed by
        Vercel. Email correspondence sits in the studio mailbox. No data is
        sold to third parties; no data is held outside the providers named
        above.
      </p>

      <h2>Changes to this note</h2>
      <p>
        Material changes are dated above. If the change matters to anyone
        currently on the newsletter list, the press will write.
      </p>
    </LegalPageFrame>
  );
}
