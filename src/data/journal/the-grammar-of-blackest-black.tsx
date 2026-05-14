import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        Vantablack absorbs <em>99.965%</em> of incident light. We mention the
        figure not because it matters, but because the chase for it does. Every
        editorial ground that calls itself black is, in fact, an admission of
        how much light it returns. The admission is the only data point worth
        keeping.
      </p>

      <h2>From Mars to Outrenoir.</h2>
      <p>
        Outrenoir — Pierre Soulages’s term for the black that exceeds black —
        names not a pigment but a surface. Light catches the ridged impasto,
        breaks against the grain, and the eye reads the ridge as a second
        colour entirely. The pigment is unimportant. The decision to leave a
        furrow is everything. We mention this whenever we cut a plate.
      </p>

      <p>
        Mars Black, the iron oxide that ships in every starter kit, is duller
        and more honest than its alternatives. It is opaque, it is forgiving,
        it is patient. We have never used it on a cover. We have used it on
        every proof.
      </p>

      <blockquote>
        A pigment is a promise to a surface. A surface is a promise to a hand.
        Editions are not made out of pigment. Editions are made out of the
        promises we keep when nobody is asked to inspect them.
      </blockquote>

      <h2>The chemistry, briefly.</h2>
      <p>
        Carbon black is soot. Bone black is the burned residue of bone meal.
        Vantablack is an array of vertical carbon nanotubes that traps incoming
        light between its walls until the light is lost as heat. The nanotubes
        are not for sale. We mention them here so that no future reader believes
        we forgot.
      </p>

      <p>
        On the press, every black is a different black. We pull a proof. We
        compare it to the last edition. We discard the proof. We pull again.
        The third pull is usually the keeper. We have never written that down
        until now.
      </p>

      <h3>A note on K100.</h3>
      <p>
        On screen, black is RGB <em>0, 0, 0</em>. In a CMYK workflow, K100 is
        not black either — it is a single-channel proxy for it, and most
        presses overprint it with a 30% cyan rich-black plate to keep the
        surface from drifting toward grey under volume. Edition III is rich.
        Edition II was not. The difference is the press, not the paper.
      </p>
    </>
  );
}

export const theGrammarOfBlackestBlack: JournalPost = {
  slug: "the-grammar-of-blackest-black",
  title: "The grammar of blackest black.",
  subtitle: "On pigment, surface, and the figures nobody owes you.",
  excerpt:
    "Vantablack absorbs 99.965% of incident light. We mention the figure not because it matters, but because the chase for it does. Notes from the press on Outrenoir, Mars, and the third pull.",
  publishedAt: "2026-04-12",
  author: "BFS Editorial",
  tags: ["pigment", "press notes", "edition III"],
  Body,
};
