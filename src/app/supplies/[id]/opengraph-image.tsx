import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export const alt = `${site.name} · Plate`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductOgImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

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
          <span>BFS · Plate {product.plate.fig}</span>
          <span>Folio · {product.chapter}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
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
            {product.subtitle}
          </div>
          <div
            style={{
              fontSize: 138,
              lineHeight: 0.95,
              letterSpacing: -3,
              fontWeight: 400,
              fontStyle: "italic",
              display: "flex",
              maxWidth: 1040,
            }}
          >
            {product.title}.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.35,
              maxWidth: 880,
              color: "rgba(255,255,255,0.72)",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {product.copy}
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
          <span>{product.spec}</span>
          <span>{product.price} · 48-hour dispatch</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
