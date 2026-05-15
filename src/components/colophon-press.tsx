/* Colophon press — hand-press silhouette in single-stroke hairline white.
   Sits in the footer's colophon area as a small editorial vignette. Profile
   reads as platen-on-frame: heavy upper crossbar, two side posts, bed in
   the middle, base plate. Drawn entirely in currentColor strokes — no fills
   — to read as etched, not illustrated. */
export function ColophonPress() {
  return (
    <div className="colophon-press" aria-hidden>
      <svg
        viewBox="0 0 160 200"
        preserveAspectRatio="xMidYMid meet"
        focusable={false}
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth={0.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Upper crossbar (platen yoke) */}
          <path d="M 20 28 L 140 28 L 140 38 L 20 38 Z" />
          <line x1="80" y1="14" x2="80" y2="28" />
          <circle cx="80" cy="11" r="3" />
          {/* Side posts */}
          <line x1="32" y1="38" x2="32" y2="150" />
          <line x1="128" y1="38" x2="128" y2="150" />
          {/* Platen — the descending block */}
          <path d="M 44 60 L 116 60 L 116 88 L 44 88 Z" />
          <line x1="44" y1="68" x2="116" y2="68" />
          {/* Guide rods to platen */}
          <line x1="52" y1="38" x2="52" y2="60" />
          <line x1="108" y1="38" x2="108" y2="60" />
          {/* Bed (the sheet) */}
          <path d="M 36 110 L 124 110 L 124 138 L 36 138 Z" />
          <line x1="36" y1="116" x2="124" y2="116" />
          <line x1="36" y1="132" x2="124" y2="132" />
          {/* Base */}
          <path d="M 16 150 L 144 150 L 138 168 L 22 168 Z" />
          <line x1="16" y1="158" x2="144" y2="158" />
          {/* Lever — the swing-arm */}
          <line x1="140" y1="33" x2="158" y2="48" />
          <circle cx="158" cy="48" r="2.4" />
          {/* Foot rule */}
          <line x1="28" y1="180" x2="132" y2="180" />
          <line x1="28" y1="180" x2="28" y2="184" />
          <line x1="80" y1="180" x2="80" y2="184" />
          <line x1="132" y1="180" x2="132" y2="184" />
        </g>
        <text
          x="80"
          y="194"
          textAnchor="middle"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fontSize="5"
          fontWeight="600"
          letterSpacing="0.28em"
          fill="currentColor"
          opacity="0.55"
        >
          THE PRESS
        </text>
      </svg>
    </div>
  );
}
