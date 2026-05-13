export type Testimonial = {
  roman: "I" | "II" | "III" | "IV";
  fig: string;
  quote: string;
  name: string;
  role: string;
  place: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    roman: "I",
    fig: "Fig. I",
    quote:
      "Wrote a thesis on The Void Book with a white gel pen. My supervisor called it hostile to read. She also gave it her highest mark of the year.",
    name: "Edgar A.",
    role: "Doctoral candidate",
    place: "Stockholm",
  },
  {
    roman: "II",
    fig: "Fig. II",
    quote:
      "Typed the URL prepared for a federal warning. Received instead some very expensive notebooks. I am, on balance, relieved.",
    name: "Sarah T.",
    role: "First-time visitor",
    place: "—",
  },
  {
    roman: "III",
    fig: "Fig. III",
    quote:
      "Tried the Abyssal cards on the office laser printer. The fire brigade were patient. The remaining cards look magnificent.",
    name: "Marcus D.",
    role: "Designer",
    place: "Berlin",
  },
  {
    roman: "IV",
    fig: "Fig. IV",
    quote:
      "My therapist suggested keeping a journal. She did not specify legibility. This is, technically, a journal.",
    name: "Naomi K.",
    role: "Architect",
    place: "Kyoto",
  },
] as const;
