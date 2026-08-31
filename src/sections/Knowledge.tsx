import { useState } from "react";
import { FileText } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { publications, manuscripts, researchReports } from "../data/research";

const TABS = ["Publications", "Research Reports"] as const;

export default function Knowledge() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Publications");

  return (
    <section id="knowledge" className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Knowledge products</Eyebrow>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            Knowledge I've produced
          </h2>
          <p className="mt-4 text-base text-ash">
            Research becomes useful when it can travel — through policy briefs,
            evidence briefs, reports, presentations and manuscripts.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full border px-5 py-2 font-mono-label text-[11px] uppercase transition-colors ${
                tab === t ? "border-gold bg-gold/10 text-gold-light" : "border-white/10 text-ash hover:text-paper"
              }`}
            >
              {t}
            </button>
          ))}
        </Reveal>

        {tab === "Publications" && (
          <div className="mt-10 space-y-5">
            {publications.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <div className="rounded-2xl border border-white/10 bg-navy/40 p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-label text-[11px] uppercase text-royal-light">{p.publisher} · {p.date}</p>
                      <h3 className="mt-2 font-display text-xl text-paper">{p.title}</h3>
                      <p className="mt-1 text-xs text-gold-light">{p.authorship}</p>
                    </div>
                    <a
                      href={p.href ?? "#"}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono-label text-[10px] uppercase text-paper hover:border-gold/40 hover:text-gold-light"
                    >
                      <FileText size={13} />
                      Read Publication
                    </a>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ash">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.contribution.map((c) => (
                      <span key={c} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ash">{c}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={200} className="mt-4 rounded-2xl border border-dashed border-gold/30 bg-gold/[0.03] p-7">
              <p className="font-mono-label text-[11px] uppercase text-gold-light">Manuscripts in progress</p>
              <div className="mt-4 space-y-4">
                {manuscripts.map((m) => (
                  <div key={m.id} className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <p className="text-sm text-paper">{m.title}</p>
                    <p className="font-mono-label text-[10px] uppercase text-ash-dim">{m.authorship} · Manuscript in progress</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        )}

        {tab === "Research Reports" && (
          <div className="mt-10 space-y-5">
            {researchReports.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-navy/40 p-7">
                  <div>
                    <p className="font-mono-label text-[11px] uppercase text-royal-light">{r.affiliation} · {r.year}</p>
                    <h3 className="mt-2 font-display text-xl text-paper">{r.title}</h3>
                    <p className="mt-1 text-xs text-gold-light">{r.type}</p>
                  </div>
                  <a
                    href={r.href ?? "#"}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono-label text-[10px] uppercase text-paper hover:border-gold/40 hover:text-gold-light"
                  >
                    <FileText size={13} />
                    View Document
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
