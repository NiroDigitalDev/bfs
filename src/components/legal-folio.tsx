type Slug = "privacy" | "terms" | "cookies";

const ORDER: Record<Slug, { ord: "i" | "ii" | "iii"; label: string }> = {
  privacy: { ord: "i", label: "Privacy" },
  terms: { ord: "ii", label: "Terms" },
  cookies: { ord: "iii", label: "Cookies" },
};

const TOTAL_ROMAN = "iii";

export function LegalFolio({ slug }: { slug: Slug }) {
  const { ord, label } = ORDER[slug];

  return (
    <aside className="folio" data-variant="legal" aria-hidden>
      <span className="folio-edge folio-edge-left">
        <span className="folio-mark">§</span>
        <span className="folio-slot">
          <span className="folio-label">Statutory</span>
          <span className="folio-sep" aria-hidden>
            ·
          </span>
          <em className="folio-label folio-legal-slug">{label}</em>
        </span>
      </span>
      <span className="folio-edge folio-edge-right">
        <span className="folio-slot">
          <span className="folio-page">p.</span>
          <em className="folio-folio">{ord}</em>
          <span className="folio-sep folio-sep-fraction" aria-hidden>
            /
          </span>
          <em className="folio-folio">{TOTAL_ROMAN}</em>
        </span>
        <span className="folio-sep" aria-hidden>
          ·
        </span>
        <span className="folio-edition">MMXXVI</span>
      </span>
    </aside>
  );
}
