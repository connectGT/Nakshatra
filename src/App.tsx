import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyParticipate from './components/WhyParticipate';
import Challenges from './components/Challenges';
import Schedule from './components/Schedule';
import Rewards from './components/Rewards';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import StarfieldCanvas from './components/StarfieldCanvas';
import ScrollProgress from './components/ScrollProgress';
import StarDivider from './components/StarDivider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="bg-[#020408] min-h-screen text-brand-silver relative">
      {/* Global persistent starfield — behind everything */}
      <StarfieldCanvas />
      {/* Scroll progress bar */}
      <ScrollProgress />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <StarDivider />
        <About />
        <StarDivider />
        <WhyParticipate />
        <StarDivider />
        <Challenges />
        <StarDivider />
        <Schedule />
        <StarDivider />
        <Rewards />
        <StarDivider />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
