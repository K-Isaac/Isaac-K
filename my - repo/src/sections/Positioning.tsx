import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";

const STAGES = ["Understand", "Research", "Design", "Connect", "Build", "Grow"];

export default function Positioning() {
  return (
    <section className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>How I work</Eyebrow>
            <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
              I don't just study problems.
              <br />
              <span className="italic text-gold-light">I build around them.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex items-center">
            <p className="text-base leading-relaxed text-ash">
              My work moves between research, business development, education,
              digital products and programme design. I use research to understand
              problems, market thinking to identify opportunities, and programme
              design to turn those opportunities into something practical.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-20">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-navy/40 p-8">
            {STAGES.map((s, i) => (
              <div key={s} className="flex items-center gap-6">
                <div className="text-center">
                  <span className="font-mono-label text-[10px] text-ash-dim">{`0${i + 1}`}</span>
                  <p className="mt-2 font-display text-lg text-paper">{s}</p>
                </div>
                {i < STAGES.length - 1 && (
                  <span className="hidden h-px w-8 bg-gradient-to-r from-royal-light/60 to-gold/40 sm:block" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
