import type { ResearchProject, Publication, Manuscript, ResearchReport } from "./types";

export const researchProjects: ResearchProject[] = [
  {
    id: "behind-the-scenes-rwanda",
    years: "2024–2026",
    affiliation: "Youth Researcher · ICRW / University of Rwanda",
    title: "Behind the Scenes — Rwanda",
    description:
      "National mixed-method research examining gender inequities affecting young women in Rwanda's creative sector, conducted with support from the Mastercard Foundation.",
    contribution: [
      "Research design",
      "Instrument development",
      "Fieldwork",
      "Research coordination",
      "Data cleaning",
      "Quantitative analysis",
      "Qualitative analysis",
      "Evidence synthesis",
      "Knowledge-product development",
      "Dissemination",
    ],
    tools: ["KoBo Toolbox", "STATA", "MAXQDA", "Excel"],
    stats: ["400 survey respondents", "7 FGDs", "4 KIIs", "12 field researchers supervised"],
  },
  {
    id: "behind-the-scenes-ghana",
    years: "2025",
    affiliation: "Research Fellow · ICRW Africa / University of Cape Coast",
    title: "Behind the Scenes — Ghana",
    description:
      "An 8-week cross-country research fellowship examining youth and gender dynamics within Ghana's creative sector.",
    contribution: [
      "Evidence synthesis",
      "Policy analysis",
      "Research coordination",
      "Knowledge products",
      "Cross-country collaboration",
    ],
  },
  {
    id: "climate-smart-agriculture",
    years: "2025",
    affiliation: "World Agricultural Forum",
    title: "Climate-Smart Agriculture",
    description:
      "A systematic evidence review examining climate-smart agriculture through peer-reviewed and institutional literature.",
    contribution: ["Research", "Evidence synthesis", "Knowledge management"],
    stats: ["28 peer-reviewed articles and institutional sources reviewed"],
  },
  {
    id: "green-amayaga",
    years: "2025",
    affiliation: "University of Rwanda",
    title: "Green Amayaga & Sustainable Development of Kigoma Sector",
    description:
      "Undergraduate research examining forest landscape restoration and sustainable development in Kigoma Sector.",
    contribution: ["Environment", "Development", "Restoration", "Sustainability"],
  },
  {
    id: "sdg-policy-research",
    years: "2024",
    affiliation: "SDG Center for Africa",
    title: "SDG Policy Research",
    description:
      "Research and policy work aligned with the Sustainable Development Goals, including analytical policy briefs for African development stakeholders.",
    contribution: ["Policy research", "Analytical briefs"],
  },
];

export const publications: Publication[] = [
  {
    id: "gender-inequities-ghana-policy",
    title: "Gender Inequities in Ghana's Creative Sector: Pathways for Inclusive Policy Reforms",
    publisher: "International Center for Research on Women",
    date: "July 2026",
    authorship: "Co-author",
    description:
      "Examines gender-based discrimination, pay inequalities, sexual harassment, informal labour conditions, and limited access to mentorship and finance affecting young women in Ghana's creative sector.",
    contribution: ["Research", "Evidence synthesis", "Analysis", "Knowledge-product development", "Dissemination"],
  },
  {
    id: "gendered-experiences-ghana",
    title: "Gendered Experiences in Ghana's Creative Economy",
    publisher: "International Center for Research on Women",
    date: "July 2026",
    authorship: "Co-author",
    description:
      "Examines Ghana's creative economy through sector growth, cultural heritage, digital transformation, infrastructure, access to finance and markets, gender inclusion, governance and cross-sector collaboration.",
    contribution: ["Research", "Evidence synthesis", "Analysis", "Knowledge-product development", "Stakeholder dissemination"],
  },
  {
    id: "gender-inequities-rwanda",
    title: "Gender Inequities in the Creative Sector in Rwanda",
    publisher: "International Center for Research on Women / University of Rwanda",
    date: "2026",
    authorship: "Researcher · Co-author",
    description:
      "National research documenting the experiences of young women in Rwanda's creative industries, including discrimination, harassment, career progression, pay equity and access to opportunities.",
    contribution: ["Research", "Fieldwork", "Analysis", "Knowledge-product development"],
  },
];

export const manuscripts: Manuscript[] = [
  {
    id: "surviving-creativity",
    authorship: "Lead Author",
    title: "Surviving Creativity: The Experiences of Young Women in Rwanda's Creative Sector",
  },
  {
    id: "optimism-against-the-odds",
    authorship: "Co-author",
    title: "Optimism Against the Odds: Young Women Navigating Gender Norms and Workplace Challenges in Rwanda's Creative Industry",
  },
  {
    id: "inseparable-threads",
    authorship: "Co-author",
    title: "Inseparable Threads: How Ghana's Cultural Identity Shapes Its Creative Economy",
  },
];

export const researchReports: ResearchReport[] = [
  {
    id: "csa-review",
    title: "Climate-Smart Agriculture: Systematic Evidence Review",
    affiliation: "World Agricultural Forum",
    year: "2025",
    type: "Research Report",
  },
  {
    id: "green-amayaga-report",
    title: "Green Amayaga Project & Sustainable Development of Kigoma Sector",
    affiliation: "University of Rwanda",
    year: "2025",
    type: "Dissertation",
  },
];
