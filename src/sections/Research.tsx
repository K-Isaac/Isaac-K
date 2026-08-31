import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { researchProjects } from "../data/research";

export default function Research() {
  return (
    <section id="research" className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Research</Eyebrow>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            Research that informs action
          </h2>
          <p className="mt-4 text-base text-ash">
            Research projects spanning gender, creative economies, climate-smart
            agriculture, sustainable development and SDG policy.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6">
          {researchProjects.map((r, i) => (
            <Reveal key={r.id} delay={i * 60}>
              <div className="grid gap-6 rounded-2xl border border-white/10 bg-navy/40 p-8 lg:grid-cols-[220px_1fr]">
                <div>
                  <p className="font-mono-label text-[11px] uppercase text-gold-light">{r.years}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ash-dim">{r.affiliation}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-paper">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{r.description}</p>

                  {r.stats && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {r.stats.map((s) => (
                        <span key={s} className="rounded-full border border-royal-light/25 bg-royal-dim/40 px-3 py-1 font-mono-label text-[10px] text-paper">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.contribution.map((c) => (
                      <span key={c} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ash">
                        {c}
                      </span>
                    ))}
                  </div>

                  {r.tools && (
                    <p className="mt-4 font-mono-label text-[10px] uppercase text-ash-dim">
                      Tools: {r.tools.join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
