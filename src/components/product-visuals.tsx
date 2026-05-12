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
      </defs>
      <g>
        <rect x="38" y="20" width="240" height="360" rx="4" fill="url(#nbCover)" />
        <rect x="38" y="20" width="20" height="360" fill="url(#nbSpine)" />
        <rect x="60" y="20" width="2" height="360" fill="rgba(255,255,255,0.06)" />
        <rect x="80" y="60" width="160" height="1" fill="url(#nbEmboss)" />
        <rect x="80" y="340" width="120" height="1" fill="url(#nbEmboss)" />
        <text
          x="158"
          y="200"
          textAnchor="middle"
          fill="rgba(255,255,255,0.18)"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, letterSpacing: "0.3em" }}
          fontSize="11"
        >
          BFS
        </text>
        <text
          x="158"
          y="218"
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
      </defs>
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
      <rect x="50" y="40" width="200" height="2" fill="rgba(255,255,255,0.08)" />
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
      </defs>
      <rect x="40" y="60" width="220" height="320" fill="url(#spFace)" rx="2" />
      <rect x="40" y="60" width="220" height="2" fill="rgba(255,255,255,0.06)" />
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
      </defs>
      <g transform="rotate(-4 150 150)">
        <rect x="60" y="50" width="180" height="180" fill="url(#stFace)" />
        <rect x="60" y="50" width="180" height="6" fill="rgba(255,255,255,0.06)" />
      </g>
      <g transform="rotate(2 150 150) translate(20 30)">
        <rect x="50" y="40" width="180" height="180" fill="url(#stFace)" />
        <rect x="50" y="40" width="180" height="6" fill="rgba(255,255,255,0.06)" />
      </g>
      <g transform="translate(40 50)">
        <rect x="50" y="40" width="180" height="180" fill="url(#stFace)" />
        <rect x="50" y="40" width="180" height="6" fill="rgba(255,255,255,0.06)" />
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
      </defs>
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
      </defs>
      <rect x="50" y="30" width="200" height="350" fill="url(#plFace)" rx="6" />
      <rect x="50" y="30" width="6" height="350" fill="rgba(255,255,255,0.05)" />
      <rect x="200" y="30" width="6" height="350" fill="rgba(0,0,0,0.6)" />
      <rect x="220" y="30" width="8" height="320" fill="#8a0e0e" />
      <rect x="220" y="30" width="8" height="6" fill="rgba(255,255,255,0.18)" />
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
