import Header from "../components/Header";
import AboutSection from "../components/AboutSection";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import PracticeAreas from "../components/PracticeAreas";
import SiteMotion from "../components/SiteMotion";
import SmoothScroll from "../components/SmoothScroll";
import TrustStrip from "../components/TrustStrip";

export default function Home() {
  return (
    <SiteMotion>
      <SmoothScroll />
      <Intro />
      <a className="skip-link" href="#main">Перейти к содержимому</a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <PracticeAreas />
        <AboutSection />
      </main>
    </SiteMotion>
  );
}
