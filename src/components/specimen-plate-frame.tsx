import type { ProductId } from "@/data/products";

type Mark = "grid" | "dot" | "plus" | "cross" | "ring" | "tri";

const accents: Record<ProductId, { mark: Mark; fig: string }> = {
  "void-book": { mark: "grid", fig: "I·v" },
  "abyssal-cardstock": { mark: "dot", fig: "II·c" },
  "event-horizon-pad": { mark: "plus", fig: "III·e" },
  "sticky-voids": { mark: "cross", fig: "IV·s" },
  "savior-pen": { mark: "ring", fig: "V·p" },
  "executive-despair": { mark: "tri", fig: "VI·d" },
};

function CentralAccent({ mark }: { mark: Mark }) {
  switch (mark) {
    case "grid":
      return (
        <g transform="translate(490 56)">
          <rect x="0" y="0" width="20" height="14" />
          <line x1="10" y1="0" x2="10" y2="14" />
          <line x1="0" y1="7" x2="20" y2="7" />
        </g>
      );
    case "dot":
      return (
        <g transform="translate(500 62)" fill="currentColor" stroke="none">
          <circle cx="-12" cy="0" r="1" />
          <circle cx="-6" cy="0" r="1" />
          <circle cx="0" cy="0" r="1.6" />
          <circle cx="6" cy="0" r="1" />
          <circle cx="12" cy="0" r="1" />
        </g>
      );
    case "plus":
      return (
        <g transform="translate(500 60)">
          <line x1="-10" y1="0" x2="10" y2="0" />
          <line x1="0" y1="-10" x2="0" y2="10" />
        </g>
      );
    case "cross":
      return (
        <g transform="translate(500 60)">
          <line x1="-8" y1="-8" x2="8" y2="8" />
          <line x1="-8" y1="8" x2="8" y2="-8" />
        </g>
      );
    case "ring":
      return (
        <g transform="translate(500 62)">
          <circle cx="0" cy="0" r="8" />
          <circle cx="0" cy="0" r="1.2" fill="currentColor" stroke="none" />
        </g>
      );
    case "tri":
      return (
        <g transform="translate(500 60)">
          <path d="M 0 -10 L 9 6 L -9 6 Z" />
        </g>
      );
  }
}

export function SpecimenPlateFrame({ productId }: { productId: ProductId }) {
  const cfg = accents[productId];
  return (
    <div className="pdp-plate-frame" aria-hidden>
      <svg
        viewBox="0 0 1000 1250"
        preserveAspectRatio="none"
        focusable={false}
      >
        <g
          stroke="currentColor"
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Four L-corner brackets */}
          <path d="M 32 80 L 32 32 L 80 32" />
          <path d="M 968 80 L 968 32 L 920 32" />
          <path d="M 32 1170 L 32 1218 L 80 1218" />
          <path d="M 968 1170 L 968 1218 L 920 1218" />
          {/* Two registration crosses on the vertical midline */}
          <g transform="translate(36 625)">
            <line x1="-6" y1="0" x2="6" y2="0" />
            <line x1="0" y1="-6" x2="0" y2="6" />
          </g>
          <g transform="translate(964 625)">
            <line x1="-6" y1="0" x2="6" y2="0" />
            <line x1="0" y1="-6" x2="0" y2="6" />
          </g>
          {/* Product-specific central accent — top edge */}
          <CentralAccent mark={cfg.mark} />
        </g>
      </svg>
      <span className="pdp-plate-frame-engraving">
        ED&#8202;·&#8202;III&#8202;·&#8202;MMXXVI&#8202;·&#8202;FIG.&#8202;{cfg.fig}
      </span>
    </div>
  );
}
