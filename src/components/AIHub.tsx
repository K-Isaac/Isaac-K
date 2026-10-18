import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { askTwin, smartSearch, type Hit } from "../lib/ai";

const MODES = ["Twin", "Search", "Match"] as const;
const HINT = { Twin: "Ask my AI twin anything…", Search: "Search my work…", Match: "What do you need? e.g. research, training" };

export default function AIHub() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<(typeof MODES)[number]>("Twin");
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [answer, setAnswer] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);

  async function go() {
    if (!q.trim()) return;
    setAnswer(""); setHits([]);
    if (mode === "Twin") { setBusy(true); setAnswer(await askTwin(q)); setBusy(false); }
    else setHits(smartSearch(q, mode === "Match" ? 3 : 6));
  }

  return (
    <>
      <button aria-label="Open AI assistant" onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-lg shadow-gold/30 transition hover:scale-105">
        {open ? <X size={22} /> : <Sparkles size={22} />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-3xl border border-white/10 bg-navy/95 p-4 shadow-2xl backdrop-blur-md">
          <div className="mb-3 flex gap-1 rounded-full bg-white/5 p-1">
            {MODES.map((m) => (
              <button key={m} onClick={() => { setMode(m); setAnswer(""); setHits([]); }}
                className={`flex-1 rounded-full py-1.5 text-xs font-semibold ${mode === m ? "bg-royal text-paper" : "text-ash"}`}>{m}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} placeholder={HINT[mode]}
              className="min-w-0 flex-1 rounded-full bg-white/5 px-4 py-2 text-sm text-paper outline-none placeholder:text-ash-dim" />
            <button aria-label="Send" onClick={go} className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink"><Send size={15} /></button>
          </div>
          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto text-sm text-paper/90">
            {busy && <p className="text-ash">Thinking…</p>}
            {answer && <p className="whitespace-pre-line">{answer}</p>}
            {hits.map((h) => (
              <a key={h.id} href="#/portfolio" onClick={() => setOpen(false)} className="block rounded-2xl bg-white/5 p-3 hover:bg-white/10">
                <span className="text-[10px] uppercase tracking-widest text-gold-light">{h.kind}</span>
                <span className="block font-semibold">{h.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
