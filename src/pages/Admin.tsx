import { useEffect, useState } from "react";
import { supabase, backendReady } from "../lib/supabase";
import { loadPosts } from "./Blogs";
import type { Post } from "../data/posts";

const field = "w-full rounded-2xl bg-white/5 px-4 py-3 text-paper outline-none placeholder:text-ash-dim";
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [f, setF] = useState({ title: "", excerpt: "", content: "", published: true });
  const [msg, setMsg] = useState("");
  const refresh = () => loadPosts(true).then(setPosts);

  useEffect(() => {
    supabase?.auth.getSession().then(({ data }) => { setAuthed(!!data.session); if (data.session) refresh(); });
  }, []);

  if (!backendReady) return <section className="mx-auto max-w-xl px-6 pt-32 text-ash">Backend not connected yet. Follow the Supabase steps in the README, then reload.</section>;

  async function login() {
    const { error } = await supabase!.auth.signInWithPassword({ email, password: pw });
    if (error) setMsg(error.message); else { setAuthed(true); refresh(); }
  }
  async function save() {
    const { error } = await supabase!.from("posts").insert({ ...f, slug: slugify(f.title) });
    setMsg(error ? error.message : "Saved ✓"); if (!error) { setF({ title: "", excerpt: "", content: "", published: true }); refresh(); }
  }
  async function toggle(p: Post) { await supabase!.from("posts").update({ published: !p.published }).eq("id", p.id); refresh(); }
  async function del(p: Post) { if (confirm("Delete this post?")) { await supabase!.from("posts").delete().eq("id", p.id); refresh(); } }

  return (
    <section className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <h1 className="font-display text-4xl text-paper">Write</h1>
      {!authed ? (
        <div className="mt-6 space-y-3">
          <input className={field} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={field} type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
          <button onClick={login} className="rounded-full bg-gold px-6 py-2 font-bold text-ink">Sign in</button>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-3">
            <input className={field} placeholder="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
            <input className={field} placeholder="One-line summary" value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} />
            <textarea className={field} rows={10} placeholder="Write in simple markdown: ## heading, - list, **bold**" value={f.content} onChange={(e) => setF({ ...f, content: e.target.value })} />
            <label className="flex items-center gap-2 text-ash"><input type="checkbox" checked={f.published} onChange={(e) => setF({ ...f, published: e.target.checked })} /> Publish now</label>
            <button onClick={save} className="rounded-full bg-gold px-6 py-2 font-bold text-ink">Save post</button>
          </div>
          <div className="mt-10 space-y-2">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-paper">
                <span>{p.title} <em className="text-xs text-ash">{p.published ? "live" : "draft"}</em></span>
                <span className="space-x-3 text-sm"><button onClick={() => toggle(p)} className="text-gold-light">{p.published ? "Unpublish" : "Publish"}</button><button onClick={() => del(p)} className="text-ash">Delete</button></span>
              </div>
            ))}
          </div>
        </>
      )}
      {msg && <p className="mt-4 text-sm text-gold-light">{msg}</p>}
    </section>
  );
}
