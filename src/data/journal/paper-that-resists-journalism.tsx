import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        Newsprint is a confession. Every fibre is a confession to the editor’s
        deadline, the printer’s roller, the reader’s bin. We have nothing
        against newsprint. We just refuse to ship anything that is going to
        confess.
      </p>

      <h2>Density as a register.</h2>
      <p>
        The void book is set on <em>240gsm</em> uncoated. The cardstock pulls a
        hair denser. The pad’s softness comes from a 180gsm roll-finished sheet
        that takes a pen at full pressure without rebound. These figures live
        in the colophon for each edition; we restate them here because density
        is the only paper specification that affects voice.
      </p>

      <p>
        A thin paper crackles when it turns. It announces every page. It
        reminds the reader that they are reading. A dense paper, by contrast,
        offers no audible feedback. It absorbs ink and intent in the same
        gesture. The book closes without ceremony. The reader stops reading
        because the work has ended, not because the page has run out.
      </p>

      <blockquote>
        Paper does not whisper. Paper either talks too much or is quiet.
        Stationery is the discipline of choosing quiet.
      </blockquote>

      <h2>What “uncoated” means here.</h2>
      <p>
        Coated stocks reflect. They are the right answer for halftone
        photography and the wrong answer for typography on a matte ground. Our
        stock is uncoated because we have nothing photographed to reproduce.
        The image is the type. The type is the image. The reflection would be
        a third party we did not invite.
      </p>

      <p>
        We also do not specify whiteness. The closest most stationers come to
        “matte” is a cool-white uncoated that still throws back enough light to
        fatigue the eye over an evening. Our stock is rolled <em>black</em>.
        The fatigue is on us, not the reader.
      </p>

      <h3>A note on the deckle.</h3>
      <p>
        The torn edge of a deckle sheet is an aesthetic choice, not a quality
        marker — most stationers paying for deckle are paying for the feeling
        of an older press, not the work of one. Our sheets are cut clean.
        Edition III’s edge is the same edge for every copy. We have other
        places to spend the romance.
      </p>
    </>
  );
}

export const paperThatResistsJournalism: JournalPost = {
  slug: "paper-that-resists-journalism",
  title: "Paper that resists journalism.",
  subtitle: "On density, uncoated stocks, and the silence of a dense sheet.",
  excerpt:
    "Newsprint is a confession. Notes on stock weight, opacity, and the case for paper that absorbs without commenting — including why the deckle is a romance we no longer keep.",
  publishedAt: "2026-04-26",
  author: "BFS Editorial",
  tags: ["paper", "press notes", "edition III"],
  Body,
};
