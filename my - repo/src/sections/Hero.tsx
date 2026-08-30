import { ArrowRight, Download } from "lucide-react";
import EvidenceFlow from "../components/EvidenceFlow";

const CAPS = [
  { label: "Business", detail: "Programme design · Partnerships · Business development · Growth" },
  { label: "Research", detail: "Mixed methods · Evidence synthesis · Policy research · Data analysis" },
  { label: "Digital", detail: "Digital products · Information architecture · Content strategy · AI-enabled workflows" },
];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10">
        <div className="animate-fadeUp">
          <p className="font-mono-label text-xs uppercase text-gold-light">
            Kwizera Isaac · Kigali, Rwanda
          </p>

          <h1 className="mt-6 font-display text-balance text-5xl font-medium leading-[1.05] text-paper sm:text-6xl lg:text-[4.2rem]">
            Evidence goes in.
            <br />
            <span className="italic text-gold-light">Solutions</span> come out.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
            I'm Isaac Kwizera — a business development and development practitioner
            working across business, education, research, digital products and the
            creative economy. I turn evidence and market opportunities into
            programmes, partnerships, knowledge products and practical solutions.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono-label text-xs uppercase text-ink transition-transform hover:-translate-y-0.5"
            >
              Explore My Work
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/isaac-kwizera-cv.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono-label text-xs uppercase text-paper transition-colors hover:border-gold/50 hover:text-gold-light"
            >
              <Download size={14} />
              Download CV
            </a>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {CAPS.map((c) => (
              <div key={c.label} className="border-l border-white/10 pl-4">
                <p className="font-mono-label text-[11px] uppercase text-gold-light">{c.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-ash-dim">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-royal/25 via-transparent to-gold/10 blur-2xl" />
            <div className="relative aspect-[4/5] w-64 overflow-hidden rounded-[2.5rem] border border-white/10 bg-navy-2 sm:w-80">
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(85,120,204,0.35),transparent_55%)]">
                <span className="font-display text-7xl font-medium text-gold-light/80">IK</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-ink/60 px-4 py-3 backdrop-blur-sm">
                <p className="font-mono-label text-[10px] uppercase text-ash">Portrait placeholder</p>
              </div>
            </div>
          </div>
          <EvidenceFlow />
        </div>
      </div>
    </section>
  );
}
