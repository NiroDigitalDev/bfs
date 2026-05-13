import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        Black is not the absence of colour. It is the presence of a decision
        already made. Every page in this volume begins with that decision and
        works outward — pen, plate, binding, dispatch — until the object holds.
      </p>

      <h2>The single hue, examined</h2>
      <p>
        We do not stock white paper. We do not stock cream, eggshell, parchment,
        or the pale woven stocks favoured by stationers who are unwilling to
        commit. The catalogue is monochromatic by intention. Each title sets a
        slightly different optical mass — matte for the void book, calendered
        for the cardstock, soft-rolled for the pad — and together they form a
        register, not a palette.
      </p>

      <blockquote>
        A page that admits no light still holds an edge, a weight, a sound under
        the nib. The single hue is not a limit. It is a metric.
      </blockquote>

      <p>
        On a screen, black is RGB <em>0, 0, 0</em>. On paper, it is whatever the
        ink decides — and ink decides differently from one batch to the next.
        Our press notes for Edition III record three pulls of the same line
        plate, each measured at 100% K and each producing a perceptibly
        different black. We kept the second.
      </p>

      <h2>Notes on a single hue</h2>
      <p>
        The italic in the running titles of this volume is set in Instrument
        Serif, drawn by Rodrigo Fuenzalida and licensed via SIL. The Roman is
        not used; every display rule in the journal is italic by default. This
        is a typographic decision, not a stylistic flourish — the italic carries
        editorial voice, the Roman carries instruction, and the journal is here
        for voice.
      </p>
    </>
  );
}

export const voliiiNo1: JournalPost = {
  slug: "vol-iii-no-1-the-typography-of-black",
  title: "The typography of black.",
  subtitle: "Notes on a single hue.",
  excerpt:
    "Black is not the absence of colour — it is the presence of a decision already made. Notes from the press on what a monochromatic catalogue actually demands of paper, ink, and the italic.",
  publishedAt: "2026-05-13",
  author: "BFS Editorial",
  tags: ["typography", "edition III", "press notes"],
  Body,
};
