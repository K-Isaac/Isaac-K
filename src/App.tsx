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

export default function App() {
  const route = useRoute();
  const [page, slug] = route.split("/");
  return (
    <div className="relative min-h-screen font-body text-paper">
      <AmbientField />
      <Nav route={route} />
      <main className={page === "home" || page === "about" || page === "publications" || page === "contact" ? "pt-14" : ""}>
        {page === "about" ? <><About /><Timeline /><Toolkit /></>
          : page === "portfolio" ? <Portfolio />
          : page === "blogs" ? <Blogs slug={slug} />
          : page === "publications" ? <><Research /><Knowledge /><Presentations /></>
          : page === "contact" ? <><CTA /><Contact /></>
          : page === "admin" ? <Admin />
          : <><Hero /><Positioning /><Capabilities /></>}
      </main>
      <Footer />
      <AIHub />
    </div>
  );
}
