import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/split-text";
import { Magnetic } from "@/components/magnetic";
import { site, siteUrl } from "@/lib/site";

const description =
  "Blacks For Sale is an independent press making bound objects in a single hue. Notes on the studio, the editorial principles, and how to commission an edition.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/about",
    siteName: site.name,
    title: `About · ${site.name}`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `About · ${site.name}`,
    description,
  },
};

const studioRows: { key: string; val: React.ReactNode }[] = [
  { key: "Founded", val: <em>MMXXIV</em> },
  {
    key: "Location",
    val: (
      <>
        Studio
        <span aria-hidden> · </span>
        Lat 0°&thinsp;0′&thinsp;N
        <span aria-hidden> · </span>
        Lon 0°&thinsp;0′&thinsp;W
      </>
    ),
  },
  {
    key: "Cadence",
    val: (
      <>
        Quarterly<span aria-hidden> · </span>
        <em>Give or take a moon</em>
      </>
    ),
  },
  {
    key: "Edition cap",
    val: (
      <>
        No run exceeds <em>250</em> numbered copies
      </>
    ),
  },
  {
    key: "Dispatch",
    val: (
      <>
        48 hours
        <span aria-hidden> · </span>Worldwide
      </>
    ),
  },
  {
    key: "Correspondence",
    val: (
      <a
        href="mailto:studio@blacksforsale.studio"
        className="outro-colophon-mail"
        data-cursor="link"
        data-cursor-label="Write"
      >
        studio@blacksforsale.studio
      </a>
    ),
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About · ${site.name}`,
    url: `${siteUrl}/about`,
    description,
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      url: `${siteUrl}/`,
      description: site.description,
      email: "studio@blacksforsale.studio",
      foundingDate: "2024",
      slogan: site.tagline,
    },
  };

  return (
    <main className="journal about-page" data-page="about">
      <nav className="nav journal-nav">
        <Link
          href="/"
          className="nav-logo"
          data-cursor="link"
          aria-label={site.name}
        >
          <span className="nav-logo-mark" aria-hidden>
            ■
          </span>
          <span>{site.name}</span>
          <span className="nav-logo-sub">Vol. III · MMXXVI</span>
        </Link>
        <div className="nav-center">
          <div className="nav-links">
            <Link href="/journal" data-cursor="link">
              <span className="nav-num">·</span> Journal
            </Link>
            <Link href="/#supplies" data-cursor="link">
              <span className="nav-num">01</span> Catalogue
            </Link>
            <Link href="/#manifesto" data-cursor="link">
              <span className="nav-num">02</span> Position
            </Link>
            <Link href="/#cult" data-cursor="link">
              <span className="nav-num">03</span> Field Notes
            </Link>
          </div>
        </div>
      </nav>

      <nav className="journal-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link
              href="/"
              className="journal-breadcrumb-link"
              data-cursor="link"
            >
              <span className="journal-breadcrumb-arrow" aria-hidden>
                ←
              </span>
              <em>Vol. III · The Press</em>
            </Link>
          </li>
          <li aria-current="page" className="journal-breadcrumb-current">
            <span aria-hidden> / </span>
            <span>About</span>
          </li>
        </ol>
      </nav>

      <header className="journal-header about-header">
        <span className="journal-eyebrow">
          <span className="journal-eyebrow-rule" aria-hidden />
          <em>Editorial · The press at the desk</em>
        </span>
        <div className="about-display-frame">
          <span className="about-display-fig" aria-hidden>
            <em>Fig. —</em>
            <span>The Press</span>
          </span>
          <SplitText
            as="h1"
            text="About the press."
            className="about-display"
            stagger={0.03}
          />
          <span className="about-display-edition" aria-hidden>
            <span>Ed.</span>
            <em>III</em>
            <span className="about-display-edition-sep">·</span>
            <span>MMXXVI</span>
          </span>
        </div>
        <p className="journal-lede about-lede">
          A small editorial press making bound objects in a single hue. The
          work is set in italic-serif, dispatched in 48 hours, and made in
          editions that <em>do not return to print</em>.
        </p>
      </header>

      <article className="journal-prose about-prose">
        <section className="about-section" aria-labelledby="about-principles">
          <h2 id="about-principles">
            <em>Principles</em>
          </h2>
          <p>
            <strong>On colour.</strong> The press believes a single hue,
            exhaustively considered, will say more than a palette of seven.
            Every edition we set returns to the same matte ground; what
            changes is the surface, the weight, the grain. Black is not the
            absence of decision — it is the decision.
          </p>
          <p>
            <strong>On type.</strong> Display type is set in italic-serif.
            Body type is set in a neutral grotesque. The press resists the
            temptation to swap families per edition — discipline at the type
            drawer is what makes a press read as a press, rather than a
            mood-board.
          </p>
          <p>
            <strong>On the binding of editions.</strong> An edition is a
            commitment, not a stock-keeping unit. Once a run is pressed, it
            does not return. The press carries a small ledger of what was
            made and when; it does not carry a backlist. If you missed Vol.
            II, we cannot help you, and we are <em>not</em> sorry.
          </p>
        </section>

        <section className="about-section" aria-labelledby="about-studio">
          <h2 id="about-studio">
            <em>Studio</em>
          </h2>
          <p>
            The press operates as a one-room studio. Type is set, paper is
            cut, and editions are bound in the same square footage. The
            below is the press in plain accounting.
          </p>
          <Reveal delay="0.05s">
            <dl className="outro-colophon about-studio-dl">
              {studioRows.map((row) => (
                <div className="outro-colophon-row" key={row.key}>
                  <dt className="outro-colophon-key">{row.key}</dt>
                  <dd className="outro-colophon-val">{row.val}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <section
          className="about-section"
          aria-labelledby="about-commissions"
        >
          <h2 id="about-commissions">
            <em>Commissions</em>
          </h2>
          <p>
            The press commissions on request. Single editions, paired sets,
            and small print runs — for studios, galleries, and private
            clients — are all possible, provided they sit inside the press&rsquo;s
            discipline (a single hue, italic-serif, paper-and-ink only).
          </p>
          <p>
            Write to the studio with the work in mind and a window for
            delivery. The press will write back inside a week with a sense
            of feasibility, run size, and approximate dispatch.
          </p>
          <Reveal delay="0.1s" className="about-cta-row">
            <Magnetic strength={0.22}>
              <a
                href="mailto:studio@blacksforsale.studio?subject=A%20commission%20for%20the%20press"
                className="about-cta"
                data-cursor="link"
                data-cursor-label="Write"
              >
                <span>Send a note</span>
                <span className="about-cta-arrow" aria-hidden>
                  →
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </section>

        <section
          className="about-section about-section-coda"
          aria-labelledby="about-press"
        >
          <header className="about-coda-head">
            <span className="about-coda-eyebrow">
              <span className="about-coda-eyebrow-rule" aria-hidden />
              <em>Continue · Two further volumes</em>
            </span>
            <h2 id="about-press" className="about-coda-title">
              <em>Two ways onward.</em>
            </h2>
          </header>
          <ol className="about-coda-grid">
            <Reveal delay="0s">
              <li className="about-coda-item" data-direction="left">
                <span className="about-coda-numeral" aria-hidden>
                  I
                </span>
                <Link
                  href="/"
                  className="about-coda-link"
                  data-cursor="link"
                  data-cursor-label="Open"
                  aria-label="The Catalogue · six editions in matte black"
                >
                  <div className="about-coda-meta">
                    <span className="about-coda-eyebrow-pair">
                      <em className="about-coda-eyebrow-label">
                        <span aria-hidden>← </span>The Catalogue
                      </em>
                      <span
                        className="about-coda-eyebrow-sep"
                        aria-hidden
                      >
                        ·
                      </span>
                      <span className="about-coda-plate">
                        Vol.&thinsp;·&thinsp;I
                      </span>
                    </span>
                    <h3 className="about-coda-name">
                      Six editions in matte black.
                    </h3>
                    <span className="about-coda-sub">
                      <em>
                        Bound objects, stationery, and the apparatus of the
                        editorial process.
                      </em>
                    </span>
                    <span className="about-coda-arrow" aria-hidden>
                      Browse the editions ↗
                    </span>
                  </div>
                </Link>
              </li>
            </Reveal>
            <Reveal delay="0.08s">
              <li className="about-coda-item" data-direction="right">
                <span className="about-coda-numeral" aria-hidden>
                  II
                </span>
                <Link
                  href="/journal"
                  className="about-coda-link"
                  data-cursor="link"
                  data-cursor-label="Read"
                  aria-label="The Journal · editorial dispatches in eleven pieces"
                >
                  <div className="about-coda-meta">
                    <span className="about-coda-eyebrow-pair">
                      <span className="about-coda-plate">
                        Vol.&thinsp;·&thinsp;II
                      </span>
                      <span
                        className="about-coda-eyebrow-sep"
                        aria-hidden
                      >
                        ·
                      </span>
                      <em className="about-coda-eyebrow-label">
                        The Journal<span aria-hidden> →</span>
                      </em>
                    </span>
                    <h3 className="about-coda-name">
                      Eleven pieces, in any order.
                    </h3>
                    <span className="about-coda-sub">
                      <em>
                        Notes on type, on paper, on the physics of an edition.
                      </em>
                    </span>
                    <span className="about-coda-arrow" aria-hidden>
                      Read the journal ↗
                    </span>
                  </div>
                </Link>
              </li>
            </Reveal>
          </ol>
        </section>
      </article>

      <footer className="legal-page-foot about-page-foot">
        <Magnetic strength={0.18}>
          <Link
            href="/"
            className="journal-post-return"
            data-cursor="link"
            data-cursor-label="Back"
          >
            <span className="journal-post-return-arrow" aria-hidden>
              ←
            </span>
            <em>Return to the volume</em>
          </Link>
        </Magnetic>
        <span className="journal-post-signoff">
          <em>{site.edition}</em>
        </span>
      </footer>

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: server-rendered JSON-LD, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
