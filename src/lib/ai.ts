import { projects } from "../data/projects";
import { researchProjects, publications } from "../data/research";
import { digitalProducts } from "../data/digital";
import { supabase } from "./supabase";

export type Hit = { id: string; kind: "Project" | "Research" | "Publication" | "Digital"; title: string; text: string; score: number };
const docs = [
  ...projects.map((p) => ({ id: p.id, kind: "Project" as const, title: p.title, text: `${p.category} ${p.short} ${p.role}` })),
  ...researchProjects.map((r) => ({ id: r.id, kind: "Research" as const, title: r.title, text: `${r.description} ${r.affiliation}` })),
  ...publications.map((r) => ({ id: r.id, kind: "Publication" as const, title: r.title, text: `${r.description} ${r.publisher}` })),
  ...digitalProducts.map((d) => ({ id: d.id, kind: "Digital" as const, title: d.name, text: `${d.description} ${d.tags.join(" ")}` })),
];
const tok = (s: string) => s.toLowerCase().match(/[a-z0-9]{3,}/g) ?? [];

/** Local semantic-ish search: weighted keyword overlap (title counts triple). Works with no backend. */
export function smartSearch(q: string, limit = 5): Hit[] {
  const t = tok(q);
  if (!t.length) return [];
  return docs
    .map((d) => {
      const title = tok(d.title), body = tok(d.text);
      const score = t.reduce((s, w) => s + 3 * title.filter((x) => x.startsWith(w)).length + body.filter((x) => x.startsWith(w)).length, 0);
      return { ...d, score };
    })
    .filter((d) => d.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
}

/** AI Twin: calls the `ai-twin` edge function (Claude) with retrieved evidence; falls back to local evidence. */
export async function askTwin(question: string): Promise<string> {
  const ctx = smartSearch(question, 4);
  if (supabase) {
    const { data, error } = await supabase.functions.invoke("ai-twin", { body: { question, context: ctx.map((c) => `${c.kind}: ${c.title} — ${c.text}`) } });
    if (!error && data?.answer) return data.answer as string;
  }
  return ctx.length
    ? "Here is the closest evidence from my work:\n" + ctx.map((c) => `• ${c.title} (${c.kind})`).join("\n")
    : "I could not find that in my portfolio yet. Try asking about my projects, research or digital products, or use Let's work together.";
}
