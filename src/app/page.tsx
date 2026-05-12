import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/split-text";
import { Magnetic } from "@/components/magnetic";
import { Tilt } from "@/components/tilt";
import { Counter } from "@/components/counter";
import { Marquee } from "@/components/marquee";
import { Spotlight } from "@/components/spotlight";
import { FaqItem } from "@/components/faq-item";
import { Newsletter } from "@/components/newsletter";
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
          <a href="#supplies" className="nav-cta" data-cursor="link" aria-label="Cart: zero items — view catalogue">
            <span>Cart</span>
            <span className="nav-cta-dot" />
            <span>0</span>
          </a>
        </Magnetic>
      </nav>

      {/* Hero */}
      <header id="top" className="hero">
        <Spotlight />
        <div className="hero-frame">
          <div className="hero-meta">
            <span className="hero-meta-row">
              <span className="hero-meta-dot" />
              In production · 48-hour dispatch
            </span>
            <span className="hero-meta-row right">Lat 0° 0′ N · Lon 0° 0′ W</span>
          </div>

          <h1 className="hero-title">
            <SplitText as="span" text="Dark" stagger={0.05} />
            <span className="hero-title-row">
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
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <em>An exercise in subtractive design.</em>
            </span>
          </h1>

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

            <Reveal delay="0.6s" className="hero-stats">
              <div>
                <Counter to={47283} locale className="stat-num" />
                <span className="stat-label">Volumes in circulation</span>
              </div>
              <div>
                <Counter to={99.9} decimals={1} suffix="%" className="stat-num" />
                <span className="stat-label">Light absorbed at 550 nm</span>
              </div>
              <div>
                <Counter to={42} suffix="+" className="stat-num" />
                <span className="stat-label">Borders crossed</span>
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

        <div className="products">
          {products.map(({ id, chapter, title, subtitle, price, spec, copy, Visual, tags }, i) => (
            <Reveal key={id} delay={`${(i % 3) * 0.08}s`}>
              <Tilt max={6}>
                <article id={id} className="product" data-cursor="link" data-cursor-label="View">
                  <div className="product-tags">
                    {tags.map((t) => (
                      <span key={t} className="product-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="product-meta">
                    <span>{chapter}</span>
                    <span>{subtitle}</span>
                  </div>
                  <div className="product-visual">
                    <div className="product-glow" />
                    <Visual />
                    <span className="product-hover-cta">
                      <span>Add to Cart</span>
                      <span aria-hidden>↗</span>
                    </span>
                  </div>
                  <div className="product-body">
                    <h3 className="product-title">{title}</h3>
                    <p className="product-copy">{copy}</p>
                    <div className="product-foot">
                      <span className="product-spec">{spec}</span>
                      <span className="product-price">{price}</span>
                    </div>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stat band */}
      <section className="stat-band">
        <div className="stat-band-row">
          <div>
            <Counter to={100} suffix="%" className="stat-band-num" />
            <span className="stat-band-label">K, by mass</span>
          </div>
          <div className="stat-band-line" />
          <div>
            <Counter to={0} className="stat-band-num" />
            <span className="stat-band-label">White margins issued</span>
          </div>
          <div className="stat-band-line" />
          <div>
            <Counter to={1} suffix="/1" className="stat-band-num" />
            <span className="stat-band-label">Hue in stock</span>
          </div>
          <div className="stat-band-line" />
          <div>
            <Counter to={4.9} decimals={1} suffix="★" className="stat-band-num" />
            <span className="stat-band-label">From the chromatically committed</span>
          </div>
        </div>
      </section>

      {/* Survival Guide */}
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
            Three notes for the page in front of you. None of them are
            optional, all of them are obvious.
          </p>
        </div>

        <div className="survival">
          {[
            {
              n: "01",
              h: "Refuse standard ink",
              p: "Dye-based ballpoint dries pale and arrives invisible on coated stock. Use opaque pigment instead — silver gel, white pigment, gold metallic. Ink, here, is a setting; choose it.",
            },
            {
              n: "02",
              h: "Let the page rest",
              p: "Pigment sits on the surface six to twelve seconds before it bonds. Close a notebook too early and the facing leaf will hold the message for you, less legibly.",
            },
            {
              n: "03",
              h: "Anticipate the attention",
              p: "A black book on the table reads as decision before it is opened. You will be asked. You owe no answer beyond preference. This is the cost of working in a single tone.",
            },
          ].map(({ n, h, p }, i) => (
            <Reveal key={n} delay={`${i * 0.12}s`}>
              <div className="survival-card">
                <span className="survival-num">{n}</span>
                <h3>{h}</h3>
                <p>{p}</p>
                <span className="survival-line" />
              </div>
            </Reveal>
          ))}
        </div>
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
                    <h4>{m.t}</h4>
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

      {/* Outro */}
      <footer className="outro">
        <div className="outro-grid">
          <span>BFS / Colophon</span>
          <span>Lat 0° · Lon 0°</span>
          <span>Edition III · MMXXVI</span>
          <span className="right">↓</span>
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

        <div className="outro-base">
          <p className="outro-disclaimer">
            <strong>Disclosure.</strong> Yes — we are aware of how the name
            reads. No — we do not sell people. We sell paper, ink, and bound
            objects of an aggressively specific hue. If you arrived here for
            anything else, the back button is in the upper-left of this
            window. We trust you to use it.
          </p>
          <div className="outro-links">
            <a href="#" data-cursor="link">
              Terms
            </a>
            <a href="#" data-cursor="link">
              Privacy
            </a>
            <a href="#" data-cursor="link">
              Studio
            </a>
            <a href="#" data-cursor="link">
              Instagram
            </a>
          </div>
        </div>

        <div className="outro-wordmark" aria-hidden>
          BFS
        </div>
      </footer>
    </main>
  );
}
