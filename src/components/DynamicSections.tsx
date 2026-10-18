import { useSite } from "../lib/site";
import { md } from "../pages/Blogs";

/** Renders sections (and sub-sections as cards) created in the backend for a page. */
export default function DynamicSections({ page }: { page: string }) {
  const { sections } = useSite();
  const top = sections.filter((s) => s.page === page && !s.parent_id && s.visible);
  return (
    <>
      {top.map((s) => {
        const kids = sections.filter((k) => k.parent_id === s.id && k.visible);
        return (
          <section key={s.id} className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="font-display text-4xl text-paper">{s.title}</h2>
            {s.body && <div className="mt-4 max-w-2xl space-y-3 text-ash" dangerouslySetInnerHTML={{ __html: md(s.body) }} />}
            {kids.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {kids.map((k) => (
                  <div key={k.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <h3 className="font-display text-xl text-paper">{k.title}</h3>
                    <div className="mt-2 space-y-2 text-sm text-ash" dangerouslySetInnerHTML={{ __html: md(k.body) }} />
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
