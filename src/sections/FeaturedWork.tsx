import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import CaseStudyModal from "../components/CaseStudyModal";
import { projects } from "../data/projects";
import type { Project } from "../data/types";

const FILTERS = ["All", "Education", "Creative Economy", "Research"] as const;

export default function FeaturedWork() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All" ? projects : projects.filter((p) => p.filterTags.includes(filter as never)),
    [filter]
  );

  return (
    <section id="work" className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
              Selected work
            </h2>
            <p className="mt-4 text-base text-ash">
              Projects where I have contributed to research, programme design,
              business development, partnerships, digital development or
              implementation.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 font-mono-label text-[11px] uppercase transition-colors ${
                  filter === f
                    ? "border-gold bg-gold/10 text-gold-light"
                    : "border-white/10 text-ash hover:border-white/25 hover:text-paper"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <button
                onClick={() => setActive(p)}
                className={`group flex h-full w-full flex-col rounded-2xl border p-8 text-left transition-colors ${
                  p.flagship
                    ? "border-gold/30 bg-gradient-to-br from-gold/[0.06] to-transparent hover:border-gold/50"
                    : "border-white/10 bg-navy/40 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-xs text-ash-dim">{p.number}</span>
                  {p.flagship && (
                    <span className="rounded-full border border-gold/40 px-3 py-1 font-mono-label text-[10px] uppercase text-gold-light">
                      Flagship
                    </span>
                  )}
                </div>

                <p className="mt-4 font-mono-label text-[10px] uppercase text-royal-light">{p.category}</p>
                <h3 className="mt-3 font-display text-2xl text-paper">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{p.short}</p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-xs text-ash-dim">{p.role}</p>
                    <p className="mt-1 font-mono-label text-[10px] uppercase text-gold-light">{p.status} · {p.year}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono-label text-[11px] uppercase text-paper transition-transform group-hover:translate-x-1">
                    View Case Study
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
