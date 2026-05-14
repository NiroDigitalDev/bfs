export type ProductId =
  | "void-book"
  | "abyssal-cardstock"
  | "event-horizon-pad"
  | "sticky-voids"
  | "savior-pen"
  | "executive-despair";

export type PlateSpec = {
  fig: string;
  w: string;
  h: string;
  unit: "mm" | "in";
  gauge: string;
  azimuth: number;
};

export type Product = {
  id: ProductId;
  chapter: string;
  title: string;
  subtitle: string;
  price: string;
  priceAmount: number;
  currency: "USD";
  spec: string;
  copy: string;
  tags: string[];
  plate: PlateSpec;
  pressNotes: string[];
  careNote: string;
};

export const products: Product[] = [
  {
    id: "void-book",
    chapter: "001",
    title: "The Void Book",
    subtitle: "A5 · Unlined",
    price: "$34",
    priceAmount: 34,
    currency: "USD",
    spec: "120 GSM · LAY-FLAT · 192 PP",
    copy:
      "Hardbound A5. One hundred and ninety-two pages of matte coated black, calibrated to refuse reflectance. Unlined, unmargined, unsentimental.",
    tags: ["core series", "48h dispatch"],
    plate: { fig: "I", w: "148", h: "210", unit: "mm", gauge: "120 g/m²", azimuth: 6 },
    pressNotes: [
      "We tested seven stocks before settling on this one. The matte coat is calibrated to absorb the room, not to mirror it; the page reads as a held breath, not a polished surface.",
      "Smyth-sewn signatures lay flat under the hand. The spine resists fanning; the cover refuses fingerprints with a soft varnish that reads as nothing at all.",
      "We bind these books in runs of 250. The first twelve copies are kept in the studio against the day the press needs to remember what it once made.",
    ],
    careNote: "Keep dry · Avoid open sun · Open at room temperature",
  },
  {
    id: "abyssal-cardstock",
    chapter: "002",
    title: "Abyssal Cardstock",
    subtitle: "A4 · Dyed Through",
    price: "$45",
    priceAmount: 45,
    currency: "USD",
    spec: "500 GSM · 50 SHEETS",
    copy:
      "Fifty sheets, dyed through the core. Heavy enough to register as material. Feed it by hand or feed it to the laser. Either is permitted.",
    tags: ["heavy stock"],
    plate: { fig: "II", w: "210", h: "297", unit: "mm", gauge: "500 g/m²", azimuth: 32 },
    pressNotes: [
      "Dyed through the core, not surface-coated. The black does not fail under a knife edge, a laser cut, or a steady hand with a folding bone.",
      "Five hundred grams per square metre is the threshold at which paper begins to register as material. Below it, you are pressing against air; above it, you have entered the territory of board.",
      "Cut to A4 and stacked in fifty-sheet bundles. The studio uses these for trial spreads and edition prototypes; you may, too.",
    ],
    careNote: "Avoid moisture · Stack flat · Cut with a fresh blade",
  },
  {
    id: "event-horizon-pad",
    chapter: "003",
    title: "Event Horizon Pad",
    subtitle: "Top-Bound",
    price: "$28",
    priceAmount: 28,
    currency: "USD",
    spec: "160 GSM · 40 LEAVES",
    copy:
      "Top-bound forty-leaf pad with a tooth ground for pastel, charcoal, and gouache. Twin-loop wire. Quietly demanding of the hand holding it.",
    tags: ["studio"],
    plate: { fig: "III", w: "190", h: "260", unit: "mm", gauge: "160 g/m²", azimuth: 348 },
    pressNotes: [
      "The tooth was ground over four passes, then sealed against the breath of the room. Pastel anchors. Charcoal lifts cleanly. Gouache stays where it is set.",
      "Top-bound on twin-loop wire. The leaves tear at a single perforation line; the pad survives the studio season without the cover collapsing under its own habit.",
      "Forty leaves is enough for a series. The cover stock at 350 grams carries the pad in a flat case without complaint.",
    ],
    careNote: "Store flat · Avoid humidity · Spray fixative for charcoal",
  },
  {
    id: "sticky-voids",
    chapter: "004",
    title: "Sticky Voids",
    subtitle: "Triptych",
    price: "$15",
    priceAmount: 15,
    currency: "USD",
    spec: "3 × 3 IN · 3 × 100",
    copy:
      "Three pads, one hundred leaves each, three inches square. High-tack adhesive, low-residue release. Instruction for those who already understood.",
    tags: ["low-volume"],
    plate: { fig: "IV", w: "76", h: "76", unit: "mm", gauge: "70 g/m²", azimuth: 90 },
    pressNotes: [
      "High-tack adhesive, low-residue release. Applied to glass, varnished wood, or a fellow page, they hold without leaving permanence behind.",
      "Three pads at three inches square. The number is arbitrary; the proportions are not.",
      "Loaded with a seventy-gram stock that takes pigment ink, ballpoint, and graphite without bleed-through — the press tested it on its own paper first.",
    ],
    careNote: "Stack flat · Avoid direct heat · Use within twelve months for best tack",
  },
  {
    id: "savior-pen",
    chapter: "005",
    title: "The Savior Pen",
    subtitle: "Rollerball",
    price: "$12",
    priceAmount: 12,
    currency: "USD",
    spec: "0.5 MM · SILVER PIGMENT",
    copy:
      "A 0.5 mm rollerball loaded with opaque silver-pigment gel. Acid-free, archival, calibrated for our paper and tolerant of yours.",
    tags: ["pairs with 001"],
    plate: { fig: "V", w: "140", h: "11", unit: "mm", gauge: "0.5 mm", azimuth: 305 },
    pressNotes: [
      "Silver-pigment gel in a half-millimetre rolling ball. Acid-free, archival, calibrated against the paper we make and patient with the paper you have on hand.",
      "The barrel is matte enamel over brushed aluminium; the clip is removable. The pen does not pretend to be a fountain pen, and we will not lie about it.",
      "Refills are forthcoming. Until then, each pen carries enough ink to last a long argument with the page.",
    ],
    careNote: "Cap firmly between strokes · Store horizontal in a closed drawer",
  },
  {
    id: "executive-despair",
    chapter: "006",
    title: "Executive Despair",
    subtitle: "Annual",
    price: "$42",
    priceAmount: 42,
    currency: "USD",
    spec: "UNDATED · 52 SPREADS",
    copy:
      "Undated weekly. Fifty-two spreads deboss-struck at ninety percent K on one hundred gsm black. Bordeaux foil along the spine. Plans persist on faith.",
    tags: ["limited"],
    plate: { fig: "VI", w: "165", h: "240", unit: "mm", gauge: "100 g/m²", azimuth: 175 },
    pressNotes: [
      "Undated weekly. We do not number the years; the year arrives with whatever conviction it has.",
      "Each spread is deboss-struck at ninety percent K on hundred-gram black stock. The press leaves a visible impression you can read with the fingertips.",
      "Bordeaux foil along the spine — the only colour we permit. Plans persist on faith; the foil makes that visible.",
    ],
    careNote: "Keep dry · Avoid open sun · Foil does not require buffing",
  },
];
