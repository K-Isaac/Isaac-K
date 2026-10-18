import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [["home", "Home"], ["about", "About"], ["portfolio", "Portfolio"], ["blogs", "Blogs"], ["publications", "Publications"]];

export default function Nav({ route }: { route: string }) {
  const [open, setOpen] = useState(false);
  const active = (k: string) => route === k || route.startsWith(k + "/");
  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/[0.06] bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <a href="#/home" className="font-display text-xl font-semibold text-paper">IK<span className="text-gold">.</span></a>
        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map(([k, l]) => (
            <a key={k} href={`#/${k}`} className={`text-sm font-semibold transition-colors ${active(k) ? "text-gold-light" : "text-ash hover:text-paper"}`}>{l}</a>
          ))}
          <a href="#/contact" className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-ink transition hover:bg-gold-light">Let's work together</a>
        </nav>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="text-paper lg:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 bg-ink/95 px-6 pb-5 lg:hidden">
          {[...LINKS, ["contact", "Let's work together"]].map(([k, l]) => (
            <a key={k} href={`#/${k}`} onClick={() => setOpen(false)} className="border-b border-white/5 py-3 text-ash hover:text-paper">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
