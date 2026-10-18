// Deploy: supabase functions deploy site-editor   (keep "Verify JWT" ON). Reuses secret ANTHROPIC_API_KEY.
import { createClient } from "npm:@supabase/supabase-js@2";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const PAGES = ["home", "about", "portfolio", "publications", "contact"];
const BUILTINS = ["home.hero","home.positioning","home.capabilities","about.about","about.timeline","about.toolkit","portfolio.featured","portfolio.creative","portfolio.digital","portfolio.institutions","publications.research","publications.knowledge","publications.presentations","contact.cta","contact.contact"];
const obj = (properties: Record<string, unknown>, required: string[] = []) => ({ type: "object", properties, required });
const tools = [
  { name: "list_site", description: "List all custom sections (id, page, parent_id, title, body, visible) and hidden built-in sections.", input_schema: obj({}) },
  { name: "add_section", description: "Add a section to a page, or a sub-section when parent_id is given.", input_schema: obj({ page: { type: "string", enum: PAGES }, title: { type: "string" }, body: { type: "string", description: "Short markdown" }, parent_id: { type: "string" } }, ["page", "title"]) },
  { name: "update_section", description: "Edit title/body, show or hide (visible), or reorder (position) a section.", input_schema: obj({ id: { type: "string" }, title: { type: "string" }, body: { type: "string" }, visible: { type: "boolean" }, position: { type: "number" } }, ["id"]) },
  { name: "set_builtin_visibility", description: "Show or hide one of the built-in sections.", input_schema: obj({ id: { type: "string", enum: BUILTINS }, visible: { type: "boolean" } }, ["id", "visible"]) },
  { name: "create_post_draft", description: "Save a blog post as an unpublished draft.", input_schema: obj({ title: { type: "string" }, excerpt: { type: "string" }, content: { type: "string" } }, ["title", "content"]) },
];
const SYSTEM = `You are the site editor for Isaac Kwizera's portfolio website. Use your tools to make the changes he asks for. You can add, edit, reorder and hide sections; you can never delete anything, so hide instead. Pages: ${PAGES.join(", ")}. Custom sections show below the built-in ones, and sub-sections appear as cards under their parent. The site is low-text and friendly, so keep copy short and warm. Never invent facts about Isaac: use only what he tells you or what is already on the site, and ask if something is missing. Call list_site before editing existing content. Afterwards, say in one or two sentences what you changed.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...cors, "content-type": "application/json" } });
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } });
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return json({ error: "Sign in first" }, 401); // anon visitors cannot use the editor

  const actions: string[] = [];
  const run = async (name: string, i: any) => {
    if (name === "list_site") {
      const s = await sb.from("sections").select("id,page,parent_id,title,body,visible").order("position");
      const h = await sb.from("settings").select("value").eq("key", "hidden_builtins").maybeSingle();
      return { sections: s.data, hidden_builtins: h.data?.value ?? [] };
    }
    if (name === "add_section") {
      const r = await sb.from("sections").insert({ page: i.page, parent_id: i.parent_id ?? null, title: i.title, body: i.body ?? "", position: Date.now() }).select("id").single();
      if (!r.error) actions.push(`Added ${i.parent_id ? "sub-section" : "section"} "${i.title}" on ${i.page}`);
      return r.error ? { error: r.error.message } : { id: r.data.id };
    }
    if (name === "update_section") {
      const { id, ...patch } = i;
      const r = await sb.from("sections").update(patch).eq("id", id);
      if (!r.error) actions.push(`Updated section ${patch.title ?? id}`);
      return r.error ? { error: r.error.message } : { ok: true };
    }
    if (name === "set_builtin_visibility") {
      const h = await sb.from("settings").select("value").eq("key", "hidden_builtins").maybeSingle();
      const cur: string[] = (h.data?.value as string[]) ?? [];
      const next = i.visible ? cur.filter((x) => x !== i.id) : [...new Set([...cur, i.id])];
      await sb.from("settings").upsert({ key: "hidden_builtins", value: next });
      actions.push(`${i.visible ? "Showed" : "Hid"} built-in ${i.id}`);
      return { ok: true };
    }
    if (name === "create_post_draft") {
      const slug = String(i.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const r = await sb.from("posts").insert({ slug, title: i.title, excerpt: i.excerpt ?? "", content: i.content, published: false });
      if (!r.error) actions.push(`Saved draft post "${i.title}"`);
      return r.error ? { error: r.error.message } : { ok: true };
    }
    return { error: "unknown tool" };
  };

  const { messages } = await req.json();
  const convo: any[] = messages.slice(-12);
  for (let turn = 0; turn < 8; turn++) {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": Deno.env.get("ANTHROPIC_API_KEY")!, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, system: SYSTEM, tools, messages: convo }),
    });
    const j = await r.json();
    if (!j.content) return json({ answer: "The AI service returned an error.", actions });
    if (j.stop_reason !== "tool_use") return json({ answer: j.content.filter((c: any) => c.type === "text").map((c: any) => c.text).join("\n"), actions });
    convo.push({ role: "assistant", content: j.content });
    const results = [];
    for (const c of j.content.filter((c: any) => c.type === "tool_use")) results.push({ type: "tool_result", tool_use_id: c.id, content: JSON.stringify(await run(c.name, c.input)) });
    convo.push({ role: "user", content: results });
  }
  return json({ answer: "That took too many steps. Try a smaller request.", actions });
});
