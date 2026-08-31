export type ProjectStatus =
  | "Launching — Late October 2026"
  | "In development"
  | "Ongoing"
  | "Completed";

export type CaseStudy = {
  problem: string;
  opportunity: string;
  approach: string;
  role: string[];
  partners: string[];
  output: string[];
  outcome?: string[];
  tools?: string[];
  documents?: { label: string; href: string }[];
};

export type Project = {
  id: string;
  number: string;
  category: string;
  filterTags: ("Education" | "Creative Economy" | "Research")[];
  title: string;
  short: string;
  role: string;
  status: ProjectStatus | string;
  year: string;
  flagship?: boolean;
  caseStudy: CaseStudy;
};

export type ResearchProject = {
  id: string;
  years: string;
  affiliation: string;
  title: string;
  description: string;
  contribution: string[];
  tools?: string[];
  stats?: string[];
  note?: string;
};

export type Publication = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  authorship: string;
  description: string;
  contribution: string[];
  href?: string;
};

export type Manuscript = {
  id: string;
  authorship: string;
  title: string;
};

export type ResearchReport = {
  id: string;
  title: string;
  affiliation: string;
  year: string;
  type: string;
  href?: string;
};

export type DigitalProduct = {
  id: string;
  name: string;
  tags: string[];
  description: string;
  href?: string;
};

export type Institution = {
  id: string;
  name: string;
  short: string;
  relatedProjectIds: string[];
};

export type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  org: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};
