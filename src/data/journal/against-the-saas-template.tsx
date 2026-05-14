import type { JournalPost } from "@/lib/journal";

function Body() {
  return (
    <>
      <p>
        Every site is the same site now. A hero with two lines and a
        CTA. Three cards under it explaining how the product is
        different. A scrolling logo bar of companies the founder once
        had coffee with. A pricing table with three columns. A
        testimonial in italics with a circular avatar. A footer with{" "}
        <em>Product · Company · Resources · Legal</em>. We have all
        seen this site. We are tired of it. We are also tired of
        complaining about it. So this is the last time we will.
      </p>

      <h2>The agency three-card is a stage direction, not a page.</h2>
      <p>
        The three-card pattern is a stage cue inherited from
        presentation software. The presenter says <em>three things</em>{" "}
        and the audience nods because three is the number that lets the
        speaker sit down. On a webpage there is no speaker and no
        audience and no chairs. The three cards are sitting on stage
        in front of an empty room. They are explaining the product to
        no one. Most of them say <em>Fast</em>, <em>Beautiful</em>, and{" "}
        <em>Easy</em>. They could be removed without consequence and
        nothing about the work would change.
      </p>

      <p>
        We have not used three cards on the homepage. We do not have
        three cards anywhere on the site. If we did, the cards would
        not be cards. They would be a paragraph. The paragraph would
        say what the cards say without the cards.
      </p>

      <blockquote>
        The hero is a billboard. The pricing table is a menu. The
        testimonials are a focus group with their faces shown. None of
        these are editorial decisions. They are operations decisions.
      </blockquote>

      <h2>The hero-features-pricing reflex.</h2>
      <p>
        The reflex is so embedded that the brief, when it arrives, is
        often written in its grammar — <em>“hero section, then features,
        then pricing, then testimonials, then FAQ.”</em> The brief is not
        wrong. It is a transcription of every site the brief writer has
        seen. The work is to write a different brief. The work is to
        notice that <em>features</em> is a word that lives only in
        software-marketing and never appears in a book, a poster, a
        catalogue, a record sleeve, a press release, a letter, a poem,
        or any other surface that has ever asked someone to look at it
        for more than four seconds.
      </p>

      <p>
        The replacement is not <em>seven cards instead of three</em>{" "}
        and it is not <em>a video</em>. The replacement is a page that
        reads. Read pages have an opening. They have a body. They have
        a coda. They have asides set in a smaller scale. They have
        rules that separate the asides from the body. They have a folio.
        They are not flat. They have a hand.
      </p>

      <h3>A note on the alternative.</h3>
      <p>
        We are not the alternative. We are one alternative. The
        alternative we are has italic-serif display, hairline rules, a
        chapter rail, a running folio, a catalogue, a manifesto, a
        journal, and a cart. It has no three cards. It has no
        scrolling logo bar. It has no <em>Get started</em>. It has, on
        the way out, a colophon and a newsletter that admits it is a
        newsletter. The reader knows what they are reading. The reader
        knows when it ends.
      </p>
    </>
  );
}

export const againstTheSaasTemplate: JournalPost = {
  slug: "against-the-saas-template",
  title: "Against the SaaS template.",
  subtitle: "Hero, three cards, pricing table, footer — the page that everyone is tired of.",
  excerpt:
    "A short manifesto against the hero-features-pricing reflex. Notes on the three-card stage direction, the word ‘features’ as a software-marketing tic, and the catalogue-and-manifesto page we keep writing instead.",
  publishedAt: "2026-05-04",
  author: "BFS Editorial",
  tags: ["manifesto", "design", "register"],
  Body,
};
