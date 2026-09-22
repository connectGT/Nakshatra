import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyParticipate from './components/WhyParticipate';
import Challenges from './components/Challenges';
import Timeline from './components/Timeline';
import Rewards from './components/Rewards';
import Criteria from './components/Criteria';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// @ts-nocheck
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay"></div>
      <div className="main-frame bg-[#242323] relative w-full overflow-hidden">
        <Navbar />
      <Hero />
      <About />
      <WhyParticipate />
      <Challenges />
      <Timeline />
      <Rewards />
      <Criteria />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
    </>
  );
}
