import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/split-text";
import { Magnetic } from "@/components/magnetic";
import { Newsletter } from "@/components/newsletter";
import { ColophonPress } from "@/components/colophon-press";

export function SiteFooter() {
  return (
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
          <Link
            href="/#supplies"
            className="btn-primary big"
            data-cursor="link"
            data-cursor-label="Return"
          >
            <span>Return to the catalogue</span>
            <span className="btn-arrow" aria-hidden>
              ↑
            </span>
          </Link>
        </Magnetic>
        <Newsletter />
      </Reveal>

      {/* Colophon — editorial masthead, the credit page of the issue */}
      <Reveal delay="0.45s">
        <section
          className="outro-colophon-wrap"
          aria-labelledby="outro-colophon-heading"
        >
          <ColophonPress />
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
          <Link href="/#supplies" data-cursor="link">
            Catalogue
          </Link>
          <Link href="/#manifesto" data-cursor="link">
            Position
          </Link>
          <Link href="/#cult" data-cursor="link">
            Field Notes
          </Link>
          <Link href="/#faq" data-cursor="link">
            On Record
          </Link>
          <Link href="/journal" data-cursor="link">
            Journal
          </Link>
          <Link href="/about" data-cursor="link">
            About
          </Link>
          <a
            href="mailto:studio@blacksforsale.studio"
            data-cursor="link"
            data-cursor-label="Write"
          >
            Studio
          </a>
        </nav>
        <nav className="outro-links outro-links-statutory" aria-label="Statutory">
          <Link href="/privacy" data-cursor="link">
            Privacy
          </Link>
          <Link href="/terms" data-cursor="link">
            Terms
          </Link>
          <Link href="/cookies" data-cursor="link">
            Cookies
          </Link>
        </nav>
      </div>

      <p className="outro-signoff">
        <em>MMXXVI</em>
        <span aria-hidden> · </span>Made in the absence of light.
        <span aria-hidden> · </span>All wrongs reserved.
      </p>

      {/* Closing wordmark recomposed as the dictionary expansion of "BFS" —
          the abbreviation literally becomes its own lemma. Three lines: gigantic
          outline-stroke "Blacks", italic-serif lowercase connector "for" set inside
          the line gap (overlapping per dictionary lemma compression), gigantic
          outline-stroke "Sale.". The visible mark stays decorative; an sr-only
          sibling gives ATs the readable name (the prior <div>BFS</div> was silent
          to screen readers). */}
      <div className="outro-wordmark" aria-hidden>
        <span className="outro-wordmark-major">Blacks</span>
        <span className="outro-wordmark-conn">
          <em>for</em>
        </span>
        <span className="outro-wordmark-major">Sale.</span>
      </div>
      <span className="sr-only">Blacks for Sale. Edition III, MMXXVI.</span>
    </footer>
  );
}
