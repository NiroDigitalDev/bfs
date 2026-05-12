import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "ui-serif, Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          <span>BFS · Vol. III · MMXXVI</span>
          <span>Lat 0° · Lon 0°</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                background: "rgba(255,255,255,0.6)",
                display: "block",
              }}
            />
            Stationery in the absence of light
          </div>
          <div
            style={{
              fontSize: 168,
              lineHeight: 0.95,
              letterSpacing: -3,
              fontWeight: 400,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Dark</span>
            <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>
              Matter.
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 880,
              color: "rgba(255,255,255,0.72)",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Notebooks, cardstock, and pens engineered around a single hue.
            Small runs · 48-hour dispatch.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 16,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          <span>blacksforsale — paper, ink, bound objects.</span>
          <span>100% K</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
