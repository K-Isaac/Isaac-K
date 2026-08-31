import { Mail, Link2, Phone, Download } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/[0.06] py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal className="text-center">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-medium text-paper sm:text-5xl">Isaac Kwizera</h2>
          <p className="mt-2 text-ash">Kigali, Rwanda</p>
        </Reveal>

        <Reveal delay={120} className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:kwisaac47@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono-label text-xs uppercase text-ink"
          >
            <Mail size={15} /> Email Isaac
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono-label text-xs uppercase text-paper hover:border-gold/40 hover:text-gold-light"
          >
            <Link2 size={15} /> Connect on LinkedIn
          </a>
          <a
            href="/isaac-kwizera-cv.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-mono-label text-xs uppercase text-paper hover:border-gold/40 hover:text-gold-light"
          >
            <Download size={15} /> Download CV
          </a>
        </Reveal>

        <Reveal delay={200} className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-ash-dim">
          <span className="inline-flex items-center gap-2"><Mail size={14} /> kwisaac47@gmail.com</span>
          <span className="inline-flex items-center gap-2"><Phone size={14} /> +250 789 314 057</span>
        </Reveal>
      </div>
    </section>
  );
}
