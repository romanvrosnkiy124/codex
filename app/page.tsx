import Header from "../components/Header";
import AboutSection from "../components/AboutSection";
import CasesSection from "../components/CasesSection";
import EditorialMotion from "../components/EditorialMotion";
import FinalContactSection from "../components/FinalContactSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import MediaSection from "../components/MediaSection";
import PracticeAreas from "../components/PracticeAreas";
import ReviewsSection from "../components/ReviewsSection";
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
        <CasesSection />
        <EditorialMotion>
          <ReviewsSection />
          <MediaSection />
        </EditorialMotion>
        <FinalContactSection />
      </main>
      <Footer />
    </SiteMotion>
  );
}
