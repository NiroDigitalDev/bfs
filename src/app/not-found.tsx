import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/split-text";
import { Magnetic } from "@/components/magnetic";

export const metadata: Metadata = {
  title: "Reference not found",
  description:
    "The catalogue does not list this entry. Either the binding came loose, or it was never pressed.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="nf">
      {/* Top register — coordinates ledger, matches hero meta */}
      <header className="nf-register" aria-hidden>
        <span className="nf-register-row">
          <span className="nf-register-dot" />
          Status · 404 · Reference not found
        </span>
        <span className="nf-register-row right">
          Lat 0° 0′ N · Lon 0° 0′ W
        </span>
      </header>

      {/* Edge stem — rotated spine, mirrors hero-edge but carries the 404 */}
      <aside className="nf-edge" aria-hidden>
        <span className="nf-edge-stem">
          <span className="nf-edge-num">404</span>
          <span className="nf-edge-rule" />
          <span className="nf-edge-label">Permanent vacancy</span>
        </span>
      </aside>

      <div className="nf-frame">
        <div className="nf-title-stack">
          <h1 className="nf-title" aria-label="Not found.">
            <span className="nf-word nf-word-1" aria-hidden>
              <SplitText as="span" text="Not" stagger={0.05} />
            </span>
            <span className="nf-word nf-word-2" aria-hidden>
              <SplitText
                as="span"
                text="Found"
                stagger={0.05}
                start={0.25}
                className="nf-outline"
              />
              <span className="nf-period">
                <SplitText as="span" text="." stagger={0} start={0.6} />
              </span>
            </span>
          </h1>
          <span className="nf-aside">
            <span className="nf-aside-line" aria-hidden />
            <em>Filed under absences.</em>
          </span>
        </div>

        <div className="nf-bottom">
          <Reveal delay="0.4s" className="nf-lede">
            <p>
              The catalogue does not list this entry. Either the binding came
              loose, or it was never pressed — the void keeps no inventory of
              what it has erased.
            </p>
          </Reveal>

          <Reveal delay="0.5s" className="nf-ctas">
            <Magnetic strength={0.25}>
              <Link
                href="/"
                className="btn-primary"
                data-cursor="link"
                data-cursor-label="Return"
              >
                <span>Return to the volume</span>
                <span className="btn-arrow" aria-hidden>
                  ↑
                </span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href="/#supplies"
                className="btn-ghost"
                data-cursor="link"
              >
                Browse the catalogue
              </Link>
            </Magnetic>
          </Reveal>

          {/* Errata ribbon — colophon register, mirrors hero-spec */}
          <Reveal delay="0.6s" className="nf-spec">
            <div className="nf-spec-row">
              <span className="nf-spec-key">Status</span>
              <span className="nf-spec-val">404 · Not found</span>
            </div>
            <div className="nf-spec-row">
              <span className="nf-spec-key">Filed under</span>
              <span className="nf-spec-val nf-spec-val--prose">
                Errata, Vol. III
              </span>
            </div>
            <div className="nf-spec-row">
              <span className="nf-spec-key">Index entry</span>
              <span className="nf-spec-val nf-spec-val--prose">None</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marginalia — italic § note, brand voice */}
      <aside className="nf-marginalia" aria-label="Marginalia">
        <span className="nf-marginalia-mark" aria-hidden>
          §
        </span>
        <em>
          A page that has been bound and shelved here is, by definition, in
          print. The reverse also holds.
        </em>
      </aside>

      {/* Foot register — matches outro grid */}
      <footer className="nf-foot">
        <span>BFS · Errata</span>
        <span>Lat 0° · Lon 0°</span>
        <span>Edition III · MMXXVI</span>
        <span className="right">Folio · 404</span>
      </footer>

      {/* Outro wordmark — type-as-imagery, mirrors outro-wordmark */}
      <div className="nf-wordmark" aria-hidden>
        404
      </div>
    </main>
  );
}
