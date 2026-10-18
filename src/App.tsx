import AmbientField from "./components/AmbientField";
import Nav from "./components/Nav";
import AIHub from "./components/AIHub";
import { useRoute } from "./lib/useRoute";
import Hero from "./sections/Hero";
import Positioning from "./sections/Positioning";
import Capabilities from "./sections/Capabilities";
import About from "./sections/About";
import Timeline from "./sections/Timeline";
import Toolkit from "./sections/Toolkit";
import Research from "./sections/Research";
import Knowledge from "./sections/Knowledge";
import Presentations from "./sections/Presentations";
import CTA from "./sections/CTA";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Portfolio from "./pages/Portfolio";
import Blogs from "./pages/Blogs";
import Admin from "./pages/Admin";
import DynamicSections from "./components/DynamicSections";
import { SiteProvider, Builtin } from "./lib/site";
import type { ReactNode } from "react";
const B = ({ id, children }: { id: string; children: ReactNode }) => <Builtin id={id}>{children}</Builtin>;

export default function App() {
  const route = useRoute();
  const [page, slug] = route.split("/");
  return (
    <SiteProvider>
    <div className="relative min-h-screen font-body text-paper">
      <AmbientField />
      <Nav route={route} />
      <main className={page === "home" || page === "about" || page === "publications" || page === "contact" ? "pt-14" : ""}>
        {page === "about" ? <><B id="about.about"><About /></B><B id="about.timeline"><Timeline /></B><B id="about.toolkit"><Toolkit /></B><DynamicSections page="about" /></>
          : page === "portfolio" ? <Portfolio />
          : page === "blogs" ? <Blogs slug={slug} />
          : page === "publications" ? <><B id="publications.research"><Research /></B><B id="publications.knowledge"><Knowledge /></B><B id="publications.presentations"><Presentations /></B><DynamicSections page="publications" /></>
          : page === "contact" ? <><B id="contact.cta"><CTA /></B><B id="contact.contact"><Contact /></B><DynamicSections page="contact" /></>
          : page === "admin" ? <Admin />
          : <><B id="home.hero"><Hero /></B><B id="home.positioning"><Positioning /></B><B id="home.capabilities"><Capabilities /></B><DynamicSections page="home" /></>}
      </main>
      <Footer />
      <AIHub />
    </div>
    </SiteProvider>
  );
}
