import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { skillGroups, capabilities } from "../data/skills";

export default function Toolkit() {
  return (
    <section className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Toolkit</Eyebrow>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            My toolkit
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.id} delay={i * 60}>
              <div className="h-full rounded-2xl border border-white/10 bg-navy/40 p-6">
                <p className="font-mono-label text-[11px] uppercase text-royal-light">{g.title}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ash">{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 rounded-2xl border border-gold/20 bg-gold/[0.04] p-7">
          <p className="font-mono-label text-[11px] uppercase text-gold-light">Broader capabilities</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {capabilities.map((c) => (
              <li key={c} className="rounded-full border border-gold/25 px-3 py-1 text-xs text-gold-light">{c}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
