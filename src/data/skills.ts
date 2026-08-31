import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  { id: "data", title: "Data & Analysis", items: ["STATA", "Excel", "Power BI", "SQL"] },
  { id: "qual", title: "Qualitative Research", items: ["MAXQDA"] },
  { id: "collection", title: "Data Collection", items: ["KoBo Toolbox"] },
  { id: "business", title: "Business Systems", items: ["Odoo ERP", "Salesforce", "HubSpot CRM"] },
  { id: "digital", title: "Digital", items: ["Information architecture", "Content strategy", "Digital product structuring", "Website requirements"] },
  { id: "ai", title: "AI", items: ["AI-assisted research", "AI-enabled workflows", "AI programme development"] },
];

export const capabilities = [
  "Business Development",
  "Programme Design",
  "Partnerships",
  "Research",
  "Policy Synthesis",
  "M&E",
  "Data Visualisation",
  "Stakeholder Engagement",
];
