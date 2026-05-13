"use client";

import { useEffect, useRef, useState } from "react";
import type { PlateSpec } from "@/data/products";

export function SpecimenPlate({ plate }: { plate: PlateSpec }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  return (
    <div
      ref={ref}
      className="spec-plate"
      data-in={inView ? "true" : "false"}
      aria-hidden
    >
      <svg
        className="spec-plate-svg"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* FIG. label, top-left, with hairline rule */}
        <g className="spec-plate-fig">
          <text x="22" y="34" className="spec-plate-fig-text">
            FIG.&#8202;{plate.fig}
          </text>
          <line
            x1="22"
            y1="44"
            x2="148"
            y2="44"
            className="spec-plate-line spec-plate-rule"
          />
        </g>

        {/* Compass — top-right */}
        <g className="spec-plate-compass" transform="translate(366 36)">
          <circle
            cx="0"
            cy="0"
            r="12"
            className="spec-plate-line spec-plate-compass-ring"
          />
          <text x="0" y="-16" textAnchor="middle" className="spec-plate-compass-label">
            N
          </text>
          <g transform={`rotate(${plate.azimuth})`}>
            <line
              x1="0"
              y1="-12"
              x2="0"
              y2="-3"
              className="spec-plate-line spec-plate-compass-needle"
            />
          </g>
          <circle cx="0" cy="0" r="0.9" className="spec-plate-compass-pin" />
        </g>

        {/* Height dimension — right edge */}
        <g className="spec-plate-h">
          <line
            x1="372"
            y1="78"
            x2="384"
            y2="78"
            className="spec-plate-line spec-plate-tick"
          />
          <line
            x1="372"
            y1="430"
            x2="384"
            y2="430"
            className="spec-plate-line spec-plate-tick"
          />
          <line
            x1="378"
            y1="78"
            x2="378"
            y2="222"
            className="spec-plate-line spec-plate-h-line"
          />
          <line
            x1="378"
            y1="282"
            x2="378"
            y2="430"
            className="spec-plate-line spec-plate-h-line"
          />
          <text
            x="378"
            y="256"
            textAnchor="middle"
            transform="rotate(-90 378 252)"
            className="spec-plate-num"
          >
            <tspan className="spec-plate-num-val">{plate.h}</tspan>
            <tspan className="spec-plate-num-unit" dx="4">
              {plate.unit}
            </tspan>
          </text>
        </g>

        {/* Width dimension — bottom */}
        <g className="spec-plate-w">
          <line
            x1="82"
            y1="462"
            x2="82"
            y2="474"
            className="spec-plate-line spec-plate-tick"
          />
          <line
            x1="318"
            y1="462"
            x2="318"
            y2="474"
            className="spec-plate-line spec-plate-tick"
          />
          <line
            x1="82"
            y1="468"
            x2="172"
            y2="468"
            className="spec-plate-line spec-plate-w-line"
          />
          <line
            x1="228"
            y1="468"
            x2="318"
            y2="468"
            className="spec-plate-line spec-plate-w-line"
          />
          <text
            x="200"
            y="472"
            textAnchor="middle"
            className="spec-plate-num"
          >
            <tspan className="spec-plate-num-val">{plate.w}</tspan>
            <tspan className="spec-plate-num-unit" dx="4">
              {plate.unit}
            </tspan>
          </text>
        </g>

        {/* Gauge label — bottom-left */}
        <g className="spec-plate-gauge">
          <text x="22" y="472" className="spec-plate-gauge-text">
            GAUGE&#8202;·&#8202;{plate.gauge}
          </text>
          <line
            x1="22"
            y1="478"
            x2="60"
            y2="478"
            className="spec-plate-line spec-plate-rule"
          />
        </g>
      </svg>
    </div>
  );
}
