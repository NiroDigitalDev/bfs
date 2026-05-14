import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        A page with no margin is not a page. It is a poster. Posters are
        excellent at one job and ours is not it. The margin is the only part of
        the page the printer does not get paid for. We treat it as the place
        where the work happens.
      </p>

      <h2>The hairline is not a rule.</h2>
      <p>
        The hairline that opens every chapter is set at <em>0.25pt</em> and
        runs the length of the type column, not the trim. It is not a rule —
        rules close. The hairline is a request, made to the reader, to slow
        down before the first sentence does the slowing for them. We have
        shipped a chapter without a hairline. We have not shipped a chapter
        without a margin.
      </p>

      <p>
        Marginalia, in our editions, is set ragged-right in oldstyle small
        caps at <em>8pt</em>. It carries date stamps, source notes, and the
        editor’s passes. Nothing is set in the margin that the body could not
        carry; everything in the margin is what the body refused to interrupt
        itself for. The distinction is the whole register.
      </p>

      <blockquote>
        The margin is the only part of the page the printer does not pay for.
        Use it as if it were unpaid — because, on the press, it is.
      </blockquote>

      <h2>The § corr. mark.</h2>
      <p>
        Every edition carries a corrigenda margin, marked <em>§ corr.</em>
        beside the line. The mark is not an apology. It is the editor’s record
        that the reading happened, that a second pair of eyes ran along the
        baseline, that the page was held to its own standard before it was
        handed over. Editions without corrigenda are not editions. They are
        manuscripts the press did not have the patience to finish.
      </p>

      <p>
        In Edition III, the § corr. mark appears in the outer margin only. The
        inner margin — the gutter — is reserved. We use it for nothing. We
        protect it from everything. The blank gutter is the only place on the
        page where the press refuses to print, and that refusal is what tells
        the reader the binding will hold.
      </p>

      <h3>A note on the gutter.</h3>
      <p>
        Edition III’s gutter is set to <em>22mm</em>. Tight by stationery
        standards, generous by paperback ones. We have argued about the figure
        for the length of every edition; we will argue about it again. The
        argument is the gutter. The figure is the receipt.
      </p>
    </>
  );
}

export const theMarginAsAGesture: JournalPost = {
  slug: "the-margin-as-a-gesture",
  title: "The margin as a gesture.",
  subtitle: "On marginalia, hairlines, and the § corr. mark.",
  excerpt:
    "A clean page is not an empty page — it is a margin set wide enough to hold an editor’s correction without crowding the line. Notes on hairlines, gutters, and the mark that says we read this.",
  publishedAt: "2026-05-06",
  author: "BFS Editorial",
  tags: ["typography", "marginalia", "edition III"],
  Body,
};
