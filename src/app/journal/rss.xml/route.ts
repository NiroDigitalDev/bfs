import { getAllPosts } from "@/lib/journal";
import { site, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return new Date(0).toUTCString();
  return d.toUTCString();
}

export async function GET() {
  const posts = getAllPosts();
  const channelTitle = `${site.name} · Journal`;
  const channelDescription =
    "Editorial dispatches from the press at Blacks For Sale — notes on monochrome, paper, and the italic.";
  const channelLink = `${siteUrl}/journal`;
  const feedSelf = `${siteUrl}/journal/rss.xml`;
  const lastBuildDate =
    posts.length > 0 ? rfc822(posts[0].publishedAt) : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const postUrl = `${siteUrl}/journal/${p.slug}`;
      return `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${rfc822(p.publishedAt)}</pubDate>
      <author>${xmlEscape(p.author)}</author>
      <description>${xmlEscape(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(channelTitle)}</title>
    <link>${channelLink}</link>
    <atom:link href="${feedSelf}" rel="self" type="application/rss+xml" />
    <description>${xmlEscape(channelDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
