import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";

const CHAIN = [
  "Cultural Heritage", "Cultural Production", "Artists & Troupes", "Events",
  "Audiences", "Sponsorship", "Creative Jobs", "Revenue", "Cultural Economy",
];

const AREAS = ["Traditional performance", "Music", "Dance", "Poetry", "Imigongo / art", "Cultural tourism", "Sponsorship", "Creative entrepreneurship"];
const ROLE = ["Concept development", "Business model", "Value-chain design", "Programme development", "Partnership development", "Sponsorship strategy"];

export default function CreativeEconomy() {
  return (
    <section className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Creative economy</Eyebrow>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            Building in the creative economy
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-14 rounded-3xl border border-white/10 bg-navy/40 p-8 sm:p-10">
          <p className="font-mono-label text-[11px] uppercase text-gold-light">
            Creative Economy · Culture · Entrepreneurship
          </p>
          <h3 className="mt-3 font-display text-3xl text-paper">Umurage wa Benimana Festival</h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ash">
            A Rwandan cultural and creative-economy platform designed around
            heritage, cultural production, artist opportunities, audience
            development, partnerships and sustainable revenue generation —
            presented as an economic platform, not merely an event.
          </p>

          {/* animated value chain */}
          <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-4">
            {CHAIN.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2">
                <span className="rounded-full border border-royal-light/30 bg-royal-dim/50 px-3.5 py-2 text-xs text-paper">
                  {stage}
                </span>
                {i < CHAIN.length - 1 && (
                  <span className="text-gold-light/60">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono-label text-[11px] uppercase text-royal-light">Areas</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {AREAS.map((a) => (
                  <li key={a} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ash">{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono-label text-[11px] uppercase text-royal-light">Isaac's contribution</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ROLE.map((r) => (
                  <li key={r} className="rounded-full border border-gold/25 bg-gold/[0.06] px-3 py-1 text-xs text-gold-light">{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
