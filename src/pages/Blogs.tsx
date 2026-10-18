import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { seedPosts, type Post } from "../data/posts";

export function md(src: string) {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const inline = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[(.+?)\]\((https?:[^)]+)\)/g, '<a href="$2" class="text-gold-light underline">$1</a>');
  return src.split(/\n{2,}/).map((b) => {
    if (/^#{1,3} /.test(b)) return `<h3 class="mt-6 font-display text-2xl text-paper">${inline(b.replace(/^#+ /, ""))}</h3>`;
    if (/^- /m.test(b)) return `<ul class="ml-5 list-disc space-y-1">${b.split("\n").map((l) => `<li>${inline(l.replace(/^- /, ""))}</li>`).join("")}</ul>`;
    return `<p>${inline(b)}</p>`;
  }).join("");
}

export async function loadPosts(all = false): Promise<Post[]> {
  if (!supabase) return seedPosts;
  let q = supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (!all) q = q.eq("published", true);
  const { data } = await q;
  return (data as Post[]) ?? seedPosts;
}

export default function Blogs({ slug }: { slug?: string }) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => { loadPosts().then(setPosts); }, []);
  const post = posts?.find((p) => p.slug === slug);
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      {slug && post ? (
        <article>
          <a href="#/blogs" className="text-sm text-ash hover:text-paper">← All posts</a>
          <h1 className="mt-4 font-display text-4xl text-paper">{post.title}</h1>
          <p className="mt-1 text-xs text-ash-dim">{new Date(post.created_at).toDateString()}</p>
          <div className="mt-6 space-y-4 leading-relaxed text-paper/85" dangerouslySetInnerHTML={{ __html: md(post.content) }} />
        </article>
      ) : (
        <>
          <h1 className="font-display text-5xl text-paper">Blogs</h1>
          <div className="mt-8 space-y-4">
            {!posts && <p className="text-ash">Loading…</p>}
            {posts?.map((p) => (
              <a key={p.id} href={`#/blogs/${p.slug}`} className="block rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-gold/40 hover:bg-white/[0.07]">
                <h2 className="font-display text-2xl text-paper">{p.title}</h2>
                <p className="mt-2 text-ash">{p.excerpt}</p>
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
