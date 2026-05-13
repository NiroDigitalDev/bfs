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
  },
];
