/* Press-stamp / typesetter's-tray — orthogonal grid of glyph cells for the
   manifesto sticky rail. 4 columns × 3 rows of hairline-bordered cells, each
   holding a typographic mark (period, ampersand, paragraph, em-dash, etc.).
   Cell strokes in currentColor; glyphs sit slightly off-center to read like
   movable type, not a font specimen. */
const cells: Array<{ x: number; y: number; glyph: string; off?: [number, number] }> = [
  { x: 0, y: 0, glyph: "B", off: [0, -1] },
  { x: 1, y: 0, glyph: "F" },
  { x: 2, y: 0, glyph: "S", off: [1, 0] },
  { x: 3, y: 0, glyph: "·" },
  { x: 0, y: 1, glyph: "§", off: [-1, 0] },
  { x: 1, y: 1, glyph: "&" },
  { x: 2, y: 1, glyph: "¶" },
  { x: 3, y: 1, glyph: "—", off: [0, -2] },
  { x: 0, y: 2, glyph: "i" },
  { x: 1, y: 2, glyph: "i", off: [1, 0] },
  { x: 2, y: 2, glyph: "i", off: [-1, 1] },
  { x: 3, y: 2, glyph: ".", off: [0, 4] },
];

const CELL = 40;
const COLS = 4;
const ROWS = 3;
const W = CELL * COLS;
const H = CELL * ROWS;

export function PressStampTray() {
  return (
    <div className="press-stamp-tray" aria-hidden>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        focusable={false}
      >
        <g stroke="currentColor" fill="none" strokeWidth={0.4}>
          <rect x="0.5" y="0.5" width={W - 1} height={H - 1} />
          {Array.from({ length: COLS - 1 }, (_, i) => (
            <line key={`v${i}`} x1={(i + 1) * CELL} y1="0" x2={(i + 1) * CELL} y2={H} />
          ))}
          {Array.from({ length: ROWS - 1 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={(i + 1) * CELL} x2={W} y2={(i + 1) * CELL} />
          ))}
        </g>
        <g fill="currentColor">
          {cells.map((c, i) => {
            const cx = c.x * CELL + CELL / 2 + (c.off?.[0] ?? 0);
            const cy = c.y * CELL + CELL / 2 + 7 + (c.off?.[1] ?? 0);
            return (
              <text
                key={i}
                x={cx}
                y={cy}
                textAnchor="middle"
                fontFamily="var(--font-serif), ui-serif, Georgia, serif"
                fontStyle="italic"
                fontSize="22"
                fontWeight="400"
                opacity="0.78"
              >
                {c.glyph}
              </text>
            );
          })}
        </g>
        <g stroke="currentColor" fill="none" strokeWidth={0.3} opacity={0.5}>
          <line x1="6" y1={H - 3} x2={W - 6} y2={H - 3} />
        </g>
      </svg>
    </div>
  );
}
