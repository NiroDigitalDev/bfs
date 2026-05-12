type Props = {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  sep?: string;
};

export function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = "",
  sep = "✦",
}: Props) {
  const row = items.flatMap((t, i) => [
    <span key={`t-${i}`}>{t}</span>,
    <span key={`s-${i}`} className="marquee-sep" aria-hidden>
      {sep}
    </span>,
  ]);

  return (
    <div
      className={`marquee-row ${reverse ? "reverse" : ""} ${className}`}
      style={{ ["--speed" as never]: `${speed}s` }}
    >
      <div className="marquee-track">
        <div className="marquee-group">{row}</div>
        <div className="marquee-group" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
