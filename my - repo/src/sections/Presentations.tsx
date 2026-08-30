import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";

const ITEMS = [
  { id: "p1", caption: "Behind the Scenes — research dissemination" },
  { id: "p2", caption: "National stakeholder forum" },
  { id: "p3", caption: "Multi-stakeholder workshop" },
  { id: "p4", caption: "World Bank Youth Summit 2025" },
];

export default function Presentations() {
  const [active, setActive] = useState<(typeof ITEMS)[number] | null>(null);

  return (
    <section className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Public engagement</Eyebrow>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            Evidence beyond the page.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.id} delay={i * 70}>
              <button
                onClick={() => setActive(it)}
                className="group flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-navy/40 p-4 transition-colors hover:border-gold/30"
              >
                <ImageIcon className="text-ash-dim transition-colors group-hover:text-gold-light" size={28} strokeWidth={1.3} />
                <p className="text-center text-xs leading-snug text-ash">{it.caption}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-6 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setActive(null)}
        >
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-navy p-10">
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-ash hover:border-gold/40 hover:text-gold-light"
            >
              <X size={18} />
            </button>
            <div className="flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-ink/60">
              <ImageIcon className="text-ash-dim" size={40} strokeWidth={1.2} />
            </div>
            <p className="mt-5 text-center font-mono-label text-xs uppercase text-gold-light">{active.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
