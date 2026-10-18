import { useEffect, useState } from "react";
import { supabase, backendReady } from "../lib/supabase";
import { loadPosts } from "./Blogs";
import type { Post } from "../data/posts";
import { useSite, BUILTINS, type Section } from "../lib/site";

const field = "w-full rounded-2xl bg-white/5 px-4 py-3 text-paper outline-none placeholder:text-ash-dim";
const btn = "rounded-full bg-gold px-5 py-2 text-sm font-bold text-ink";
const link = "text-sm text-gold-light hover:underline";
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const TABS = ["Assistant", "Sections", "Posts"] as const;

function Assistant() {
  const { reload } = useSite();
  const [log, setLog] = useState<{ role: string; content: string }[]>([]);
  const [q, setQ] = useState(""); const [busy, setBusy] = useState(false); const [acts, setActs] = useState<string[]>([]);
  async function send() {
    if (!q.trim() || busy) return;
    const next = [...log, { role: "user", content: q }];
    setLog(next); setQ(""); setBusy(true); setActs([]);
    const { data, error } = await supabase!.functions.invoke("site-editor", { body: { messages: next } });
    setLog([...next, { role: "assistant", content: error ? "Error: " + error.message : data.answer }]);
    setActs(data?.actions ?? []); setBusy(false); reload();
  }
  return (
    <div>
      <p className="text-sm text-ash">Tell me what to change, e.g. “add a Services section on Home with three sub-sections” or “hide the Timeline on About”.</p>
      <div className="mt-4 space-y-2">
        {log.map((m, i) => <p key={i} className={`whitespace-pre-line rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-royal/30 text-paper" : "bg-white/5 text-paper/90"}`}>{m.content}</p>)}
        {busy && <p className="text-sm text-ash">Working…</p>}
        {acts.length > 0 && <ul className="rounded-2xl border border-gold/30 p-3 text-xs text-gold-light">{acts.map((a, i) => <li key={i}>✓ {a}</li>)}</ul>}
      </div>
      <div className="mt-4 flex gap-2">
        <input className={field} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="What should I change?" />
        <button className={btn} onClick={send}>Send</button>
      </div>
    </div>
  );
}

function Row({ s, sibs, all, depth }: { s: Section; sibs: Section[]; all: Section[]; depth: number }) {
  const { reload } = useSite();
  const [t, setT] = useState(s.title); const [b, setB] = useState(s.body);
  const upd = async (patch: Partial<Section>) => { await supabase!.from("sections").update(patch).eq("id", s.id); reload(); };
  async function move(dir: -1 | 1) {
    const o = sibs[sibs.findIndex((x) => x.id === s.id) + dir]; if (!o) return;
    await supabase!.from("sections").update({ position: o.position }).eq("id", s.id);
    await supabase!.from("sections").update({ position: s.position }).eq("id", o.id); reload();
  }
  const kids = all.filter((k) => k.parent_id === s.id);
  return (
    <div style={{ marginLeft: depth * 20 }} className="mt-3">
      <div className={`space-y-2 rounded-2xl bg-white/5 p-3 ${s.visible ? "" : "opacity-50"}`}>
        <input className={field} value={t} onChange={(e) => setT(e.target.value)} />
        <textarea className={field} rows={3} value={b} onChange={(e) => setB(e.target.value)} />
        <div className="flex flex-wrap gap-4">
          <button className={link} onClick={() => upd({ title: t, body: b })}>Save</button>
          <button className={link} onClick={() => upd({ visible: !s.visible })}>{s.visible ? "Hide" : "Show"}</button>
          <button className={link} onClick={() => move(-1)}>↑</button><button className={link} onClick={() => move(1)}>↓</button>
          <button className="text-sm text-ash" onClick={async () => { if (confirm("Delete this and its sub-sections?")) { await supabase!.from("sections").delete().eq("id", s.id); reload(); } }}>Delete</button>
        </div>
      </div>
      {kids.map((k) => <Row key={k.id} s={k} sibs={kids} all={all} depth={depth + 1} />)}
    </div>
  );
}

function Sections() {
  const { sections, hidden, reload } = useSite();
  const [n, setN] = useState({ page: "home", parent_id: "", title: "", body: "" });
  async function add() {
    if (!n.title) return;
    const { error } = await supabase!.from("sections").insert({ page: n.page, parent_id: n.parent_id || null, title: n.title, body: n.body, position: Date.now() });
    if (!error) { setN({ ...n, title: "", body: "" }); reload(); }
  }
  async function showBuiltin(id: string, show: boolean) {
    await supabase!.from("settings").upsert({ key: "hidden_builtins", value: show ? hidden.filter((h) => h !== id) : [...hidden, id] }); reload();
  }
  return (
    <div>
      <div className="space-y-2 rounded-2xl border border-white/10 p-4">
        <div className="flex gap-2">
          <select className={field} value={n.page} onChange={(e) => setN({ ...n, page: e.target.value, parent_id: "" })}>{Object.keys(BUILTINS).map((p) => <option key={p}>{p}</option>)}</select>
          <select className={field} value={n.parent_id} onChange={(e) => setN({ ...n, parent_id: e.target.value })}>
            <option value="">New section</option>
            {sections.filter((s) => s.page === n.page && !s.parent_id).map((s) => <option key={s.id} value={s.id}>Sub-section of {s.title}</option>)}
          </select>
        </div>
        <input className={field} placeholder="Title" value={n.title} onChange={(e) => setN({ ...n, title: e.target.value })} />
        <textarea className={field} rows={3} placeholder="Short text (markdown)" value={n.body} onChange={(e) => setN({ ...n, body: e.target.value })} />
        <button className={btn} onClick={add}>Add</button>
      </div>
      {Object.entries(BUILTINS).map(([page, ids]) => (
        <div key={page} className="mt-8">
          <h3 className="font-display text-2xl capitalize text-paper">{page}</h3>
          <div className="mt-2 flex flex-wrap gap-x-4 text-xs text-ash">
            {ids.map((id) => <label key={id}><input type="checkbox" checked={!hidden.includes(id)} onChange={(e) => showBuiltin(id, e.target.checked)} /> {id.split(".")[1]}</label>)}
          </div>
          {sections.filter((s) => s.page === page && !s.parent_id).map((s, _i, a) => <Row key={s.id} s={s} sibs={a} all={sections} depth={0} />)}
        </div>
      ))}
    </div>
  );
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [f, setF] = useState({ title: "", excerpt: "", content: "", published: true });
  const [msg, setMsg] = useState("");
  const refresh = () => loadPosts(true).then(setPosts);
  useEffect(() => { refresh(); }, []);
  async function save() {
    const { error } = await supabase!.from("posts").insert({ ...f, slug: slugify(f.title) });
    setMsg(error ? error.message : "Saved ✓"); if (!error) { setF({ title: "", excerpt: "", content: "", published: true }); refresh(); }
  }
  return (
    <div>
      <div className="space-y-3">
        <input className={field} placeholder="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
        <input className={field} placeholder="One-line summary" value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} />
        <textarea className={field} rows={8} placeholder="Markdown: ## heading, - list, **bold**" value={f.content} onChange={(e) => setF({ ...f, content: e.target.value })} />
        <label className="flex items-center gap-2 text-ash"><input type="checkbox" checked={f.published} onChange={(e) => setF({ ...f, published: e.target.checked })} /> Publish now</label>
        <button className={btn} onClick={save}>Save post</button>
        {msg && <span className="ml-3 text-sm text-gold-light">{msg}</span>}
      </div>
      <div className="mt-8 space-y-2">
        {posts.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-paper">
            <span>{p.title} <em className="text-xs text-ash">{p.published ? "live" : "draft"}</em></span>
            <span className="space-x-3">
              <button className={link} onClick={async () => { await supabase!.from("posts").update({ published: !p.published }).eq("id", p.id); refresh(); }}>{p.published ? "Unpublish" : "Publish"}</button>
              <button className="text-sm text-ash" onClick={async () => { if (confirm("Delete this post?")) { await supabase!.from("posts").delete().eq("id", p.id); refresh(); } }}>Delete</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const { reload } = useSite();
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [msg, setMsg] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Assistant");
  useEffect(() => { supabase?.auth.getSession().then(({ data }) => { setAuthed(!!data.session); reload(); }); }, [reload]);
  if (!backendReady) return <section className="mx-auto max-w-xl px-6 pt-32 text-ash">Backend not connected yet. Follow the Supabase steps in the README, then reload.</section>;
  async function login() {
    const { error } = await supabase!.auth.signInWithPassword({ email, password: pw });
    if (error) setMsg(error.message); else { setAuthed(true); reload(); }
  }
  return (
    <section className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <h1 className="font-display text-4xl text-paper">Control room</h1>
      {!authed ? (
        <div className="mt-6 space-y-3">
          <input className={field} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={field} type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} />
          <button className={btn} onClick={login}>Sign in</button>
          {msg && <p className="text-sm text-gold-light">{msg}</p>}
        </div>
      ) : (
        <>
          <div className="mt-6 flex gap-1 rounded-full bg-white/5 p-1">
            {TABS.map((t) => <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-full py-2 text-sm font-semibold ${tab === t ? "bg-royal text-paper" : "text-ash"}`}>{t}</button>)}
          </div>
          <div className="mt-6">{tab === "Assistant" ? <Assistant /> : tab === "Sections" ? <Sections /> : <Posts />}</div>
        </>
      )}
    </section>
  );
}
