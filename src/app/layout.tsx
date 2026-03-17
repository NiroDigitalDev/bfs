import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Blacks For Sale | The Absence of Light",
  description:
    "Pitch-black paper, obsidian notebooks, and the absolute absence of legible margins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white selection:bg-white selection:text-black`}
        style={{ cursor: "crosshair", overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
