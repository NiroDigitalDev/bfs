import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        A book has a folio because it remembers your hand. The page number is
        not a count — it is the reader’s grip on the spine, the only gesture
        that survives the migration from sheet to screen. We have shipped
        editions whose chapters were unnumbered; we have not shipped one
        whose folio was missing. The folio is the only word on a page that
        knows where it is.
      </p>

      <h2>The chapter rail is a spine.</h2>
      <p>
        On the homepage, the chapter rail runs the height of the viewport,
        set at <em>3.5%</em> width on the left margin, hairlined at the
        top and bottom, with the chapter numeral inset in oldstyle. The rail
        is not navigation. It is a presence. The reader’s eye is meant to
        register it the way a hand registers the spine — without naming it,
        without using it, but without forgetting it is there either.
      </p>

      <p>
        We tried to make the rail clickable. It scrolled. It animated. It
        glowed. We removed every behaviour, one by one, until the rail did
        nothing. It is better silent. The reader knows where they are
        without being asked.
      </p>

      <blockquote>
        A folio is the only word on a page that knows where it is. Trust the
        folio. The reader’s thumb does.
      </blockquote>

      <h2>The running folio is a horizon.</h2>
      <p>
        Across every route, the running folio sits at the bottom-right of
        the viewport, set in oldstyle at <em>9pt</em>, paired with the
        volume’s roman numeral in small caps. It updates on scroll: not as a
        counter, but as a horizon line — the reader is always somewhere,
        always between, always between an opening and a closing the layout
        has agreed to acknowledge.
      </p>

      <p>
        We chose the bottom-right against the convention. Most pages run the
        folio centred, or in the running header. Centred reads as a chapter
        opener. Headers compete with the title. The bottom-right is what
        the eye lands on when the page finishes — it is the receipt. We have
        run it elsewhere. We have come back.
      </p>

      <h3>A note on the scroll.</h3>
      <p>
        Scroll is not a page-turn. Scroll is the metaphor we inherited from
        terminals and never argued with. The folio, on the chrome, is the
        only piece of the layout that pretends otherwise — it advances in
        discrete steps, snapping at each chapter boundary, refusing to
        update continuously. The refusal is the page-turn. The rest is
        scroll. The folio is the only part of BFS that still keeps a book’s
        time.
      </p>
    </>
  );
}

export const theFolioAsAnInstrument: JournalPost = {
  slug: "the-folio-as-an-instrument",
  title: "The folio as an instrument.",
  subtitle: "Chapter rails, running folios, and the scroll-as-page-turn.",
  excerpt:
    "A page number is not a page number — it is the reader’s grip on the spine, the only gesture that survives the migration from sheet to screen. Notes on chapter rails, running folios, and what BFS’s chrome makes of the page-turn.",
  publishedAt: "2026-05-14",
  author: "BFS Editorial",
  tags: ["typography", "chrome", "folio"],
  Body,
};
