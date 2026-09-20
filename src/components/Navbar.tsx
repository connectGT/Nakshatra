import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Why Participate', href: '#why' },
    { name: 'Challenges', href: '#challenges' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Rewards', href: '#rewards' },
    { name: 'FAQs', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 h-[72px] md:h-[80px] flex items-center ${
        isScrolled
          ? 'bg-[#03060C]/90 backdrop-blur-md border-b border-brand-silver/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-[8vw] flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center z-50 h-full py-4 transition-opacity duration-300 hover:opacity-80">
          <img 
            src="/logo.svg" 
            alt="Nakshatra Logo" 
            className="h-7 md:h-8 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          {/* Text fallback ONLY visible if image fails to load */}
          <div className="hidden text-[17px] font-display font-bold tracking-[0.2em] text-[#E2E8F0] flex items-center gap-2">
            NAKSHATRA<span className="text-brand-blue">.</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center h-full">
          <ul className="flex space-x-10 text-[12px] font-medium tracking-wide text-brand-silver/50 mr-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-brand-silver transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <a
            href="#register"
            className="group relative text-[11px] font-mono tracking-[0.25em] text-brand-silver/70 hover:text-brand-blue transition-colors flex items-center gap-3 py-2"
          >
            REGISTER <span className="text-brand-blue/70 group-hover:translate-x-1 group-hover:text-brand-blue transition-all">→</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden z-50 text-brand-silver/70 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-[#03060C] flex flex-col items-center justify-center space-y-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ul className="flex flex-col items-center space-y-8 text-lg font-display tracking-[0.2em] text-brand-silver/70">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <a
            href="#register"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[11px] font-mono tracking-[0.25em] text-brand-blue mt-8 border border-brand-blue/20 px-8 py-3 hover:bg-brand-blue/10 transition-colors"
          >
            REGISTER NOW
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
