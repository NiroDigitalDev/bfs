import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        Lining figures sit upright on the baseline. Oldstyle figures rise and
        fall like lowercase letters. Most readers do not name the difference;
        every reader feels it. A press that picks the wrong register is a
        press that has stopped listening to its own pages.
      </p>

      <h2>Running prose wants the descent.</h2>
      <p>
        In a paragraph set at <em>17pt</em>, lining figures stand up like
        capitals. The eye reads them as proper nouns. A date set <em>1947</em>
        in lining figures interrupts the line the way a surname interrupts a
        list. The fix is oldstyle — figures that descend below the baseline,
        that ride alongside the lowercase, that do not announce themselves
        until they need to.
      </p>

      <p>
        Edition III’s body text is Instrument Serif at <em>17.25pt</em> with
        oldstyle numerals enabled at the font-feature level. The first proof
        had the figures lining; the page felt rude. We did not write that
        down. We changed the feature setting, pulled the proof again, and
        the rudeness was gone. We have not gone back.
      </p>

      <blockquote>
        Numerals are not the count. Numerals are the cadence of the count.
      </blockquote>

      <h2>Tabular columns want the rigour.</h2>
      <p>
        Footnotes, page counts, the colophon’s pressed-figure column — all of
        these get lining figures, tabular spacing, and the small caps that
        ride alongside. The reason is not aesthetic. It is alignment. A
        tabular column of oldstyle figures shudders under the eye; the
        ascenders disagree, the descenders bicker, the totals stop reading as
        totals. The page begins to argue with itself.
      </p>

      <p>
        The rule, then: prose gets oldstyle, anything that has to add up gets
        lining. The colophon is the only page where both appear, and the
        adjacency is deliberate. The lining column is the receipt. The
        oldstyle paragraph above it is what the receipt is for.
      </p>

      <h3>A note on the small caps that ride alongside.</h3>
      <p>
        Small caps in our editions are drawn, not synthesised — Instrument
        Serif ships its own and we use them. They sit at <em>72%</em> of the
        cap height, and they are paired with oldstyle figures in marginalia,
        with lining figures in the colophon. The register is mixed on
        purpose. We tell the reader, by the figure, where on the page they
        are reading. They do not have to know that we are telling them.
      </p>
    </>
  );
}

export const oldstyleNumeralsVersusLining: JournalPost = {
  slug: "oldstyle-numerals-versus-lining",
  title: "Oldstyle numerals versus lining.",
  subtitle:
    "When each register works, and what the wrong choice costs the page.",
  excerpt:
    "Lining figures sit upright on the baseline. Oldstyle figures rise and fall like lowercase letters. Notes on which register belongs in running prose, which belongs in the colophon, and what happens when a press picks wrong.",
  publishedAt: "2026-05-09",
  author: "BFS Editorial",
  tags: ["typography", "numerals", "edition III"],
  Body,
};
