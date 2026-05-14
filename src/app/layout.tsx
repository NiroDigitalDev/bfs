import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Cursor } from "@/components/cursor";
import { Loader } from "@/components/loader";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteChrome } from "@/components/site-chrome";
import { ParallaxRoot } from "@/components/parallax-root";
import { CartDrawer } from "@/components/cart-drawer";
import { CookieBanner } from "@/components/cookie-banner";
import { site, siteUrl } from "@/lib/site";
import { products } from "@/data/products";
import { faqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Stationery",
  keywords: [
    "black notebook",
    "black stationery",
    "black paper",
    "black cardstock",
    "matte black notebook",
    "silver gel pen",
    "white-on-black notebook",
    "minimalist stationery",
    "editorial stationery",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.shareDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.shareDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl,
  logo: `${siteUrl}/opengraph-image`,
  description: site.description,
  slogan: site.tagline,
};

const productCatalogLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${site.name} — Catalogue`,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      "@id": `${siteUrl}/#${p.id}`,
      url: `${siteUrl}/#${p.id}`,
      name: p.title,
      description: p.copy,
      category: "Stationery",
      brand: { "@type": "Brand", name: site.name },
      offers: {
        "@type": "Offer",
        url: `${siteUrl}/#${p.id}`,
        price: p.priceAmount,
        priceCurrency: p.currency,
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

const reviewsLd = testimonials.map((t) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  reviewBody: t.quote,
  author: {
    "@type": "Person",
    name: t.name,
    jobTitle: t.role,
    ...(t.place && t.place !== "—" ? { homeLocation: t.place } : {}),
  },
  itemReviewed: {
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
  },
}));

const faqPageLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    "@id": `${siteUrl}/#faq-${f.index}`,
    url: `${siteUrl}/#faq-${f.index}`,
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${instrument.variable} font-sans antialiased bg-black text-white selection:bg-white selection:text-black`}
      >
        <div className="grain" aria-hidden />
        <Loader />
        <ScrollProgress />
        <ParallaxRoot />
        <Cursor />
        {children}
        <SiteChrome />
        <CartDrawer />
        <CookieBanner />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productCatalogLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
        />
        {reviewsLd.map((r, i) => (
          <script
            key={`review-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(r) }}
          />
        ))}
      </body>
    </html>
  );
}
