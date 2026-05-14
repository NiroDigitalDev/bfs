import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        An edition is a promise that something will end. The press that
        prints to demand prints forever — every order is a fresh sheet,
        every fresh sheet a small denial that the work was finished when
        it was finished. We cap the run because the cap is the work. A
        book that can be reprinted indefinitely is not a book. It is a
        ticker.
      </p>

      <h2>The cap is a deadline turned outward.</h2>
      <p>
        Most editions are sized to a forecast. Forecasts are private; the
        deadline they impose on the press is invisible to the reader.
        Capping the edition turns the deadline outward — the reader is
        now inside the same scarcity the typesetter knew at the bench.
        The 200 sounds like marketing. It is not. It is the number above
        which the binder had said no.
      </p>

      <p>
        We have shipped editions of <em>200</em>, of <em>120</em>, of{" "}
        <em>40</em>. The <em>40</em> ran out in a week and the email
        about it arrived from a stationer who had been refreshing the
        page hourly. We did not reprint. We do not reprint. The
        stationer wrote a second email, kinder than the first, and we
        kept that one in a folder we no longer open.
      </p>

      <blockquote>
        The reprint is the press telling the edition it was wrong. We do
        not tell the edition it was wrong. We let it be the edition.
      </blockquote>

      <h2>Dispatch is the commitment.</h2>
      <p>
        Inventory, in the open-fulfilment model, is theoretical until
        ordered. In the editioned model, inventory is a stack on a
        shelf in a room we have walked through. The number on the
        product page is not a database row — it is the count we got
        when we last walked through. When it reads <em>03 of 40</em>,
        three were sealed yesterday and the rest are still on the
        plate.
      </p>

      <p>
        We dispatch within forty-eight hours because we have already
        cut the paper. We cut the paper because the edition is closed.
        The 48-hour window is not a service level. It is the only
        window in which the work the edition forced is still warm. We
        keep that window because closing it would mean we are pretending
        to be a bigger press.
      </p>

      <h3>A note on the unsold copies.</h3>
      <p>
        Editions sometimes end with copies the press keeps. These are
        the proofs, the binder’s shelves, the two copies the editor
        will not part with. They are not sold later under a quieter
        SKU. They are not raffled. They are not reprinted as a second
        run. They sit on the shelf above the bench and the press
        accepts the loss the way a printer accepts the makeready
        sheets — as the cost of having had the run at all.
      </p>
    </>
  );
}

export const thePhysicsOfAnEdition: JournalPost = {
  slug: "the-physics-of-an-edition",
  title: "The physics of an edition.",
  subtitle: "On capped runs, dispatch as commitment, and the reprint we will not make.",
  excerpt:
    "An edition is a promise that something will end. Notes on capped print runs, the 48-hour dispatch as the only window the work the edition forced is still warm, and the reprint we will not make.",
  publishedAt: "2026-04-19",
  author: "BFS Editorial",
  tags: ["edition", "dispatch", "commitment"],
  Body,
};
