import { Briefcase, Layers, Microscope, GraduationCap, MonitorSmartphone, Leaf } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";

const CARDS = [
  {
    icon: Briefcase,
    title: "Business Development",
    desc: "Market opportunity identification, partnerships, positioning, growth strategies and new income avenues.",
  },
  {
    icon: Layers,
    title: "Programme Design",
    desc: "Turning ideas into structured programmes, curricula, delivery models, implementation plans and scalable initiatives.",
  },
  {
    icon: Microscope,
    title: "Research & Evidence",
    desc: "Research design, mixed-method research, evidence synthesis, data analysis, qualitative research and policy-oriented research.",
  },
  {
    icon: GraduationCap,
    title: "Education & Workforce Development",
    desc: "Training programmes, international education, youth development, employability and professional development initiatives.",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Products",
    desc: "Information architecture, content strategy, digital product structuring, website requirements and AI-enabled workflows.",
  },
  {
    icon: Leaf,
    title: "Creative Economy & Sustainability",
    desc: "Creative-sector initiatives, cultural ventures, climate, green-transition and sustainability-oriented programmes.",
  },
];

export default function Capabilities() {
  return (
    <section className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight text-paper sm:text-5xl">
            What I can build with you
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-white/10 bg-navy/40 p-7 transition-colors hover:border-gold/30 hover:bg-navy-2/60">
                <c.icon className="text-gold-light" size={26} strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-xl text-paper">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
