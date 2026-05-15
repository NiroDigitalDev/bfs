/* Wax-seal-on-black-paper — circular composition for the /journal index header.
   Two concentric hairline rings, 24 tick marks at the perimeter (one per hour
   doubled), and the BFS monogram debossed in the center. Drawn in
   currentColor so the parent positions and tints it. */
export function WaxSealMark() {
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <div className="wax-seal-mark" aria-hidden>
      <svg
        viewBox="0 0 120 120"
        preserveAspectRatio="xMidYMid meet"
        focusable={false}
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth={0.5}
          strokeLinecap="round"
        >
          <circle cx="60" cy="60" r="54" />
          <circle cx="60" cy="60" r="46" />
          {ticks.map((deg) => (
            <line
              key={deg}
              x1="60"
              y1="8"
              x2="60"
              y2="13"
              transform={`rotate(${deg} 60 60)`}
            />
          ))}
          <circle cx="60" cy="60" r="22" />
        </g>
        <text
          x="60"
          y="64"
          textAnchor="middle"
          fontFamily="var(--font-serif), ui-serif, Georgia, serif"
          fontStyle="italic"
          fontSize="16"
          fontWeight="400"
          fill="currentColor"
          opacity="0.9"
        >
          BFS
        </text>
        <text
          x="60"
          y="78"
          textAnchor="middle"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fontSize="3.6"
          fontWeight="600"
          letterSpacing="0.32em"
          fill="currentColor"
          opacity="0.55"
        >
          ED·III
        </text>
      </svg>
    </div>
  );
}
