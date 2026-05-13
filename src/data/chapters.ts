export type Chapter = {
  id: string;
  numeral: string;
  label: string;
  folio: string;
};

export const CHAPTERS: Chapter[] = [
  { id: "top", numeral: "I", label: "Atelier", folio: "003" },
  { id: "supplies", numeral: "II", label: "Catalogue", folio: "014" },
  { id: "manifesto", numeral: "III", label: "Position", folio: "038" },
  { id: "cult", numeral: "IV", label: "Cult", folio: "062" },
  { id: "faq", numeral: "V", label: "Notes", folio: "089" },
];
