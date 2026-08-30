import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { timeline } from "../data/timeline";

export default function Timeline() {
  return (
    <section className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <Eyebrow>Experience</Eyebrow>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            The path so far
          </h2>
        </Reveal>

        <div className="relative mt-16 border-l border-white/10 pl-8">
          {timeline.map((t, i) => (
            <Reveal key={t.id} delay={i * 60} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-gold bg-ink" />
              <p className="font-mono-label text-[11px] uppercase text-gold-light">{t.period}</p>
              <p className="mt-1.5 font-display text-lg text-paper">{t.title}</p>
              <p className="text-sm text-ash-dim">{t.org}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
