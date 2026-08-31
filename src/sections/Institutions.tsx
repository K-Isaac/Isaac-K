import { useMemo, useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { institutions } from "../data/institutions";

export default function Institutions() {
  const [active, setActive] = useState<string | null>(null);

  const positioned = useMemo(() => {
    const r = 42;
    return institutions.map((inst, i) => {
      const angle = (i / institutions.length) * Math.PI * 2 - Math.PI / 2;
      return {
        ...inst,
        x: 50 + r * Math.cos(angle),
        y: 50 + r * Math.sin(angle) * 0.82,
      };
    });
  }, []);

  const activeInst = positioned.find((p) => p.id === active);

  return (
    <section className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Network</Eyebrow>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            Institutions I've worked with
          </h2>
          <p className="mt-4 text-base text-ash">
            Research · Education · Business · Development · Partnerships.
            {activeInst && (
              <span className="block mt-3 font-mono-label text-xs uppercase text-gold-light">
                {activeInst.name}
                {activeInst.relatedProjectIds.length > 0 && (
                  <span className="text-ash"> — linked to {activeInst.relatedProjectIds.length} project(s) on this site</span>
                )}
              </span>
            )}
          </p>
        </Reveal>

        <Reveal delay={120} className="relative mt-16 aspect-[16/11] w-full max-w-4xl mx-auto">
          <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
            {positioned.map((inst) => (
              <line
                key={inst.id}
                x1="50"
                y1="50"
                x2={inst.x}
                y2={inst.y}
                stroke={active === inst.id ? "#C7A15C" : "#2A4AA0"}
                strokeWidth={active === inst.id ? 0.5 : 0.25}
                opacity={active === inst.id ? 0.9 : 0.45}
              />
            ))}
            <circle cx="50" cy="50" r="7" fill="#0F1B38" stroke="#C7A15C" strokeWidth="0.5" />
            <text x="50" y="51.5" textAnchor="middle" fontSize="4" fontWeight={600} fill="#E7D2A0" className="font-display">
              IK
            </text>
          </svg>

          {positioned.map((inst) => (
            <button
              key={inst.id}
              onMouseEnter={() => setActive(inst.id)}
              onFocus={() => setActive(inst.id)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              style={{ left: `${inst.x}%`, top: `${inst.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-center font-mono-label text-[9px] uppercase leading-tight transition-colors sm:text-[10px] ${
                active === inst.id
                  ? "border-gold bg-gold/15 text-gold-light"
                  : "border-white/15 bg-navy/80 text-ash hover:border-white/30"
              }`}
            >
              {inst.short}
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
