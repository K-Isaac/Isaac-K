import AmbientField from "./components/AmbientField";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Positioning from "./sections/Positioning";
import Capabilities from "./sections/Capabilities";
import FeaturedWork from "./sections/FeaturedWork";
import CreativeEconomy from "./sections/CreativeEconomy";
import Research from "./sections/Research";
import Knowledge from "./sections/Knowledge";
import Digital from "./sections/Digital";
import Institutions from "./sections/Institutions";
import Toolkit from "./sections/Toolkit";
import About from "./sections/About";
import Timeline from "./sections/Timeline";
import Presentations from "./sections/Presentations";
import CTA from "./sections/CTA";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="relative min-h-screen font-body text-paper">
      <AmbientField />
      <Nav />
      <main>
        <Hero />
        <Positioning />
        <Capabilities />
        <FeaturedWork />
        <CreativeEconomy />
        <Research />
        <Knowledge />
        <Digital />
        <Institutions />
        <Toolkit />
        <About />
        <Timeline />
        <Presentations />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
