import { Reveal } from "@/components/reveal";
import type { Product } from "@/data/products";

export function ProductReviews({ product }: { product: Product }) {
  if (!product.reviews || product.reviews.length === 0) return null;

  return (
    <section
      className="pdp-reviews"
      aria-labelledby={`pdp-reviews-heading-${product.id}`}
    >
      <Reveal>
        <span className="pdp-press-eyebrow">
          <em>Reader&rsquo;s notes · Correspondence</em>
        </span>
      </Reveal>
      <div className="pdp-press-rule" aria-hidden />
      <Reveal>
        <h2
          id={`pdp-reviews-heading-${product.id}`}
          className="pdp-press-display"
        >
          <em>From the press.</em>
        </h2>
      </Reveal>

      <ol className="pdp-reviews-list">
        {product.reviews.map((r, i) => (
          <Reveal key={`${product.id}-r${i}`} delay={`${0.08 + i * 0.08}s`}>
            <li
              className="pdp-reviews-entry"
              data-side={i % 2 === 0 ? "left" : "right"}
            >
              <span className="cult-fig" aria-hidden>
                <span className="cult-fig-rule" />
                <span className="cult-fig-label">{r.fig}</span>
              </span>
              <figure className="pullquote">
                <span className="pullquote-rule" aria-hidden />
                <blockquote className="pullquote-body">
                  <span className="pullquote-glyph" aria-hidden>
                    &ldquo;
                  </span>
                  {r.quote}
                </blockquote>
                <figcaption className="pullquote-attribution">
                  <span className="pullquote-dash" aria-hidden>
                    &mdash;
                  </span>
                  <cite className="pullquote-name">{r.name}</cite>
                  <span className="pullquote-role">
                    <em>{r.role}</em>
                    {r.place && r.place !== "—" ? (
                      <>
                        <span aria-hidden> · </span>
                        {r.place}
                      </>
                    ) : null}
                  </span>
                </figcaption>
              </figure>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
