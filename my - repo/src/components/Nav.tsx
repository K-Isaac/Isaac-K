import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#knowledge", label: "Knowledge" },
  { href: "#digital", label: "Digital" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="group flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-paper">
            IK
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-gold sm:block" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono-label text-[11px] uppercase text-ash transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-gold/40 bg-gold/[0.08] px-5 py-2 font-mono-label text-[11px] uppercase text-gold-light transition-colors hover:bg-gold/20 lg:block"
        >
          Let's Work Together
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="text-paper lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`overflow-hidden bg-ink/97 backdrop-blur-md transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[26rem]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 font-mono-label text-xs uppercase text-ash hover:text-paper"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-center font-mono-label text-xs uppercase text-gold-light"
          >
            Let's Work Together
          </a>
        </nav>
      </div>
    </header>
  );
}
