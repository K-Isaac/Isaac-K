import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "./supabase";

export type Section = { id: string; page: string; parent_id: string | null; title: string; body: string; position: number; visible: boolean };
/** Built-in sections (from code) that the backend can show or hide, per page. */
export const BUILTINS: Record<string, string[]> = {
  home: ["home.hero", "home.positioning", "home.capabilities"],
  about: ["about.about", "about.timeline", "about.toolkit"],
  portfolio: ["portfolio.featured", "portfolio.creative", "portfolio.digital", "portfolio.institutions"],
  publications: ["publications.research", "publications.knowledge", "publications.presentations"],
  contact: ["contact.cta", "contact.contact"],
};
type Ctx = { sections: Section[]; hidden: string[]; reload: () => Promise<void> };
const SiteCtx = createContext<Ctx>({ sections: [], hidden: [], reload: async () => {} });
export const useSite = () => useContext(SiteCtx);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [hidden, setHidden] = useState<string[]>([]);
  const reload = useCallback(async () => {
    if (!supabase) return;
    const s = await supabase.from("sections").select("*").order("position");
    const h = await supabase.from("settings").select("value").eq("key", "hidden_builtins").maybeSingle();
    setSections((s.data as Section[]) ?? []);
    setHidden((h.data?.value as string[]) ?? []);
  }, []);
  useEffect(() => { reload(); }, [reload]);
  return <SiteCtx.Provider value={{ sections, hidden, reload }}>{children}</SiteCtx.Provider>;
}

export function Builtin({ id, children }: { id: string; children: ReactNode }) {
  const { hidden } = useSite();
  return hidden.includes(id) ? null : <>{children}</>;
}
