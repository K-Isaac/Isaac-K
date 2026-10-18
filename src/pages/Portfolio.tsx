import { useState } from "react";
import { smartSearch } from "../lib/ai";
import { projects } from "../data/projects";
import FeaturedWork from "../sections/FeaturedWork";
import CreativeEconomy from "../sections/CreativeEconomy";
import Digital from "../sections/Digital";
import Institutions from "../sections/Institutions";

const CHIPS = ["Research", "Training", "Creative economy", "Digital product", "Partnerships"];

export default function Portfolio() {
  const [q, setQ] = useState("");
  const match = smartSearch(q, 3).filter((h) => h.kind === "Project").map((h) => projects.find((p) => p.id === h.id)!);
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="font-display text-5xl text-paper">What do you need?</h1>
        <p className="mt-3 text-ash">Pick one, and the portfolio reshapes around you.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {CHIPS.map((c) => (
            <button key={c} onClick={() => setQ(q === c ? "" : c)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${q === c ? "bg-gold text-ink" : "bg-white/5 text-ash hover:text-paper"}`}>{c}</button>
          ))}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="…or type your own" className="mt-4 w-full max-w-md rounded-full bg-white/5 px-5 py-3 text-center text-paper outline-none placeholder:text-ash-dim" />
        {q && (
          <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
            {match.length ? match.map((p) => (
              <div key={p.id} className="rounded-3xl border border-gold/30 bg-gold/[0.06] p-4">
                <p className="text-[10px] uppercase tracking-widest text-gold-light">Matched for you</p>
                <p className="mt-1 font-display text-lg text-paper">{p.title}</p>
                <p className="mt-1 text-xs text-ash">{p.role}</p>
              </div>
            )) : <p className="text-ash sm:col-span-3 text-center">No close match, so scroll the full portfolio below or let's talk.</p>}
          </div>
        )}
      </section>
      <FeaturedWork /><CreativeEconomy /><Digital /><Institutions />
    </div>
  );
}
