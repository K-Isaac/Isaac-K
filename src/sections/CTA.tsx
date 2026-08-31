import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";

const PATHWAYS = [
  "I need business development",
  "I need programme design",
  "I need research support",
  "I need an education initiative",
  "I need a digital product",
  "I want to discuss a partnership",
];

export default function CTA() {
  return (
    <section className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <Reveal>
          <h2 className="font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl lg:text-6xl">
            Have an opportunity <span className="italic text-gold-light">worth building?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ash">
            Whether you are developing a programme, entering a new market,
            launching a training product, conducting research or building a
            digital platform, let's talk about the problem, the evidence and
            what is worth building from it.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-wrap justify-center gap-3">
          {PATHWAYS.map((p) => (
            <span key={p} className="rounded-full border border-white/10 bg-navy/40 px-4 py-2 text-xs text-ash">
              {p}
            </span>
          ))}
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-mono-label text-xs uppercase text-ink transition-transform hover:-translate-y-0.5"
          >
            Start a Conversation
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
