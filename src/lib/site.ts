export const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
})();

export const site = {
  name: "Blacks For Sale",
  tagline: "Stationery in the absence of light",
  description:
    "Notebooks, cardstock, and pens engineered around a single hue. Small runs, 48-hour dispatch, for the chromatically committed.",
  shareDescription:
    "An exercise in subtractive design — black-on-black stationery in small runs. (We sell paper, ink, and bound objects. Nothing else.)",
  url: siteUrl,
  edition: "Edition III · MMXXVI",
};
