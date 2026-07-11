export type PortfolioCategory = {
  slug: string;
  name: string;
  description: string;
  legacyPaths: string[];
};

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "zardozi",
    name: "Zardozi",
    description:
      "Metallic gold threadwork rooted in centuries of courtly craft, stitched by master karigars for couture and bridal surfaces.",
    legacyPaths: ["/zardozi"],
  },
  {
    slug: "sequin",
    name: "Sequin",
    description:
      "Thousands of hand-stitched sequins catching couture light with every movement, from dense shimmer to delicate scattered highlights.",
    legacyPaths: ["/sequin"],
  },
  {
    slug: "crystal-stone-work",
    name: "Crystal & Stone Work",
    description:
      "Hand-set crystals, stones, cutdana and beads for couture brilliance, texture, and precise light-play.",
    legacyPaths: ["/crystal-stone"],
  },
  {
    slug: "resham-zari",
    name: "Resham & Zari",
    description:
      "Fine silk resham and luminous zari threads arranged into intricate patterns, borders, florals, and surface studies.",
    legacyPaths: ["/resham-zari"],
  },
  {
    slug: "pearl-work",
    name: "Pearl Work",
    description:
      "Glass pearls, seed beads, and dimensional bead compositions hand-stitched for bridal and couture embellishment.",
    legacyPaths: ["/pearl-work"],
  },
  {
    slug: "couture-studies",
    name: "Couture Studies",
    description:
      "Selected atelier archive pieces, accessories, gowns, veils, and process studies beyond a single technique.",
    legacyPaths: [],
  },
  {
    slug: "other",
    name: "Other",
    description:
      "Additional bespoke embroidery references and atelier experiments.",
    legacyPaths: [],
  },
];

const aliases: Record<string, string> = {
  zardozi: "zardozi",
  zardosi: "zardozi",
  sequin: "sequin",
  sequins: "sequin",
  "crystal stone": "crystal-stone-work",
  "crystal & stone": "crystal-stone-work",
  "crystal & stone work": "crystal-stone-work",
  crystal: "crystal-stone-work",
  stone: "crystal-stone-work",
  "resham zari": "resham-zari",
  "resham & zari": "resham-zari",
  pearl: "pearl-work",
  "pearl work": "pearl-work",
  couture: "couture-studies",
  "couture studies": "couture-studies",
  other: "other",
};

export function slugifyPortfolioTag(tag: string): string {
  const normalized = tag
    .replace(/^.*?·\s*/u, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  if (aliases[normalized]) return aliases[normalized];

  if (normalized.includes("zardozi") || normalized.includes("zardosi")) return "zardozi";
  if (normalized.includes("sequin")) return "sequin";
  if (normalized.includes("crystal") || normalized.includes("stone")) return "crystal-stone-work";
  if (normalized.includes("resham") || normalized.includes("zari")) return "resham-zari";
  if (normalized.includes("pearl")) return "pearl-work";

  return normalized
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "other";
}

export function categoryForTag(tag: string) {
  const slug = slugifyPortfolioTag(tag);
  return portfolioCategories.find((category) => category.slug === slug) ?? portfolioCategories.at(-1)!;
}

export function categoryBySlug(slug: string) {
  return portfolioCategories.find((category) => category.slug === slug);
}

