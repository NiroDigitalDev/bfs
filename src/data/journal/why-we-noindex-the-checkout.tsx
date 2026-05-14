import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        Some pages are not for the index. The checkout is one of them.
        The cart confirmation is one of them. The 404 is one of them
        though for a different reason. We send <em>noindex</em> on these
        routes the way a press marks a sheet <em>for the binder, not
        the reader</em>. The instruction is not <em>hide</em>. The
        instruction is <em>this surface has a different intent.</em>
      </p>

      <h2>Intent, not access.</h2>
      <p>
        The robots directive is often discussed as a privacy control —
        as if <em>noindex</em> were a way to keep a page out of view.
        It is not. The page is still public; anyone with the URL can
        load it. <em>noindex</em> tells the crawler that the page is
        not the press’s public face, not part of the catalogue, not
        the work the reader is being asked to encounter. It is a
        request that the index reflect the editorial register, not the
        plumbing.
      </p>

      <p>
        On BFS, the routes we mark <em>noindex</em> are{" "}
        <em>/checkout</em>, <em>/checkout/success</em>, and any
        post-purchase confirmation. They are functional surfaces. They
        do not advertise the work. They serve the reader who has
        already decided to receive it.
      </p>

      <blockquote>
        The checkout is not a page the reader was reading. It is a
        room the reader walked into after the reading was done. The
        index should not advertise rooms.
      </blockquote>

      <h2>The architecture of a noindex page.</h2>
      <p>
        Once a page is not for the index, its job changes. It is no
        longer competing with other surfaces for the reader’s arrival.
        It is the surface the reader has already arrived at. The
        copywriting can drop the persuasion register. The display
        type can drop the editorial scale. The page can be a form,
        gracefully set, without apologising for being a form.
      </p>

      <p>
        On <em>/checkout</em> we cut the chapter rail, cut the
        running folio, cut the index trigger, and present the cart
        line items in a tighter ledger style. The hairline rules
        remain — they belong to the press, not to the index — but
        the chrome of the catalogue is set aside. The checkout reads
        as the back room. It is allowed to.
      </p>

      <h3>A note on the 404.</h3>
      <p>
        The 404 is also <em>noindex</em>, but for the opposite reason
        — not because its intent differs from the catalogue, but
        because it has no intent at all. It is the absence of a page.
        It is the only page on the site that exists to acknowledge
        that something was looked for and not found. We let it
        say so plainly. We do not send the crawler to remember it.
      </p>
    </>
  );
}

export const whyWeNoindexTheCheckout: JournalPost = {
  slug: "why-we-noindex-the-checkout",
  title: "Why we noindex the checkout.",
  subtitle: "On robots, intent, and the architecture of pages that are not for the index.",
  excerpt:
    "Some pages are not for the index. Notes on the robots directive as a statement of editorial intent rather than a privacy control, the back-room register of the checkout, and the 404 as the only page that exists to acknowledge an absence.",
  publishedAt: "2026-05-13",
  author: "BFS Editorial",
  tags: ["seo", "architecture", "register"],
  Body,
};
