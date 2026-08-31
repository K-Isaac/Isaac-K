const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#knowledge", label: "Knowledge" },
  { href: "#digital", label: "Digital" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-10">
        <span className="font-display text-2xl text-paper">IK</span>
        <div>
          <p className="text-sm text-paper">Isaac Kwizera</p>
          <p className="mt-1 font-mono-label text-[11px] uppercase text-ash-dim">
            Business · Research · Education · Digital · Creative Economy
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-5">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-xs text-ash hover:text-gold-light">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-ash-dim">© 2026 Isaac Kwizera. All rights reserved.</p>
      </div>
    </footer>
  );
}
