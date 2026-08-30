import { ExternalLink } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { digitalProducts } from "../data/digital";

export default function Digital() {
  return (
    <section id="digital" className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Digital</Eyebrow>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            Digital products &amp; systems
          </h2>
          <p className="mt-4 text-base text-ash">
            Working between business requirements, information architecture,
            content and technical teams.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {digitalProducts.map((d, i) => (
            <Reveal key={d.id} delay={i * 70}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy/40 p-7">
                <div className="flex flex-wrap gap-2">
                  {d.tags.map((t) => (
                    <span key={t} className="rounded-full border border-royal-light/25 bg-royal-dim/40 px-3 py-1 font-mono-label text-[10px] uppercase text-paper">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 font-display text-xl text-paper">{d.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ash">{d.description}</p>
                {d.href && (
                  <a href={d.href} className="mt-4 inline-flex w-fit items-center gap-1.5 font-mono-label text-[10px] uppercase text-gold-light">
                    Visit Site <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
