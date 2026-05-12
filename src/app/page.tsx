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

const products = [
  {
    chapter: "001",
    title: "The Void Book",
    subtitle: "A5",
    price: "$34",
    spec: "120GSM · LAY-FLAT BINDING",
    copy:
      "200 pages of pure, light-absorbing black. Bound in matte faux-leather. Unlined, because rules are for white paper.",
    Visual: NotebookVisual,
    tags: ["best-seller", "ships in 48h"],
  },
  {
    chapter: "002",
    title: "Abyssal Cardstock",
    subtitle: "A4",
    price: "$45",
    spec: "500GSM · PRINTER-HOSTILE",
    copy:
      "50 sheets of aggressively thick black card. Guaranteed to jam standard office printers and intimidate clients.",
    Visual: CardstockVisual,
    tags: ["heavy"],
  },
  {
    chapter: "003",
    title: "Event Horizon Pad",
    subtitle: "Coil",
    price: "$28",
    spec: "160GSM · TOOTH-HEAVY",
    copy:
      "Top-wire bound sketchpad. Tooth-heavy texture perfect for pastels, white charcoal, and existential dread.",
    Visual: SketchpadVisual,
    tags: ["new"],
  },
  {
    chapter: "004",
    title: "Sticky Voids",
    subtitle: "3-Pack",
    price: "$15",
    spec: "3×3 IN · HIGH TACK",
    copy:
      "Leave passive-aggressive notes that your roommates can barely read. Three pads of 100 sheets.",
    Visual: StickyVisual,
    tags: ["gift"],
  },
  {
    chapter: "005",
    title: "The Savior Pen",
    subtitle: "0.5mm",
    price: "$12",
    spec: "SILVER GEL · OPAQUE",
    copy:
      "Opaque, liquid silver gel ink. Because standard blue ink on our paper makes you look foolish.",
    Visual: PenVisual,
    tags: ["pairs well"],
  },
  {
    chapter: "006",
    title: "Executive Despair",
    subtitle: "Planner",
    price: "$42",
    spec: "UNDATED · SILK RIBBON",
    copy:
      "An undated weekly planner printed with 90% black ink on 100% black paper. For scheduling crises.",
    Visual: PlannerVisual,
    tags: ["unhinged"],
  },
];

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
          <span className="nav-logo-sub">© MMXXVI</span>
        </a>
        <div className="nav-links">
          <a href="#supplies" data-cursor="link">
            <span className="nav-num">01</span> Supplies
          </a>
          <a href="#manifesto" data-cursor="link">
            <span className="nav-num">02</span> Manifesto
          </a>
          <a href="#cult" data-cursor="link">
            <span className="nav-num">03</span> The Cult
          </a>
          <a href="#faq" data-cursor="link">
            <span className="nav-num">04</span> FAQ
          </a>
        </div>
        <Magnetic strength={0.25}>
          <button className="nav-cta" data-cursor="link">
            <span>Cart</span>
            <span className="nav-cta-dot" />
            <span>0</span>
          </button>
        </Magnetic>
      </nav>

      {/* Hero */}
      <header id="top" className="hero">
        <Spotlight />
        <div className="hero-frame">
          <div className="hero-meta">
            <span className="hero-meta-row">
              <span className="hero-meta-dot" />
              Live · Now Shipping the Void
            </span>
            <span className="hero-meta-row right">N 0°0′0″ — W 0°0′0″</span>
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
                You wanted a white canvas? Wrong website. We sell pitch-black
                paper, obsidian notebooks, and the absolute absence of legible
                margins.
              </p>
            </Reveal>

            <Reveal delay="0.5s" className="hero-ctas">
              <Magnetic strength={0.25}>
                <a href="#supplies" className="btn-primary" data-cursor="link" data-cursor-label="Shop">
                  <span>Shop the Void</span>
                  <span className="btn-arrow" aria-hidden>
                    ↗
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="#manifesto" className="btn-ghost" data-cursor="link">
                  Read the Manifesto
                </a>
              </Magnetic>
            </Reveal>

            <Reveal delay="0.6s" className="hero-stats">
              <div>
                <Counter to={47283} locale className="stat-num" />
                <span className="stat-label">Voids sold</span>
              </div>
              <div>
                <Counter to={99.9} decimals={1} suffix="%" className="stat-num" />
                <span className="stat-label">Light absorbed</span>
              </div>
              <div>
                <Counter to={42} suffix="+" className="stat-num" />
                <span className="stat-label">Countries shipped</span>
              </div>
            </Reveal>
          </div>

          <a href="#supplies" className="hero-scroll" data-cursor="link">
            <span className="hero-scroll-line" />
            <span>Scroll</span>
          </a>
        </div>
      </header>

      {/* Marquees */}
      <section className="marquees">
        <Marquee
          speed={45}
          items={[
            "Black Paper",
            "No White Space",
            "Obsidian Notebooks",
            "500GSM Void",
            "Pretentious Stationery",
            "Aesthetic Conviction",
          ]}
        />
        <Marquee
          reverse
          speed={60}
          sep="—"
          items={[
            "EST. The Year Color Died",
            "Made in the Dark",
            "Returns Accepted If You Cry",
            "Shipped in Black Boxes",
            "Pen World said no",
          ]}
        />
      </section>

      {/* Supplies */}
      <section id="supplies" className="section">
        <div className="section-head">
          <span className="section-tag">CH. 01 / Supplies</span>
          <SplitText
            as="h2"
            text="Stationery non grata."
            className="section-title"
            stagger={0.03}
          />
          <p className="section-lede">
            Curated emptiness for the discerning creative. Normal pens will not
            save you here.
          </p>
        </div>

        <div className="products">
          {products.map(({ chapter, title, subtitle, price, spec, copy, Visual, tags }, i) => (
            <Reveal key={chapter} delay={`${(i % 3) * 0.08}s`}>
              <Tilt max={6}>
                <article className="product" data-cursor="link" data-cursor-label="View">
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
            <span className="stat-band-label">Black</span>
          </div>
          <div className="stat-band-line" />
          <div>
            <Counter to={0} className="stat-band-num" />
            <span className="stat-band-label">White Margins</span>
          </div>
          <div className="stat-band-line" />
          <div>
            <Counter to={1} suffix="/1" className="stat-band-num" />
            <span className="stat-band-label">Color in Stock</span>
          </div>
          <div className="stat-band-line" />
          <div>
            <Counter to={4.9} decimals={1} suffix="★" className="stat-band-num" />
            <span className="stat-band-label">From the Cult</span>
          </div>
        </div>
      </section>

      {/* Survival Guide */}
      <section className="section">
        <div className="section-head">
          <span className="section-tag">CH. 02 / Survival Guide</span>
          <SplitText
            as="h2"
            text="You bought it. Now what."
            className="section-title"
            stagger={0.03}
          />
          <p className="section-lede">
            Here&apos;s how to not waste your extremely specific purchase.
          </p>
        </div>

        <div className="survival">
          {[
            {
              n: "01",
              h: "Abandon Normal Ink",
              p: "Your trusty Bic will betray you here. You need opaque ink: silver gel, gold metallic, or white correction-pen energy. Think of it as upgrading from tap water to champagne, except it's a pen.",
            },
            {
              n: "02",
              h: "Let the Paper Dry",
              p: "Gel ink on dark paper takes 4–6 seconds longer to dry than you're used to. Impatient people will smudge everything and blame us. We accept no liability for your lack of impulse control.",
            },
            {
              n: "03",
              h: "Accept the Stares",
              p: "People will look at you differently. Your barista will comment. Your coworkers will have questions. You will have no good answers. This is the price of aesthetic conviction.",
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
            <span className="section-tag">CH. 03 / Manifesto</span>
            <SplitText
              as="h2"
              text="The Void Manifesto."
              className="section-title white"
              stagger={0.03}
            />
            <p className="manifesto-credo">
              We are a stationery brand only in the most technical sense.
              <em> Mostly we are a position.</em>
            </p>
          </aside>
          <ol className="manifesto-list">
            {[
              {
                t: "Anti-Legibility",
                d: "Keep your secrets entirely safe. If you accidentally write in a standard ballpoint pen, literally nobody will be able to read it. Not even you.",
              },
              {
                t: "Aesthetic Dominance",
                d: "Pull out a solid black notebook in your next corporate meeting. Watch the color drain from the faces of your colleagues who brought yellow legal pads.",
              },
              {
                t: "High Contrast Only",
                d: "Our paper forces commitment. You must use silver, gold, or opaque white ink. It turns every grocery list into an arcane, important document.",
              },
              {
                t: "Refusal as Feature",
                d: "Where other brands optimize for legibility, we optimize for atmosphere. The product is the mood; the mood is the product.",
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
            As featured in publications that definitely exist
          </p>
        </Reveal>
        <Reveal delay="0.15s">
          <div className="press-grid">
            {[
              "Dark Arts Quarterly",
              "Ink & Suffering",
              "Vantablack Vogue",
              "Nihilist Stationer",
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
            *Pen World did not actually feature us. They said our paper
            “actively resists journalism.” We consider this a review.
          </p>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section id="cult" className="cult">
        <div className="section-head center">
          <span className="section-tag">CH. 04 / The Cult</span>
          <SplitText
            as="h2"
            text="Words from the chromatically committed."
            className="section-title center"
            stagger={0.025}
          />
        </div>
        <div className="quotes">
          {[
            {
              q: "I wrote my thesis in The Void Book using a white gel pen. My professor said it was ‘hostile to read’ but gave me an A for branding.",
              a: "Edgar A.",
              r: "Grad Student",
            },
            {
              q: "When I typed in the URL, I was sweating. When I saw they just sold very pretentious notebooks, I was relieved. Five stars.",
              a: "Sarah T.",
              r: "Accidental Typist",
            },
            {
              q: "I bought the Abyssal Cardstock to print business cards. The printer caught fire. The cards look incredible though.",
              a: "Marcus D.",
              r: "Designer · Arsonist",
            },
            {
              q: "My therapist asked me to keep a journal. She did not specify it had to be readable. The Void Book is technically compliance.",
              a: "Naomi K.",
              r: "Malicious Compliance Enthusiast",
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
          <span className="section-tag">CH. 05 / FAQ</span>
          <SplitText
            as="h2"
            text="Frequently questioned."
            className="section-title"
            stagger={0.03}
          />
        </div>
        <div className="faq-list">
          <FaqItem index="01" question="Why would I buy black paper?">
            Why would you buy white paper? Because someone told you to? Because
            society normalized it? We&apos;re not here to answer your
            existential questions. We&apos;re here to sell you paper that
            matches the void inside.
          </FaqItem>
          <FaqItem index="02" question="Can I print on it?">
            Technically, yes. Practically, your printer will enter a crisis.
            Standard inkjet printers assume they&apos;re printing on white
            paper. Ours will gaslight them into producing invisible output. We
            recommend laser printers with white toner, or simply accepting
            handwriting as a personality trait.
          </FaqItem>
          <FaqItem index="03" question="Do you ship internationally?">
            Darkness has no borders. We ship to 40+ countries. Customs agents
            have occasionally opened our packages and been confused by the
            contents. “It&apos;s just… black rectangles?” Yes. That&apos;s the
            product. You&apos;re welcome.
          </FaqItem>
          <FaqItem index="04" question="Is this an art project or a real business?">
            Both. Neither. We have a tax ID and a genuine distaste for white
            margins. Our accountant calls it “a real business.” Our friends
            call it “a cry for help.” Our customers call it “the only
            stationery brand that gets me.”
          </FaqItem>
          <FaqItem index="05" question="What's your return policy?">
            You may return any unopened product within 30 days. If you opened it
            and are disappointed that the black paper is, in fact, black — we
            genuinely do not know what to tell you. The name of the company is
            Blacks For Sale. We were not being metaphorical about the
            stationery.
          </FaqItem>
        </div>
      </section>

      {/* Outro */}
      <footer className="outro">
        <div className="outro-grid">
          <span>BFS / Outro</span>
          <span>Lat 0° · Lon 0°</span>
          <span>2026 Edition</span>
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
            <a href="#supplies" className="btn-primary big" data-cursor="link" data-cursor-label="Shop">
              <span>Shop All Supplies</span>
              <span className="btn-arrow" aria-hidden>
                ↗
              </span>
            </a>
          </Magnetic>
          <Newsletter />
        </Reveal>

        <div className="outro-base">
          <p className="outro-disclaimer">
            <strong>LEGAL DISCLAIMER:</strong> Yes, we are fully aware of what
            this domain name sounds like. No, we do not sell people. We sell
            extremely dark paper, obsidian notebooks, and conceptual stationery.
            If you came to this URL looking for anything else, please
            re-evaluate your life choices and clear your search history
            immediately.
          </p>
          <div className="outro-links">
            <a href="#" data-cursor="link">
              Terms
            </a>
            <a href="#" data-cursor="link">
              Privacy
            </a>
            <a href="#" data-cursor="link">
              Contact
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
