import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        Every dispatch leaves the studio sealed. Not because the paper inside
        is fragile — it is not — but because the seal is the last thing the
        press does, and the last thing the press does is the first thing the
        reader sees. The order matters more than the wax.
      </p>

      <h2>The hairline before the seal.</h2>
      <p>
        Before any wax is applied, a single hairline rule is drawn in matte
        black across the envelope. The rule is <em>0.5pt</em>. It is set 28mm
        from the upper edge. It is not decorative. It exists so the seal has a
        register to violate.
      </p>

      <p>
        A seal applied to an unruled envelope reads as a thumbprint. A seal
        applied against a hairline reads as an editorial mark. We have shipped
        editions with no wordmark on the dispatch label. We have never shipped
        one without the hairline.
      </p>

      <blockquote>
        The dispatch is the only chapter most readers will encounter twice —
        once on opening, once on closing. The closing version is the version we
        work hardest on.
      </blockquote>

      <h2>The wax itself.</h2>
      <p>
        Edition III uses a low-shrink wax that holds against humidity and fails
        cleanly under a knife. The colour is <em>noir d’imprimerie</em>, which
        is to say the same black as the press, which is to say the same black
        as everything else we ship. We do not stock a red wax. There has never
        been a request.
      </p>

      <p>
        The stamp is a quartered crest with the press monogram in the lower
        left and the edition numeral in the upper right. The other two quarters
        are blank. They are blank on purpose. The empty quarter is the part of
        the gesture that does not have to explain itself.
      </p>

      <h3>A note on the knife.</h3>
      <p>
        We ship every order with a paper knife pressed into the inner flap of
        the dispatch. It is not a souvenir; it is a refusal to ship a sealed
        envelope a reader cannot open with grace. The knife is included even
        when the order is a refill of pens. There is no surcharge. It will not
        appear on the invoice.
      </p>
    </>
  );
}

export const onTheSealOfADispatch: JournalPost = {
  slug: "on-the-seal-of-a-dispatch",
  title: "On the seal of a dispatch.",
  subtitle: "The hairline, the wax, and the knife included.",
  excerpt:
    "Every dispatch leaves the studio sealed. Notes on the hairline rule that precedes the wax, the colour we did not pick, and the paper knife the invoice never mentions.",
  publishedAt: "2026-05-03",
  author: "BFS Editorial",
  tags: ["dispatch", "ritual", "edition III"],
  Body,
};
