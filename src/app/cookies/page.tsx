import type { Metadata } from "next";
import { LegalPageFrame } from "@/components/legal-page-frame";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "The small storage Blacks For Sale uses, why, and how to refuse it. Short, plain, and current.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "/cookies",
    siteName: site.name,
    title: `Cookies · ${site.name}`,
    description:
      "The small storage Blacks For Sale uses, why, and how to refuse it. Short, plain, and current.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `Cookies · ${site.name}`,
    description: "A short note on the small storage the press uses.",
  },
};

export default function CookiesPage() {
  return (
    <LegalPageFrame
      slug="cookies"
      title="Cookies"
      eyebrow="Statutory · A note on small storage"
      lede="A cookie is a small file the browser holds on your behalf. The press uses very few of them; the ones it does use are listed below."
      revised="14 May 2026"
    >
      <h2>What a cookie is</h2>
      <p>
        A <em>cookie</em> is a small text file the browser keeps so a site can
        remember something between visits — a logged-in session, a cart, a
        preference. <em>localStorage</em> is the same idea with a slightly
        different mechanism. The press uses both sparingly and never to
        identify a person.
      </p>

      <h2>What the press uses</h2>
      <p>
        <strong>Essentials only, by default.</strong>
      </p>
      <ul>
        <li>
          <em>Cart state</em> — held in <code>localStorage</code> under{" "}
          <code>bfs:cart</code>. Lets the cart survive a refresh. Cleared on
          checkout completion or when you clear it yourself.
        </li>
        <li>
          <em>Cookie-consent choice</em> — held in <code>localStorage</code>{" "}
          under <code>bfs-cookie-consent</code>. Records whether you accepted
          analytics or declined. The press will not ask again until you clear
          it.
        </li>
      </ul>

      <h2>Optional</h2>
      <p>
        <em>Vercel Analytics.</em> Aggregate pageview data — country class,
        device class, no names. Loads only when you choose <em>Accept all</em>{" "}
        in the cookie note. If you choose <em>Accept essentials only</em>,
        analytics does not load and no analytics cookies are set.
      </p>

      <h2>What the press does not use</h2>
      <p>
        No advertising trackers. No retargeting pixels. No third-party social
        widgets. No fingerprinting libraries. The press is small and the
        site reads like the press: thin.
      </p>

      <h2>How to change your mind</h2>
      <p>
        Clear <code>bfs-cookie-consent</code> from <em>localStorage</em> in
        your browser&rsquo;s developer tools, or clear site data for{" "}
        <em>{site.name}</em>, and the cookie note will reappear on the next
        visit. A preferences UI in the footer is on the press&rsquo;s short
        list — see{" "}
        <a href="/privacy">the privacy note</a> for your rights in the
        meantime.
      </p>

      <h2>Browser-level opt-out</h2>
      <p>
        Every modern browser lets you refuse cookies globally or per-site.
        Refusing essentials may break the cart; refusing analytics will work
        cleanly.
      </p>

      <h2>Contact</h2>
      <p>
        Questions go to{" "}
        <a href="mailto:studio@blacksforsale.studio">
          studio@blacksforsale.studio
        </a>
        .
      </p>
    </LegalPageFrame>
  );
}
