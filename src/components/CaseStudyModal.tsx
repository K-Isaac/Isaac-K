import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Project } from "../data/types";

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const cs = project.caseStudy;

  const blocks: { label: string; content: React.ReactNode }[] = [
    { label: "The Problem", content: <p>{cs.problem}</p> },
    { label: "The Opportunity", content: <p>{cs.opportunity}</p> },
    { label: "The Approach", content: <p>{cs.approach}</p> },
    {
      label: "My Role",
      content: (
        <ul className="flex flex-wrap gap-2">
          {cs.role.map((r) => (
            <li key={r} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ash">
              {r}
            </li>
          ))}
        </ul>
      ),
    },
    ...(cs.partners.length
      ? [{
          label: "Partners",
          content: (
            <ul className="flex flex-wrap gap-2">
              {cs.partners.map((p) => (
                <li key={p} className="rounded-full border border-gold/25 bg-gold/[0.06] px-3 py-1 text-xs text-gold-light">
                  {p}
                </li>
              ))}
            </ul>
          ),
        }]
      : []),
    {
      label: "Output",
      content: (
        <ul className="space-y-1.5">
          {cs.output.map((o) => (
            <li key={o} className="flex gap-2 text-sm text-ash">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
              {o}
            </li>
          ))}
        </ul>
      ),
    },
    ...(cs.outcome?.length
      ? [{
          label: "Traction / Outcome",
          content: (
            <ul className="space-y-1.5">
              {cs.outcome.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-ash">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-royal-light" />
                  {o}
                </li>
              ))}
            </ul>
          ),
        }]
      : []),
    ...(cs.tools?.length
      ? [{
          label: "Tools",
          content: (
            <ul className="flex flex-wrap gap-2">
              {cs.tools.map((t) => (
                <li key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono-label text-[10px] text-ash">
                  {t}
                </li>
              ))}
            </ul>
          ),
        }]
      : []),
    ...(cs.documents?.length
      ? [{
          label: "Documents",
          content: (
            <div className="flex flex-wrap gap-3">
              {cs.documents.map((d) => (
                <a key={d.href} href={d.href} className="text-sm text-gold-light underline underline-offset-4">
                  {d.label}
                </a>
              ))}
            </div>
          ),
        }]
      : []),
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="my-8 w-full max-w-3xl rounded-3xl border border-white/10 bg-navy shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-3xl border-b border-white/10 bg-navy/95 p-7 backdrop-blur">
          <div>
            <p className="font-mono-label text-[11px] uppercase text-gold-light">{project.category}</p>
            <h3 className="mt-2 font-display text-2xl text-paper sm:text-3xl">{project.title}</h3>
            <p className="mt-1 text-xs text-ash-dim">{project.status} · {project.year}</p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close case study"
            className="shrink-0 rounded-full border border-white/10 p-2 text-ash hover:border-gold/40 hover:text-gold-light"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-8 p-7">
          {blocks.map((b) => (
            <div key={b.label}>
              <p className="font-mono-label text-[11px] uppercase text-royal-light">{b.label}</p>
              <div className="mt-3 text-sm leading-relaxed text-ash">{b.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
