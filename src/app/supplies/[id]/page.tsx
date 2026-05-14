import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/split-text";
import { Magnetic } from "@/components/magnetic";
import { Tilt } from "@/components/tilt";
import { SpecimenPlate } from "@/components/specimen-plate";
import { CartCount, NavCart, PDPAddToCart } from "@/components/cart-island";
import { RelatedProducts } from "@/components/related-products";
import {
  NotebookVisual,
  CardstockVisual,
  SketchpadVisual,
  StickyVisual,
  PenVisual,
  PlannerVisual,
} from "@/components/product-visuals";
import { products, type ProductId } from "@/data/products";
import { site, siteUrl } from "@/lib/site";

const visualsById: Record<ProductId, React.ComponentType> = {
  "void-book": NotebookVisual,
  "abyssal-cardstock": CardstockVisual,
  "event-horizon-pad": SketchpadVisual,
  "sticky-voids": StickyVisual,
  "savior-pen": PenVisual,
  "executive-despair": PlannerVisual,
};

const ORIGIN_STR = "Studio · Lat 0° · Lon 0°";
const STOCK_STR = "On press · 48-hour dispatch";
const BIND_STR = "Smyth-sewn signatures · numbered by hand";
const EDITION_STR = "Edition III · MMXXVI · Run of 250";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ id: p.id }));
}

function findProduct(id: string) {
  return products.find((p) => p.id === id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) {
    return {
      title: "Reference not found",
      description: "The catalogue does not list this entry.",
      robots: { index: false, follow: true },
    };
  }
  const canonical = `/supplies/${product.id}`;
  const description =
    product.copy.split(/(?<=[.!?])\s/).slice(0, 2).join(" ") || product.copy;
  return {
    title: product.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: site.name,
      title: `${product.title} · ${site.name}`,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} · ${site.name}`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const Visual = visualsById[product.id];
  const heroWords = product.title.trim().split(/\s+/);
  const titleWord1 = heroWords.length > 1 ? heroWords.slice(0, -1).join(" ") : heroWords[0];
  const titleWord2 = heroWords.length > 1 ? heroWords[heroWords.length - 1] : "";

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/supplies/${product.id}`,
    url: `${siteUrl}/supplies/${product.id}`,
    name: product.title,
    description: product.copy,
    category: "Stationery",
    sku: product.id,
    image: `${siteUrl}/supplies/${product.id}/opengraph-image`,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/supplies/${product.id}`,
      price: product.priceAmount,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: `Vol. III · Catalogue`,
        item: `${siteUrl}/#supplies`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.title,
        item: `${siteUrl}/supplies/${product.id}`,
      },
    ],
  };

  return (
    <main className="pdp" data-product={product.id}>
      {/* Nav — minimal, lets the spread breathe */}
      <nav className="nav pdp-nav">
        <Link href="/" className="nav-logo" data-cursor="link" aria-label={site.name}>
          <span className="nav-logo-mark" aria-hidden>
            ■
          </span>
          <span>{site.name}</span>
          <span className="nav-logo-sub">Vol. III · MMXXVI</span>
        </Link>
        <div className="nav-center">
          <div className="nav-links">
            <Link href="/#supplies" data-cursor="link">
              <span className="nav-num">01</span> Catalogue
            </Link>
            <Link href="/#manifesto" data-cursor="link">
              <span className="nav-num">02</span> Position
            </Link>
            <Link href="/#cult" data-cursor="link">
              <span className="nav-num">03</span> Field Notes
            </Link>
            <Link href="/#faq" data-cursor="link">
              <span className="nav-num">04</span> On Record
            </Link>
          </div>
        </div>
        <Magnetic strength={0.25}>
          <NavCart>
            <span>Cart</span>
            <span className="nav-cta-dot" />
            <CartCount />
          </NavCart>
        </Magnetic>
      </nav>

      {/* Breadcrumb */}
      <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link
              href="/#supplies"
              className="pdp-breadcrumb-link"
              data-cursor="link"
            >
              <span className="pdp-breadcrumb-arrow" aria-hidden>
                ←
              </span>
              <em>Vol. III · Catalogue</em>
            </Link>
          </li>
          <li aria-current="page" className="pdp-breadcrumb-current">
            <span aria-hidden> / </span>
            <span>{product.title}</span>
          </li>
        </ol>
      </nav>

      {/* Hero spread */}
      <header className="pdp-hero">
        <aside className="pdp-edge" aria-hidden>
          <span className="pdp-edge-stem">
            <span className="pdp-edge-num">{product.chapter}</span>
            <span className="pdp-edge-rule" />
            <span className="pdp-edge-label">Plate · {product.plate.fig}</span>
          </span>
        </aside>

        <div className="pdp-hero-frame">
          <div className="pdp-hero-meta">
            <span className="pdp-hero-meta-row">
              <span className="pdp-hero-meta-dot" aria-hidden />
              In production · 48-hour dispatch
            </span>
            <span className="pdp-hero-meta-row right">
              Folio · {product.chapter}
              <span aria-hidden> · </span>
              {product.subtitle}
            </span>
          </div>

          <span className="pdp-eyebrow">
            <em>Plate {product.plate.fig}</em>
          </span>

          <div className="pdp-title-stack">
            <h1 className="pdp-title" aria-label={`${product.title}.`}>
              {titleWord2 ? (
                <>
                  <span className="pdp-word pdp-word-1" aria-hidden>
                    <SplitText as="span" text={titleWord1} stagger={0.04} />
                  </span>
                  <span className="pdp-word pdp-word-2" aria-hidden>
                    <SplitText
                      as="span"
                      text={titleWord2}
                      stagger={0.04}
                      start={0.25}
                      className="pdp-outline"
                    />
                    <span className="pdp-period">
                      <SplitText as="span" text="." stagger={0} start={0.6} />
                    </span>
                  </span>
                </>
              ) : (
                <span className="pdp-word pdp-word-1" aria-hidden>
                  <SplitText as="span" text={titleWord1} stagger={0.04} />
                  <span className="pdp-period">
                    <SplitText as="span" text="." stagger={0} start={0.5} />
                  </span>
                </span>
              )}
            </h1>
            <span className="pdp-aside">
              <span className="pdp-aside-line" aria-hidden />
              <em>{product.subtitle}</em>
            </span>
          </div>
        </div>
      </header>

      {/* Specimen plate spread */}
      <section className="pdp-specimen" aria-label={`${product.title} specimen plate`}>
        <Tilt className="pdp-specimen-frame" max={4}>
          <span className="pdp-specimen-light" aria-hidden />
          <Visual />
          <span className="pdp-specimen-specular" aria-hidden />
          <SpecimenPlate plate={product.plate} />
        </Tilt>
        <figcaption className="pdp-specimen-cap">
          <span>Plate · {product.plate.fig}</span>
          <span aria-hidden>
            {product.plate.w}&times;{product.plate.h} {product.plate.unit}
          </span>
          <span aria-hidden>{product.plate.gauge}</span>
        </figcaption>
      </section>

      {/* Lede + colophon */}
      <section className="pdp-body">
        <Reveal className="pdp-lede">
          <p>{product.copy}</p>
        </Reveal>

        <dl className="pdp-colophon">
          {[
            { k: "Folio", v: product.spec },
            { k: "Run", v: product.price },
            { k: "Origin", v: ORIGIN_STR },
            { k: "Stock", v: STOCK_STR },
            { k: "Binding", v: BIND_STR },
            { k: "Edition", v: EDITION_STR },
          ].map(({ k, v }, i) => (
            <Reveal key={k} delay={`${i * 0.05}s`}>
              <div className="pdp-colophon-row">
                <dt className="pdp-colophon-key">{k}</dt>
                <dd className="pdp-colophon-val">{v}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay="0.18s" className="pdp-actions">
          <Magnetic strength={0.22}>
            <PDPAddToCart productId={product.id} productTitle={product.title} />
          </Magnetic>
          <span className="pdp-actions-aside">
            <em>{product.price}</em>
            <span aria-hidden> · </span>
            48-hour dispatch
          </span>
        </Reveal>
      </section>

      {/* Press notes — per-product editorial paragraphs */}
      <section className="pdp-press" aria-label="Press notes">
        <Reveal>
          <span className="pdp-press-eyebrow">
            <em>Editorial · Press notes</em>
          </span>
        </Reveal>
        <div className="pdp-press-rule" aria-hidden />
        <Reveal>
          <h2 className="pdp-press-display">
            <em>Press notes.</em>
          </h2>
        </Reveal>
        <div className="pdp-press-prose">
          {product.pressNotes.map((paragraph, i) => (
            <Reveal key={`pn-${i}`} delay={`${0.08 + i * 0.06}s`}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Dispatch & care — shared editorial dl */}
      <section className="pdp-dispatch" aria-label="Dispatch and care">
        <Reveal>
          <span className="pdp-press-eyebrow">
            <em>Provenance · Dispatch &amp; care</em>
          </span>
        </Reveal>
        <div className="pdp-press-rule" aria-hidden />
        <dl className="pdp-dispatch-dl">
          {[
            { k: "Dispatch", v: "48 hours · Tracked · Worldwide" },
            { k: "Care", v: product.careNote },
            { k: "Edition cap", v: "No run exceeds 250 numbered copies" },
            {
              k: "Returns",
              v: "Opened editions cannot be returned · Damaged-on-receipt: write within 7 days",
            },
            {
              k: "Correspondence",
              v: (
                <a
                  href="mailto:studio@blacksforsale.studio"
                  className="pdp-dispatch-mail"
                  data-cursor="link"
                >
                  studio@blacksforsale.studio
                </a>
              ),
            },
          ].map(({ k, v }, i) => (
            <Reveal key={k} delay={`${0.06 + i * 0.04}s`}>
              <div className="pdp-dispatch-row">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Related — siblings */}
      <RelatedProducts current={product.id} />

      {/* Outro — return to the volume */}
      <footer className="pdp-outro">
        <span className="pdp-outro-rule" aria-hidden />
        <p className="pdp-outro-line">
          <em>End of plate.</em>
          <span aria-hidden> · </span>
          Return to the volume.
        </p>
        <Magnetic strength={0.22}>
          <Link
            href="/#supplies"
            className="btn-primary"
            data-cursor="link"
            data-cursor-label="Return"
          >
            <span>Return to the catalogue</span>
            <span className="btn-arrow" aria-hidden>
              ↑
            </span>
          </Link>
        </Magnetic>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </main>
  );
}
