import type { ReactNode } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/magnetic";
import { site } from "@/lib/site";

type LegalPageFrameProps = {
  slug: "privacy" | "terms" | "cookies";
  title: string;
  eyebrow: string;
  lede: string;
  revised: string;
  children: ReactNode;
};

export function LegalPageFrame({
  slug,
  title,
  eyebrow,
  lede,
  revised,
  children,
}: LegalPageFrameProps) {
  return (
    <main className="journal legal-page" data-page={slug}>
      <nav className="nav journal-nav">
        <Link
          href="/"
          className="nav-logo"
          data-cursor="link"
          aria-label={site.name}
        >
          <span className="nav-logo-mark" aria-hidden>
            ■
          </span>
          <span>{site.name}</span>
          <span className="nav-logo-sub">Vol. III · MMXXVI</span>
        </Link>
        <div className="nav-center">
          <div className="nav-links">
            <Link href="/journal" data-cursor="link">
              <span className="nav-num">·</span> Journal
            </Link>
            <Link href="/#supplies" data-cursor="link">
              <span className="nav-num">01</span> Catalogue
            </Link>
            <Link href="/#manifesto" data-cursor="link">
              <span className="nav-num">02</span> Position
            </Link>
            <Link href="/#cult" data-cursor="link">
              <span className="nav-num">03</span> Field Notes
            </Link>
          </div>
        </div>
      </nav>

      <nav className="journal-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link
              href="/"
              className="journal-breadcrumb-link"
              data-cursor="link"
            >
              <span className="journal-breadcrumb-arrow" aria-hidden>
                ←
              </span>
              <em>Vol. III · The Press</em>
            </Link>
          </li>
          <li aria-current="page" className="journal-breadcrumb-current">
            <span aria-hidden> / </span>
            <span>{title}</span>
          </li>
        </ol>
      </nav>

      <header className="journal-header legal-header">
        <span className="journal-eyebrow">
          <span className="journal-eyebrow-rule" aria-hidden />
          <em>{eyebrow}</em>
        </span>
        <h1 className="legal-display">
          <em>{title}</em>
          <span className="legal-display-period" aria-hidden>
            .
          </span>
        </h1>
        <p className="journal-lede">{lede}</p>
        <p className="legal-revised">
          <em>Last revised · {revised}</em>
        </p>
      </header>

      <article className="journal-prose legal-prose">{children}</article>

      <footer className="legal-page-foot">
        <Magnetic strength={0.18}>
          <Link
            href="/"
            className="journal-post-return"
            data-cursor="link"
            data-cursor-label="Back"
          >
            <span className="journal-post-return-arrow" aria-hidden>
              ←
            </span>
            <em>Return to the volume</em>
          </Link>
        </Magnetic>
        <span className="journal-post-signoff">
          <em>{site.edition}</em>
        </span>
      </footer>
    </main>
  );
}
