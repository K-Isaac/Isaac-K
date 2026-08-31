import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";

const MOVES_BETWEEN = ["Research teams", "Businesses", "Universities", "IT teams", "Development organisations", "Programme partners", "Education stakeholders"];

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
              A development practitioner with a business mind.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ash">
              Isaac combines research discipline with commercial thinking — using
              evidence to understand problems, identify opportunities and design
              programmes, partnerships, products and income-generating avenues
              around them.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ash">
              His work spans business development, research, programme design,
              education, digital products, policy and the creative economy. He
              holds a BSc (Hons) in Development Studies from the University of
              Rwanda, graduating with Second Class Upper Honours.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-white/10 bg-navy/40 p-8">
              <p className="font-mono-label text-[11px] uppercase text-gold-light">Education</p>
              <p className="mt-3 font-display text-lg text-paper">BSc (Hons) Development Studies</p>
              <p className="mt-1 text-sm text-ash-dim">University of Rwanda · Second Class Upper Honours</p>

              <p className="mt-8 font-mono-label text-[11px] uppercase text-gold-light">Distinctive strength</p>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                Moving fluently between:
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MOVES_BETWEEN.map((m) => (
                  <li key={m} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ash">{m}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
