import ChapterOne from "@/components/chapters/ChapterOne";
import ChapterTwo from "@/components/chapters/ChapterTwo";
import ChapterThree from "@/components/chapters/ChapterThree";
import ChapterFour from "@/components/chapters/ChapterFour";
import ChapterFive from "@/components/chapters/ChapterFive";
import ChapterNav from "@/components/ChapterNav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import EasterEgg from "@/components/EasterEgg";
import CelestialBackdrop from "@/components/ui/CelestialBackdrop";

export default function Home() {
  return (
    <div className="portfolio-root">
      <CelestialBackdrop />
      <div className="relative z-10">
        <CustomCursor />
        <ScrollProgress />
        <EasterEgg />
        <ChapterNav />
        <Hero />
        <ChapterOne />
        <ChapterTwo />
        <ChapterThree />
        <ChapterFour />
        <ChapterFive />
        <Footer />
      </div>
    </div>
  );
}
