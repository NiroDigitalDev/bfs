import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/split-text";
import { Magnetic } from "@/components/magnetic";
import { Tilt } from "@/components/tilt";
import { Counter } from "@/components/counter";
import { Marquee } from "@/components/marquee";
import { Spotlight } from "@/components/spotlight";
import { FaqItem } from "@/components/faq-item";
import { Newsletter } from "@/components/newsletter";
import { CartCount, AddToCart, NavCart } from "@/components/cart-island";
import {
  NotebookVisual,
  CardstockVisual,
  SketchpadVisual,
  StickyVisual,
  PenVisual,
  PlannerVisual,
} from "@/components/product-visuals";
import { products as productData, type ProductId } from "@/data/products";
import { faqs } from "@/data/faqs";

const productVisuals: Record<ProductId, React.ComponentType> = {
  "void-book": NotebookVisual,
  "abyssal-cardstock": CardstockVisual,
  "event-horizon-pad": SketchpadVisual,
  "sticky-voids": StickyVisual,
  "savior-pen": PenVisual,
  "executive-despair": PlannerVisual,
};

const products = productData.map((p) => ({ ...p, Visual: productVisuals[p.id] }));

export default function Home() {
  return (
    <main className="relative">
      {/* Nav */}
      <nav className="nav">
        <a href="#top" className="nav-logo" data-cursor="link" aria-label="Blacks For Sale">
          <span className="nav-logo-mark" aria-hidden>
            ■
          </span>
          <span>Blacks For Sale</span>
          <span className="nav-logo-sub">Vol. III · MMXXVI</span>
        </a>
        <div className="nav-links">
          <a href="#supplies" data-cursor="link">
            <span className="nav-num">01</span> Catalogue
          </a>
          <a href="#manifesto" data-cursor="link">
            <span className="nav-num">02</span> Position
          </a>
          <a href="#cult" data-cursor="link">
            <span className="nav-num">03</span> Field Notes
          </a>
          <a href="#faq" data-cursor="link">
            <span className="nav-num">04</span> On Record
          </a>
        </div>
        <Magnetic strength={0.25}>
          <NavCart>
            <span>Cart</span>
            <span className="nav-cta-dot" />
            <CartCount />
          </NavCart>
        </Magnetic>
      </nav>

      {/* Hero */}
      <header id="top" className="hero">
        <Spotlight />

        {/* Edge-anchored chapter glyph — rotated spine */}
        <aside className="hero-edge" aria-hidden>
          <span className="hero-edge-stem">
            <span className="hero-edge-num">001</span>
            <span className="hero-edge-rule" />
            <span className="hero-edge-label">Volume · Catalogue</span>
          </span>
        </aside>

        <div className="hero-frame">
          <div className="hero-meta">
            <span className="hero-meta-row">
              <span className="hero-meta-dot" />
              In production · 48-hour dispatch
            </span>
            <span className="hero-meta-row right">Lat 0° 0′ N · Lon 0° 0′ W</span>
          </div>

          {/* Composed title — overlapping rows, asymmetric shift, parallax stack */}
          <div className="hero-title-stack">
            <h1 className="hero-title" aria-label="Dark Matter.">
              <span className="hero-word hero-word-1" aria-hidden>
                <SplitText as="span" text="Dark" stagger={0.05} />
              </span>
              <span className="hero-word hero-word-2" aria-hidden>
                <SplitText
                  as="span"
                  text="Matter"
                  stagger={0.05}
                  start={0.25}
                  className="hero-outline"
                />
                <span className="hero-period">
                  <SplitText as="span" text="." stagger={0} start={0.6} />
                </span>
              </span>
            </h1>
            <span className="hero-aside">
              <span className="hero-aside-line" aria-hidden />
              <em>An exercise in subtractive design.</em>
            </span>
          </div>

          <div className="hero-bottom">
            <Reveal delay="0.4s" className="hero-lede">
              <p>
                Stationery, made in the absence of light. Paper coated to refuse
                ninety-nine percent of what hits it; ink chosen to argue back.
                For people who think a notebook should hold the dark, not break
                it.
              </p>
            </Reveal>

            <Reveal delay="0.5s" className="hero-ctas">
              <Magnetic strength={0.25}>
                <a href="#supplies" className="btn-primary" data-cursor="link" data-cursor-label="Enter">
                  <span>Enter the catalogue</span>
                  <span className="btn-arrow" aria-hidden>
                    ↗
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="#manifesto" className="btn-ghost" data-cursor="link">
                  Read the position
                </a>
              </Magnetic>
            </Reveal>

            {/* Specification ribbon — colophon register, not SaaS counters */}
            <Reveal delay="0.6s" className="hero-spec">
              <div className="hero-spec-row">
                <span className="hero-spec-key">Edition</span>
                <span className="hero-spec-val">III · MMXXVI</span>
              </div>
              <div className="hero-spec-row">
                <span className="hero-spec-key">Light absorbed · 550 nm</span>
                <Counter to={99.9} decimals={1} suffix="%" className="hero-spec-val" />
              </div>
              <div className="hero-spec-row">
                <span className="hero-spec-key">Made in</span>
                <span className="hero-spec-val hero-spec-val--prose">
                  The absence of light
                </span>
              </div>
            </Reveal>
          </div>

          <a href="#supplies" className="hero-scroll" data-cursor="link">
            <span className="hero-scroll-line" />
            <span>Descend</span>
          </a>
        </div>
      </header>

      {/* Marquees */}
      <section className="marquees">
        <Marquee
          speed={45}
          items={[
            "Pigment over palette",
            "Made in the dark",
            "No legible margins",
            "500 GSM standard",
            "An exercise in subtraction",
            "Single tone, by design",
          ]}
        />
        <Marquee
          reverse
          speed={60}
          sep="—"
          items={[
            "Numbered in series of one",
            "Lat 0° · Lon 0°",
            "Shipped in 48 hours",
            "Returns accepted, regret negotiable",
            "Pen World still declines",
          ]}
        />
      </section>

      {/* Supplies */}
      <section id="supplies" className="section">
        <div className="section-head">
          <span className="section-tag">CH. 01 / Catalogue</span>
          <SplitText
            as="h2"
            text="Stationery non grata."
            className="section-title"
            stagger={0.03}
          />
          <p className="section-lede">
            Six objects, each engineered around a single hue. Made in small
            runs. Stocked when stocked.
          </p>
        </div>

        <div className="chapters">
          {products.map(({ id, chapter, title, subtitle, price, spec, copy, Visual, tags }, i) => (
            <Reveal key={id} delay={`${(i % 2) * 0.08}s`}>
              <article
                id={id}
                className="chapter"
                data-product-id={id}
                data-orientation={i % 2 === 0 ? "left" : "right"}
              >
                <div className="chapter-numeral" aria-hidden>
                  {chapter}
                </div>
                <header className="chapter-head">
                  <span className="chapter-eyebrow">
                    <span className="chapter-eyebrow-mark" aria-hidden />
                    <span className="chapter-eyebrow-ord">Chapter {chapter}</span>
                    <span className="chapter-eyebrow-sep" aria-hidden>
                      /
                    </span>
                    <span className="chapter-eyebrow-sub">{subtitle}</span>
                  </span>
                  <h3 className="chapter-title">
                    <SplitText as="span" text={title} stagger={0.025} />
                  </h3>
                  <div className="chapter-tags" aria-hidden>
                    {tags.map((t) => (
                      <span key={t} className="chapter-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </header>

                <figure className="chapter-figure" data-cursor="link" data-cursor-label="Specimen">
                  <Tilt className="chapter-figure-frame" max={6}>
                    <span className="chapter-figure-light" aria-hidden />
                    <Visual />
                    <span className="chapter-figure-specular" aria-hidden />
                  </Tilt>
                  <figcaption className="chapter-figure-cap">
                    <span>Plate · {chapter}</span>
                    <span aria-hidden>{tags[0]}</span>
                  </figcaption>
                </figure>

                <div className="chapter-body">
                  <p className="chapter-lede">{copy}</p>

                  <dl className="chapter-colophon">
                    <div className="chapter-colophon-row">
                      <dt>Folio</dt>
                      <dd>{spec}</dd>
                    </div>
                    <div className="chapter-colophon-row">
                      <dt>Run</dt>
                      <dd>{price}</dd>
                    </div>
                    <div className="chapter-colophon-row">
                      <dt>Origin</dt>
                      <dd>Studio · 48-hour dispatch</dd>
                    </div>
                  </dl>

                  <div className="chapter-actions">
                    <Magnetic strength={0.18}>
                      <AddToCart productId={id} productTitle={title} />
                    </Magnetic>
                    <a
                      href={`#${id}`}
                      className="chapter-permalink"
                      data-cursor="link"
                      aria-label={`Permalink to ${title}`}
                    >
                      <span aria-hidden>§</span>
                      <span className="visually-hidden">Permalink</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Colophon — publisher's mark, type-as-imagery */}
      <section
        className="colophon-mark"
        aria-labelledby="colophon-heading"
      >
        <h2 id="colophon-heading" className="visually-hidden">
          Colophon · Specification
        </h2>
        <div className="colophon-mark-inner">
          <div className="colophon-spec">
            <span className="colophon-eyebrow">Colophon · Specification</span>
            <dl className="colophon-list">
              {[
                {
                  id: "a",
                  k: "Stock",
                  v: "250 gsm, matte black",
                  note: "Single tone, by design",
                },
                {
                  id: "b",
                  k: "Ink",
                  v: "Opaque white, silver gel",
                  note: "Twelve seconds to set",
                },
                {
                  id: "c",
                  k: "Bind",
                  v: "Smyth-sewn signatures",
                  note: "Numbered, by hand",
                },
                {
                  id: "d",
                  k: "Dispatch",
                  v: "On the new moon",
                  note: "Lat 0° · Lon 0°",
                },
              ].map(({ id, k, v, note }, i) => (
                <Reveal key={id} delay={`${i * 0.09}s`}>
                  <div className="colophon-row">
                    <span className="colophon-row-id" aria-hidden>
                      {id}
                    </span>
                    <dt className="colophon-row-key">{k}</dt>
                    <dd className="colophon-row-val">{v}</dd>
                    <span className="colophon-row-note">{note}</span>
                  </div>
                </Reveal>
              ))}
            </dl>
            <span className="colophon-foot">
              Plate · K · Vol. III · MMXXVI
            </span>
          </div>
          <Reveal className="colophon-glyph-reveal">
            <div className="colophon-glyph" aria-hidden>
              <span className="colophon-glyph-letter">K</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Survival Guide — editorial codex, hairline-ruled */}
      <section className="section">
        <div className="section-head">
          <span className="section-tag">CH. 02 / Care & Method</span>
          <SplitText
            as="h2"
            text="On the use of dark paper."
            className="section-title"
            stagger={0.03}
          />
          <p className="section-lede">
            Three notes on writing into the dark. None optional. None new.
          </p>
        </div>

        <ol className="survival-codex">
          {[
            {
              n: "01",
              roman: "I",
              h: "Choose the ink, not the pen.",
              p: "Dye-based ballpoint dries pale and arrives invisible on coated stock. Use opaque pigment — silver gel, white pigment, gold metallic. Ink, here, is a setting.",
              note: "Opaque pigment, archival.",
            },
            {
              n: "02",
              roman: "II",
              h: "Let the pigment set.",
              p: "Pigment sits on the surface six to twelve seconds before it bonds. Close a notebook too early and the facing leaf will keep the message for you, less legibly.",
              note: "Twelve seconds to set.",
            },
            {
              n: "03",
              roman: "III",
              h: "Expect to be asked.",
              p: "A black book on the table reads as decision before it is opened. You will be asked about it. You owe no answer beyond preference. This is the cost of working in a single tone.",
              note: null,
            },
          ].map(({ n, roman, h, p, note }, i) => (
            <Reveal key={n} delay={`${i * 0.09}s`}>
              <li
                className="codex-row"
                data-side={i === 1 ? "right" : "left"}
              >
                <span className="codex-numeral" aria-hidden>
                  {n}
                </span>
                <div className="codex-body">
                  <span className="codex-eyebrow">Note · {roman}</span>
                  <h3 className="codex-title">{h}</h3>
                  <p className="codex-prose">{p}</p>
                  {note && (
                    <span className="codex-annotation">{note}</span>
                  )}
                </div>
                <span className="codex-rule" aria-hidden />
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Manifesto — sticky title */}
      <section id="manifesto" className="manifesto">
        <div className="manifesto-inner">
          <aside className="manifesto-sticky">
            <span className="section-tag">CH. 03 / Position</span>
            <SplitText
              as="h2"
              text="Notes on a darker practice."
              className="section-title white"
              stagger={0.03}
            />
            <p className="manifesto-credo">
              On most days, we are a stationery brand.
              <em> On the others, a position on colour.</em>
            </p>
          </aside>
          <ol className="manifesto-list">
            {[
              {
                t: "On privacy as default",
                d: "A notebook nobody can read incidentally is a notebook you can actually use. The medium enforces what every diary asks for and few honour: room.",
              },
              {
                t: "On tone as position",
                d: "A black book on the table is a sentence before a word is written. Take meetings, not minutes. Show up dressed for the work.",
              },
              {
                t: "On contrast as discipline",
                d: "Black ground accepts only pigment with weight: silver, gold, opaque white, bone. The grocery list, written here, reads as instruction.",
              },
              {
                t: "On refusal as feature",
                d: "Other stationers optimise for legibility. We optimise for atmosphere. The mood is the product. The product is the position. The position holds.",
              },
            ].map((m, i) => (
              <Reveal key={m.t} delay={`${i * 0.08}s`}>
                <li className="manifesto-item">
                  <span className="manifesto-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{m.t}</h3>
                    <p>{m.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Press */}
      <section className="press">
        <Reveal>
          <p className="press-eyebrow">
            Press · selected mentions, plausible publications
          </p>
        </Reveal>
        <Reveal delay="0.15s">
          <div className="press-grid">
            {[
              "Apollo Off-Hours",
              "The Reinhardt Review",
              "Vantablack Vogue",
              "Outrenoir Quarterly",
              "Pen World*",
            ].map((p) => (
              <span key={p} className="press-item">
                {p}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay="0.25s">
          <p className="press-disclaimer">
            *Pen World has, on three separate occasions, declined to review us
            on the grounds that our paper “actively resists journalism.” We are
            keeping the line.
          </p>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section id="cult" className="cult">
        <div className="section-head center">
          <span className="section-tag">CH. 04 / Field Notes</span>
          <SplitText
            as="h2"
            text="From the chromatically committed."
            className="section-title center"
            stagger={0.025}
          />
        </div>
        <div className="quotes">
          {[
            {
              q: "Wrote a thesis on The Void Book with a white gel pen. My supervisor called it hostile to read. She also gave it her highest mark of the year.",
              a: "Edgar A.",
              r: "Doctoral candidate · Stockholm",
            },
            {
              q: "Typed the URL prepared for a federal warning. Received instead some very expensive notebooks. I am, on balance, relieved.",
              a: "Sarah T.",
              r: "First-time visitor",
            },
            {
              q: "Tried the Abyssal cards on the office laser printer. The fire brigade were patient. The remaining cards look magnificent.",
              a: "Marcus D.",
              r: "Designer · Berlin",
            },
            {
              q: "My therapist suggested keeping a journal. She did not specify legibility. This is, technically, a journal.",
              a: "Naomi K.",
              r: "Architect · Kyoto",
            },
          ].map(({ q, a, r }, i) => (
            <Reveal key={a} delay={`${i * 0.06}s`}>
              <figure className="quote">
                <span className="quote-mark" aria-hidden>
                  “
                </span>
                <blockquote>{q}</blockquote>
                <figcaption>
                  <span className="quote-name">{a}</span>
                  <span className="quote-role">{r}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq">
        <div className="section-head">
          <span className="section-tag">CH. 05 / On Record</span>
          <SplitText
            as="h2"
            text="Questions, patiently answered."
            className="section-title"
            stagger={0.03}
          />
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <FaqItem key={f.index} index={f.index} question={f.question}>
              {f.answer}
            </FaqItem>
          ))}
        </div>
      </section>

      {/* Outro — editorial colophon */}
      <footer className="outro">
        <div className="outro-grid">
          <span>BFS · Colophon</span>
          <span>Lat 0° · Lon 0°</span>
          <span>Edition III · MMXXVI</span>
          <span className="right">Folio · Vol. III</span>
        </div>
        <SplitText
          as="h2"
          text="Fade to black."
          className="outro-title"
          stagger={0.04}
        />
        <Reveal delay="0.4s" className="outro-ctas">
          <Magnetic strength={0.25}>
            <a href="#supplies" className="btn-primary big" data-cursor="link" data-cursor-label="Enter">
              <span>Enter the catalogue</span>
              <span className="btn-arrow" aria-hidden>
                ↗
              </span>
            </a>
          </Magnetic>
          <Newsletter />
        </Reveal>

        {/* Colophon — editorial masthead, the credit page of the issue */}
        <Reveal delay="0.45s">
          <section
            className="outro-colophon-wrap"
            aria-labelledby="outro-colophon-heading"
          >
            <h3 id="outro-colophon-heading" className="outro-colophon-label">
              <span aria-hidden>§</span>
              <em>Colophon</em>
            </h3>
            <dl className="outro-colophon">
              <div className="outro-colophon-row">
                <dt className="outro-colophon-key">Set in</dt>
                <dd className="outro-colophon-val">
                  <em>Instrument Serif</em>
                  <span aria-hidden> · </span>Inter
                </dd>
              </div>
              <div className="outro-colophon-row">
                <dt className="outro-colophon-key">Printed</dt>
                <dd className="outro-colophon-val">
                  Studio
                  <span aria-hidden> · </span>Lat 0°&thinsp;0′&thinsp;N
                  <span aria-hidden> · </span>Lon 0°&thinsp;0′&thinsp;W
                </dd>
              </div>
              <div className="outro-colophon-row">
                <dt className="outro-colophon-key">Dispatch</dt>
                <dd className="outro-colophon-val">
                  48 hours
                  <span aria-hidden> · </span>Worldwide
                </dd>
              </div>
              <div className="outro-colophon-row">
                <dt className="outro-colophon-key">Correspondence</dt>
                <dd className="outro-colophon-val">
                  <a
                    href="mailto:studio@blacksforsale.studio"
                    className="outro-colophon-mail"
                    data-cursor="link"
                    data-cursor-label="Write"
                  >
                    studio@blacksforsale.studio
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </Reveal>

        <div className="outro-base">
          <p className="outro-disclaimer">
            <strong>Disclosure.</strong> Yes — we are aware of how the name
            reads. No — we do not sell people. We sell paper, ink, and bound
            objects of an aggressively specific hue. If you arrived here for
            anything else, close the tab — we&rsquo;ll both move on with our day.
          </p>
          <nav className="outro-links" aria-label="Footer">
            <a href="#supplies" data-cursor="link">
              Catalogue
            </a>
            <a href="#manifesto" data-cursor="link">
              Position
            </a>
            <a href="#cult" data-cursor="link">
              Field Notes
            </a>
            <a href="#faq" data-cursor="link">
              On Record
            </a>
            <a
              href="mailto:studio@blacksforsale.studio"
              data-cursor="link"
              data-cursor-label="Write"
            >
              Studio
            </a>
          </nav>
        </div>

        <div className="outro-wordmark" aria-hidden>
          BFS
        </div>

        <p className="outro-signoff">
          <em>MMXXVI</em>
          <span aria-hidden> · </span>Made in the absence of light.
          <span aria-hidden> · </span>All wrongs reserved.
        </p>
      </footer>
    </main>
  );
}
