import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        The brief was <em>make it legible at night</em>. We almost obeyed.
        Pure white on pure black is a screen test, not a register. We
        followed the brief halfway. The half we kept is what makes the page
        readable after forty minutes; the half we discarded is what would
        have made it readable for four.
      </p>

      <h2>Why pure white fails.</h2>
      <p>
        At a contrast ratio of <em>21:1</em>, white type on black ground
        produces a halation around each letterform — the light spills, the
        edges feather, and the eye fatigues faster than it would on a sheet
        of newsprint under a desk lamp. The figure is not theoretical. We
        proofed Edition II at <em>#ffffff</em>. Returning readers told us
        the type vibrated. They did not use the word halation. They used
        the word headache.
      </p>

      <p>
        The fix is not contrast reduction. The fix is the right white. We
        moved from <em>#ffffff</em> to a paper-warm cream — <em>#ece9df</em>
        — and the vibration stopped. The ratio dropped to <em>17.4:1</em>,
        which still clears every accessibility floor and still reads as
        bright on the matte ground. The page stopped vibrating. The reader
        stopped flinching.
      </p>

      <blockquote>
        Black wants company. White is too eager. The right white is the one
        that arrives a step behind.
      </blockquote>

      <h2>The dim accent.</h2>
      <p>
        The accent palette — used for chapter numerals, the corrigenda mark,
        the cursor, and the cart total — is set at <em>#c7c4b7</em>. Dimmer
        than the body, dimmer than the chrome, dim enough that the reader
        registers it as a second voice and not as a duplicate of the first.
        Two whites on a black ground sound, at first, like a mistake. They
        are not. They are the difference between a page that speaks and a
        page that announces.
      </p>

      <p>
        Display type — chapter openers, the volume title, the running folio
        — is set in the body white. The accent white is reserved for
        marginalia and metadata. We have never run display in the accent.
        We have never run a folio in the body white. The two whites do not
        cross.
      </p>

      <h3>A note on the cursor.</h3>
      <p>
        The custom cursor on the editorial chrome is the accent white at
        <em>40%</em> opacity, with a hairline ring at the body white. The
        configuration is deliberate: the cursor is a second presence on the
        page, not a third. If it were the body white it would compete with
        the type; if it were the accent it would disappear against the
        marginalia. The compromise is the only honest choice the layout
        allows.
      </p>
    </>
  );
}

export const letterformsInLowLight: JournalPost = {
  slug: "letterforms-in-low-light",
  title: "Letterforms in low light.",
  subtitle: "On halation, the dim accent, and the case against pure white.",
  excerpt:
    "Pure white on pure black is a screen test, not a register. Notes from the proofing table on what a high-contrast page costs the eye over forty minutes — and the two whites we use instead.",
  publishedAt: "2026-05-11",
  author: "BFS Editorial",
  tags: ["typography", "display", "press notes"],
  Body,
};
