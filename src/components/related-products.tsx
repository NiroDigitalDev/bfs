import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Tilt } from "@/components/tilt";
import {
  NotebookVisual,
  CardstockVisual,
  SketchpadVisual,
  StickyVisual,
  PenVisual,
  PlannerVisual,
} from "@/components/product-visuals";
import { products, type ProductId } from "@/data/products";

const visualsById: Record<ProductId, React.ComponentType> = {
  "void-book": NotebookVisual,
  "abyssal-cardstock": CardstockVisual,
  "event-horizon-pad": SketchpadVisual,
  "sticky-voids": StickyVisual,
  "savior-pen": PenVisual,
  "executive-despair": PlannerVisual,
};

export function RelatedProducts({ current }: { current: ProductId }) {
  const idx = products.findIndex((p) => p.id === current);
  if (idx < 0) return null;
  const len = products.length;
  const prev = products[(idx - 1 + len) % len];
  const next = products[(idx + 1) % len];
  const siblings = [prev, next];

  return (
    <section className="related" aria-labelledby="related-heading">
      <header className="related-head">
        <span className="related-eyebrow">
          <span className="related-eyebrow-rule" aria-hidden />
          <em>Also in this edition</em>
        </span>
        <h2 id="related-heading" className="related-title">
          Two further specimens.
        </h2>
      </header>
      <ol className="related-grid">
        {siblings.map((p, i) => {
          const Visual = visualsById[p.id];
          return (
            <Reveal key={p.id} delay={`${i * 0.08}s`}>
              <li className="related-item">
                <Link
                  href={`/supplies/${p.id}`}
                  className="related-link"
                  data-cursor="link"
                  data-cursor-label="Open"
                  aria-label={`${p.title} · Plate ${p.plate.fig}`}
                >
                  <Tilt className="related-figure" max={4}>
                    <span className="related-figure-light" aria-hidden />
                    <Visual />
                  </Tilt>
                  <div className="related-meta">
                    <span className="related-plate">
                      Plate&thinsp;·&thinsp;{p.plate.fig}
                    </span>
                    <h3 className="related-name">{p.title}</h3>
                    <span className="related-sub">
                      <em>{p.subtitle}</em>
                    </span>
                    <span className="related-arrow" aria-hidden>
                      Read the spec ↗
                    </span>
                  </div>
                </Link>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
