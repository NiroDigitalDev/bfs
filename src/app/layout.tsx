import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Cursor } from "@/components/cursor";
import { Loader } from "@/components/loader";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

const instrument = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Blacks For Sale — The Absence of Light",
  description:
    "Pitch-black paper, obsidian notebooks, and the absolute absence of legible margins. Stationery for the chromatically committed.",
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
        <Cursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
