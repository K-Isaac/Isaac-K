import type { Institution } from "./types";

export const institutions: Institution[] = [
  { id: "icrw", name: "International Center for Research on Women", short: "ICRW", relatedProjectIds: ["behind-the-scenes-rwanda", "behind-the-scenes-ghana", "gender-inequities-rwanda", "gendered-experiences-ghana", "gender-inequities-ghana-policy"] },
  { id: "ur", name: "University of Rwanda", short: "UR", relatedProjectIds: ["behind-the-scenes-rwanda", "green-amayaga", "soft-skills-training", "gender-inequities-rwanda"] },
  { id: "mastercard", name: "Mastercard Foundation", short: "Mastercard Fdn.", relatedProjectIds: ["behind-the-scenes-rwanda"] },
  { id: "ucc", name: "University of Cape Coast", short: "UCC", relatedProjectIds: ["behind-the-scenes-ghana"] },
  { id: "waf", name: "World Agricultural Forum", short: "WAF", relatedProjectIds: ["climate-smart-agriculture"] },
  { id: "sdgca", name: "SDG Center for Africa", short: "SDG CA", relatedProjectIds: ["sdg-policy-research"] },
  { id: "aiesec", name: "AIESEC Rwanda", short: "AIESEC", relatedProjectIds: [] },
  { id: "kepler", name: "Kepler College", short: "Kepler", relatedProjectIds: ["sales-training-consultancy"] },
  { id: "earthlink", name: "EarthLink Group", short: "EarthLink", relatedProjectIds: ["earthlink-study", "earthlink-group"] },
  { id: "ur-career", name: "University of Rwanda Career Services", short: "UR Career Services", relatedProjectIds: ["soft-skills-training"] },
  { id: "worldbank", name: "World Bank Group", short: "World Bank", relatedProjectIds: [] },
];
