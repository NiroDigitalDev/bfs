export function NotebookVisual() {
  return (
    <svg
      viewBox="0 0 300 400"
      className="product-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="nbCover" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0d0d0d" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <linearGradient id="nbSpine" x1="0" x2="1">
          <stop offset="0" stopColor="#000" />
          <stop offset="1" stopColor="#1c1c1c" />
        </linearGradient>
        <linearGradient id="nbEmboss" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0)" />
          <stop offset=".5" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="nbSheen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
          <stop offset=".4" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="nbForedge" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1c1c1c" />
          <stop offset=".5" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#1c1c1c" />
        </linearGradient>
        <radialGradient id="nbFloor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="rgba(0,0,0,0.8)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <g>
        {/* Floor contact */}
        <ellipse cx="158" cy="386" rx="118" ry="6" fill="url(#nbFloor)" />
        {/* Foredge — page block thickness on right edge */}
        <rect x="278" y="22" width="4" height="356" fill="url(#nbForedge)" />
        <rect x="278" y="22" width="4" height="1" fill="rgba(255,255,255,0.22)" />
        {/* Cover */}
        <rect x="38" y="20" width="240" height="360" rx="4" fill="url(#nbCover)" />
        {/* Top sheen */}
        <rect x="38" y="20" width="240" height="120" rx="4" fill="url(#nbSheen)" />
        {/* Spine */}
        <rect x="38" y="20" width="20" height="360" fill="url(#nbSpine)" />
        <rect x="60" y="20" width="2" height="360" fill="rgba(255,255,255,0.06)" />
        {/* Blind-deboss panel around wordmark */}
        <rect
          x="100"
          y="176"
          width="116"
          height="60"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
        <rect x="80" y="60" width="160" height="1" fill="url(#nbEmboss)" />
        <rect x="80" y="340" width="120" height="1" fill="url(#nbEmboss)" />
        <text
          x="158"
          y="208"
          textAnchor="middle"
          fill="rgba(255,255,255,0.18)"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, letterSpacing: "0.3em" }}
          fontSize="11"
        >
          BFS
        </text>
        <text
          x="158"
          y="226"
          textAnchor="middle"
          fill="rgba(255,255,255,0.08)"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, letterSpacing: "0.2em" }}
          fontSize="7"
        >
          THE VOID BOOK
        </text>
      </g>
    </svg>
  );
}

export function CardstockVisual() {
  return (
    <svg
      viewBox="0 0 300 400"
      className="product-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="csFace" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#141414" />
          <stop offset="1" stopColor="#020202" />
        </linearGradient>
        <linearGradient id="csSheen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.12)" />
          <stop offset=".5" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="csFloor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="rgba(0,0,0,0.75)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      {/* Floor contact under the ream */}
      <ellipse cx="150" cy="384" rx="108" ry="6" fill="url(#csFloor)" />
      {[0, 4, 8, 12].map((o, i) => (
        <rect
          key={i}
          x={50 - o * 0.5}
          y={40 + o * 1.2}
          width="200"
          height="320"
          fill="url(#csFace)"
          stroke="rgba(255,255,255,0.04)"
          rx="2"
        />
      ))}
      <rect x="50" y="40" width="200" height="320" fill="url(#csFace)" rx="2" />
      {/* Top edge highlight */}
      <rect x="50" y="40" width="200" height="3" fill="rgba(255,255,255,0.14)" />
      {/* Top sheen across upper third */}
      <rect x="50" y="40" width="200" height="110" fill="url(#csSheen)" rx="2" />
      <text
        x="150"
        y="210"
        textAnchor="middle"
        fill="rgba(255,255,255,0.15)"
        style={{ fontFamily: "ui-monospace, monospace", letterSpacing: "0.3em" }}
        fontSize="9"
      >
        500GSM
      </text>
    </svg>
  );
}

export function SketchpadVisual() {
  return (
    <svg
      viewBox="0 0 300 400"
      className="product-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="spFace" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#080808" />
        </linearGradient>
        <linearGradient id="spSheen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
          <stop offset=".5" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="spFloor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="rgba(0,0,0,0.75)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="384" rx="116" ry="6" fill="url(#spFloor)" />
      <rect x="40" y="60" width="220" height="320" fill="url(#spFace)" rx="2" />
      <rect x="40" y="60" width="220" height="110" fill="url(#spSheen)" rx="2" />
      <rect x="40" y="60" width="220" height="2" fill="rgba(255,255,255,0.10)" />
      <g>
        {Array.from({ length: 22 }).map((_, i) => (
          <circle
            key={i}
            cx={60 + i * 8.4}
            cy={56}
            r={3}
            fill="#0a0a0a"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
        ))}
        <rect x="56" y="48" width="188" height="2" fill="rgba(255,255,255,0.08)" />
      </g>
      <text
        x="150"
        y="220"
        textAnchor="middle"
        fill="rgba(255,255,255,0.12)"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, letterSpacing: "0.25em" }}
        fontSize="10"
      >
        EVENT HORIZON
      </text>
    </svg>
  );
}

export function StickyVisual() {
  return (
    <svg
      viewBox="0 0 300 300"
      className="product-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="stFace" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1f1f1f" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="stEdge" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id="stSheen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
          <stop offset=".7" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="stFloor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="rgba(0,0,0,0.7)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="284" rx="118" ry="6" fill="url(#stFloor)" />
      {/* Pad 1 — back, rotated -4° */}
      <g transform="rotate(-4 150 150)">
        <rect x="60" y="50" width="180" height="184" fill="url(#stFace)" />
        <rect x="60" y="228" width="180" height="6" fill="url(#stEdge)" />
        <rect x="60" y="50" width="180" height="6" fill="rgba(255,255,255,0.06)" />
      </g>
      {/* Pad 2 — middle, rotated +2°, offset */}
      <g transform="rotate(2 150 150) translate(20 30)">
        <rect x="50" y="40" width="180" height="184" fill="url(#stFace)" />
        <rect x="50" y="218" width="180" height="6" fill="url(#stEdge)" />
        <rect x="50" y="40" width="180" height="6" fill="rgba(255,255,255,0.06)" />
        {/* Adhesive band hint */}
        <rect x="50" y="46" width="180" height="2" fill="rgba(255,255,255,0.04)" />
      </g>
      {/* Pad 3 — front, with corner curl + wordmark */}
      <g transform="translate(40 50)">
        <rect x="50" y="40" width="180" height="184" fill="url(#stFace)" />
        <rect x="50" y="218" width="180" height="6" fill="url(#stEdge)" />
        <rect x="50" y="40" width="180" height="6" fill="rgba(255,255,255,0.06)" />
        {/* Top sheen across pad face */}
        <rect x="50" y="46" width="180" height="60" fill="url(#stSheen)" />
        {/* Corner curl — top-right triangle peel */}
        <path
          d="M210 40 L230 40 L230 60 Z"
          fill="#000"
        />
        <path
          d="M210 40 L230 60"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          fill="none"
        />
        <text
          x="140"
          y="140"
          textAnchor="middle"
          fill="rgba(255,255,255,0.12)"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, letterSpacing: "0.25em" }}
          fontSize="10"
        >
          NOTE TO SELF
        </text>
      </g>
    </svg>
  );
}

export function PenVisual() {
  return (
    <svg
      viewBox="0 0 300 300"
      className="product-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="pnBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#cfcfcf" />
          <stop offset=".4" stopColor="#ffffff" />
          <stop offset=".6" stopColor="#ffffff" />
          <stop offset="1" stopColor="#7a7a7a" />
        </linearGradient>
        <linearGradient id="pnTip" x1="0" x2="1">
          <stop offset="0" stopColor="#333" />
          <stop offset="1" stopColor="#111" />
        </linearGradient>
        <radialGradient id="pnFloor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="rgba(0,0,0,0.75)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="246" rx="120" ry="6" fill="url(#pnFloor)" />
      <g transform="rotate(-35 150 150)">
        <rect x="40" y="142" width="180" height="16" rx="8" fill="url(#pnBody)" />
        <rect x="40" y="142" width="180" height="3" fill="rgba(255,255,255,0.6)" />
        <rect x="40" y="155" width="180" height="3" fill="rgba(0,0,0,0.25)" />
        <polygon points="220,142 248,150 220,158" fill="url(#pnTip)" />
        <circle cx="252" cy="150" r="2" fill="#bdbdbd" />
        <rect x="60" y="142" width="20" height="16" fill="rgba(0,0,0,0.25)" />
      </g>
      <g transform="rotate(-35 150 150) translate(248 148)" opacity="0.9">
        <path
          d="M0 2 C 20 -2, 40 6, 60 0"
          stroke="#e7e7e7"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function PlannerVisual() {
  return (
    <svg
      viewBox="0 0 300 400"
      className="product-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="plFace" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0c0c0c" />
          <stop offset="1" stopColor="#020202" />
        </linearGradient>
        <linearGradient id="plSheen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.14)" />
          <stop offset=".5" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="plFloor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="rgba(0,0,0,0.78)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="386" rx="118" ry="6" fill="url(#plFloor)" />
      <rect x="50" y="30" width="200" height="350" fill="url(#plFace)" rx="6" />
      {/* Top sheen */}
      <rect x="50" y="30" width="200" height="120" fill="url(#plSheen)" rx="6" />
      <rect x="50" y="30" width="6" height="350" fill="rgba(255,255,255,0.05)" />
      <rect x="200" y="30" width="6" height="350" fill="rgba(0,0,0,0.6)" />
      {/* Bordeaux spine bookmark */}
      <rect x="220" y="30" width="8" height="320" fill="#8a0e0e" />
      <rect x="220" y="30" width="8" height="6" fill="rgba(255,255,255,0.18)" />
      {/* Half-page edge tilt — fanned page on right */}
      <path
        d="M210 30 L228 30 L226 350 L210 348 Z"
        fill="rgba(255,255,255,0.04)"
      />
      <g opacity="0.18">
        {Array.from({ length: 7 }).map((_, i) => (
          <rect key={i} x="74" y={90 + i * 32} width="120" height="1" fill="#ffffff" />
        ))}
      </g>
      <text
        x="150"
        y="78"
        textAnchor="middle"
        fill="rgba(255,255,255,0.18)"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, letterSpacing: "0.35em" }}
        fontSize="9"
      >
        DESPAIR
      </text>
    </svg>
  );
}
