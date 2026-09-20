import {} from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-navy pt-20 pb-10 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
        <div className="flex-1">
          <div className="text-2xl font-display font-bold tracking-widest text-brand-silver mb-6">
            NAKSHATRA<span className="text-brand-blue">.</span>
          </div>
          <p className="text-brand-silver/50 font-light max-w-sm text-sm leading-relaxed">
            The national aerospace hackathon fostering innovation and exploration for the next generation of space technology.
          </p>
        </div>
        
        <div className="flex gap-16 flex-wrap">
          <div>
            <h4 className="text-white font-mono text-xs tracking-widest mb-6">NAVIGATION</h4>
            <ul className="flex flex-col gap-3 text-sm text-brand-silver/60 font-light">
              <li><a href="#about" className="hover:text-brand-blue transition-colors">About</a></li>
              <li><a href="#challenges" className="hover:text-brand-blue transition-colors">Challenges</a></li>
              <li><a href="#schedule" className="hover:text-brand-blue transition-colors">Schedule</a></li>
              <li><a href="#rewards" className="hover:text-brand-blue transition-colors">Rewards</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-mono text-xs tracking-widest mb-6">LEGAL</h4>
            <ul className="flex flex-col gap-3 text-sm text-brand-silver/60 font-light">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Code of Conduct</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-brand-silver/30 text-xs font-mono">
        <div>&copy; 2026 NAKSHATRA. All rights reserved.</div>
        <div className="mt-4 md:mt-0 flex gap-6">
          <a href="#" className="hover:text-white transition-colors">TWITTER</a>
          <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
          <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
