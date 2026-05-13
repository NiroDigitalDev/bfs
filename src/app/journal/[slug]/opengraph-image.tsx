import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import {
  formatJournalDate,
  getAllPosts,
  getPostBySlug,
  getPostIndex,
  romanNumeral,
} from "@/lib/journal";
import { site } from "@/lib/site";

export const alt = "Journal piece · Blacks For Sale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function JournalPostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const numeral = romanNumeral(getPostIndex(post.slug));
  const dateLabel = formatJournalDate(post.publishedAt);

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
          <span>Journal · Piece {numeral}</span>
          <span>{dateLabel}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
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
            Editorial dispatch
          </div>
          <div
            style={{
              fontSize: 124,
              lineHeight: 0.95,
              letterSpacing: -3,
              fontWeight: 400,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.92)",
              display: "flex",
              maxWidth: 1040,
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              width: 240,
              height: 1,
              background: "rgba(255,255,255,0.32)",
            }}
          />
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 880,
              color: "rgba(255,255,255,0.72)",
              fontStyle: "italic",
            }}
          >
            {post.subtitle}
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
          <span>{site.name} · By {post.author}</span>
          <span>{site.edition}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
