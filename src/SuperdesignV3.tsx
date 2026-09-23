// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './v3.css';

gsap.registerPlugin(ScrollTrigger);

export default function SuperdesignV3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [lokiDone, setLokiDone] = useState(false);

  useGSAP(() => {
    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    
    const onMouseMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    };
    window.addEventListener('mousemove', onMouseMove);

    // Hero Stagger Animations
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.hero-title span span', {
      y: 0,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.2
    }).to('.hero-stagger', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1
    }, "-=1");

    // Parallax Effects
    gsap.utils.toArray('.parallax-image').forEach(img => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -100,
        ease: "none"
      });
    });

    // Scroll Reveals
    gsap.utils.toArray('.scroll-reveal, .scroll-reveal-step').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Timeline Path Drawing
    gsap.to(".timeline-path", {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: "#timeline",
        start: "top center",
        end: "bottom bottom",
        scrub: 2
      }
    });

    // Counter Animation
    const counters = gsap.utils.toArray('.counter');
    counters.forEach(counter => {
      ScrollTrigger.create({
        trigger: counter,
        onEnter: () => {
          let target = parseInt(counter.getAttribute('data-target'));
          gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power4.out"
          });
        }
      });
    });

    // Nav Scroll Interaction
    ScrollTrigger.create({
      start: "top -50",
      onUpdate: (self) => {
        const nav = document.getElementById('main-nav');
        if (nav) {
          if (self.direction === 1) {
            nav.style.backgroundColor = "rgba(0,0,0,0.85)";
            nav.style.paddingTop = "1rem";
            nav.style.paddingBottom = "1rem";
            nav.style.backdropFilter = "blur(10px)";
          } else {
            if (self.scroll() < 50) {
              nav.style.backgroundColor = "transparent";
              nav.style.paddingTop = "1.5rem";
              nav.style.paddingBottom = "1.5rem";
              nav.style.backdropFilter = "none";
            }
          }
        }
      }
    });

    // 3D Tilt Effect on Track Boxes
    const trackBoxes = gsap.utils.toArray('.track-box');
    trackBoxes.forEach(box => {
      const handleMove = (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = (x - xc) / 20;
        const dy = (y - yc) / 20;
        box.style.transform = `translateY(-10px) rotateX(${-dy}deg) rotateY(${dx}deg)`;
      };
      const handleLeave = () => {
        box.style.transform = `translateY(0) rotateX(0) rotateY(0)`;
      };
      
      box.addEventListener('mousemove', handleMove);
      box.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, { scope: containerRef });

  useEffect(() => {
    // Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const closeDrawer = document.getElementById('close-drawer');
    const drawer = document.getElementById('mobile-drawer');

    const openMenu = () => {
      drawer?.classList.add('active');
      document.body.classList.add('mobile-menu-active');
    };
    
    const closeMenu = () => {
      drawer?.classList.remove('active');
      document.body.classList.remove('mobile-menu-active');
    };

    menuToggle?.addEventListener('click', openMenu);
    closeDrawer?.addEventListener('click', closeMenu);

    const links = drawer?.querySelectorAll('a');
    links?.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    return () => {
      menuToggle?.removeEventListener('click', openMenu);
      closeDrawer?.removeEventListener('click', closeMenu);
      links?.forEach(link => link.removeEventListener('click', closeMenu));
    };
  }, []);

  return (
    <div ref={containerRef} className="text-white bg-[#0a0a0c]">
      
  <div id="custom-cursor" className="custom-cursor hidden md:block"></div>
  <div id="custom-cursor-follower" className="custom-cursor-follower hidden md:block"></div>

  <div id="superdesign-root" className="min-h-screen relative">
    {/*  Navigation  */}
    <nav className="fixed top-0 w-full z-[100] py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-500" id="main-nav">
      <div className="flex items-center gap-4 md:gap-6"><img src="/assets/brand/nakshatra-logo.png" alt="Nakshatra Hackathon" className="h-10 md:h-12 w-auto transition-transform hover:scale-110 duration-500" /><div className="w-[1px] h-8 bg-white/30 hidden md:block"></div><img src="/assets/brand/club_logo.png" alt="Aerospace Club" className="h-10 md:h-12 w-auto transition-transform hover:scale-110 duration-500" /></div>
      
      <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
        <a href="#about" id="nav-about-link" className="hover:text-white transition-colors relative group">
          About<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#tracks" id="nav-tracks-link" className="hover:text-white transition-colors relative group">
          Tracks<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#timeline" id="nav-timeline-link" className="hover:text-white transition-colors relative group">
          Timeline<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#rewards" id="nav-rewards-link" className="hover:text-white transition-colors relative group">
          Rewards<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div className="flex items-center gap-6">
        <a href="https://unstop.com/p/nakshatra-the-aerospace-hackathon-2026-madhav-institute-of-technology-and-science-mits-gwalior-1751540" target="_blank" rel="noopener noreferrer" id="nav-cta-btn" className="hidden md:block bg-red-600 text-white px-8 py-3 font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 border border-transparent hover:border-black">Register Now</a>
        <button id="menu-toggle" className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle Menu">
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
        </button>
      </div>
    </nav>

    {/*  Mobile Drawer  */}
    <div id="mobile-drawer" className="fixed inset-0 z-[120] bg-black/95 flex flex-col items-center justify-center gap-8 lg:hidden">
      <button id="close-drawer" className="absolute top-8 right-8 text-white text-4xl">
        <iconify-icon icon="lucide:x"></iconify-icon>
      </button>
      <a href="#about" id="mob-nav-about" className="font-heading text-4xl font-black text-white hover:text-red-500">About</a>
      <a href="#tracks" id="mob-nav-tracks" className="font-heading text-4xl font-black text-white hover:text-red-500">Tracks</a>
      <a href="#timeline" id="mob-nav-timeline" className="font-heading text-4xl font-black text-white hover:text-red-500">Timeline</a>
      <a href="#rewards" id="mob-nav-rewards" className="font-heading text-4xl font-black text-white hover:text-red-500">Rewards</a>
      <a href="https://unstop.com/p/nakshatra-the-aerospace-hackathon-2026-madhav-institute-of-technology-and-science-mits-gwalior-1751540" target="_blank" rel="noopener noreferrer" id="mob-nav-reg" className="mt-8 bg-red-600 px-10 py-4 font-bold uppercase tracking-widest">Register Now</a>
        <div className="flex gap-8 mt-12">
          <a href="https://www.instagram.com/aerospace.mits/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-red-500 text-4xl transition-all"><iconify-icon icon="mdi:instagram"></iconify-icon></a>
          <a href="https://www.linkedin.com/in/aerospace-club-mits/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-red-500 text-4xl transition-all"><iconify-icon icon="mdi:linkedin"></iconify-icon></a>
        </div>
      </div>

    {/*  Hero Section  */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80 z-10"></div>
        <video src="/assets/hero-bg.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" id="hero-bg-video" />
      </div>
      
      <div className="relative z-20 text-center w-full px-6 pt-24 md:pt-0">
        <div className="mb-4 md:mb-8 overflow-hidden">
          <p className="hero-stagger text-red-500 font-bold uppercase tracking-[0.8em] text-[10px] md:text-xs">AEROSPACE PRESENTS</p>
        </div>
        
        <h1 className="font-heading fluid-h1 font-black mb-2 md:mb-6 leading-[0.85] text-white flex flex-col items-center hero-title">
            <span className="overflow-hidden block"><span className="inline-block translate-y-full">NAKSHATRA</span></span>
          </h1>
        
        <div className="overflow-hidden mb-8 md:mb-12">
            <p className="hero-stagger text-xl md:text-3xl font-bold tracking-[0.4em] text-white drop-shadow-2xl">THE AEROSPACE HACKATHON 2026</p>
          </div>

        <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-6 md:gap-16 mt-8 md:mt-12 hero-stagger opacity-0">
          <div className="group cursor-pointer">
            <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Location</span>
            <span className="font-bold text-lg border-b border-red-500 pb-1 group-hover:text-red-500 transition-colors">MITS, Gwalior</span>
          </div>
          <div className="group cursor-pointer">
            <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Capacity</span>
            <span className="font-bold text-lg border-b border-red-500 pb-1 group-hover:text-red-500 transition-colors">2-4 Members</span>
          </div>
          <div className="group cursor-pointer">
            <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Domains</span>
            <span className="font-bold text-lg border-b border-red-500 pb-1 group-hover:text-red-500 transition-colors">SW + HW</span>
          </div>
        </div>

        <div className="mt-10 md:mt-20 flex flex-wrap justify-center gap-4 md:gap-8 hero-stagger opacity-0">
          <a href="https://unstop.com/p/nakshatra-the-aerospace-hackathon-2026-madhav-institute-of-technology-and-science-mits-gwalior-1751540" target="_blank" rel="noopener noreferrer" id="cta-hero-primary" className="bg-red-600 px-6 py-3 md:px-12 md:py-5 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl hover:-translate-y-2">Register Now</a>
          <a href="#" id="cta-hero-secondary" className="backdrop-blur-md border border-white/20 px-6 py-3 md:px-12 md:py-5 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 hover:-translate-y-2">Explore Challenges</a>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
        <span className="text-[9px] uppercase tracking-[0.5em] mb-4">Initiate Descent</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>

    {/*  About Section  */}
    <section id="about" className="beige-section py-32 md:py-48 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="scroll-trigger">
            <h2 className="font-heading fluid-h2 font-black mb-12 text-black leading-none reveal-text">
              ABOUT<br /><span className="text-red-600">NAKSHATRA</span>
            </h2>
            <div className="w-32 h-[3px] bg-red-600 mb-12"></div>
            <p className="fluid-text leading-relaxed text-gray-800 mb-10 font-medium">
              NAKSHATRA is an aerospace-focused odyssey organized by the Aerospace Club, Madhav Institute of Technology & Science (MITS), Gwalior.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 md:pr-12">
              We provide a stellar platform for engineering minds to develop high-impact solutions through two specialized orbits: Software and Hardware. Join the ranks of future space innovators.
            </p>
            <div className="mt-16 flex gap-12">
              <div>
                <span className="block font-heading text-4xl font-black text-black">50+</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-600">Teams Qualified</span>
              </div>
              <div>
                <span className="block font-heading text-4xl font-black text-black">12H</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-600">Mission Duration</span>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="aspect-[4/5] bg-gray-900 overflow-hidden shadow-[40px_40px_0px_0px_rgba(230,57,70,0.1)] transition-transform duration-700 group-hover:scale-95">
              <img src="https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80" alt="Rocket" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-red-600 text-white p-8 md:p-12 hidden md:block rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <p className="font-heading text-5xl font-black">2026</p>
              <p className="text-[10px] uppercase tracking-widest font-black">Ignition Set</p>
            </div>
          </div>
        </div>
      </div>
      
      {/*  Background decorative element  */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
        <iconify-icon icon="lucide:rocket" className="text-[40rem] text-black -rotate-45"></iconify-icon>
      </div>
    </section>

    {/*  Stats  */}
    <section className="py-24 bg-[#0a0a0c] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
        <div className="text-center group">
          <span className="block text-red-600 text-5xl md:text-7xl font-heading font-black mb-4 group-hover:scale-110 transition-transform duration-500 counter" data-target="4">0</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold">Team Size Max</span>
        </div>
        <div className="text-center group">
          <span className="block text-red-600 text-5xl md:text-7xl font-heading font-black mb-4 group-hover:scale-110 transition-transform duration-500 counter" data-target="2">0</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold">Active Tracks</span>
        </div>
        <div className="text-center group">
          <span className="block text-red-600 text-5xl md:text-7xl font-heading font-black mb-4 group-hover:scale-110 transition-transform duration-500 counter" data-target="12">0</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold">Sprint Hours</span>
        </div>
        <div className="text-center group">
          <span className="block text-red-600 text-5xl md:text-7xl font-heading font-black mb-4 group-hover:scale-110 transition-transform duration-500">10K</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold">Total Rewards</span>
        </div>
      </div>
    </section>

    {/*  Tracks Section  */}
    <section id="tracks" className="py-32 md:py-48 px-6 md:px-12 bg-[#0f0f1b]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="text-red-600 font-bold uppercase tracking-[0.5em] text-xs mb-6 block">DOMAINS OF IMPACT</span>
            <h2 className="font-heading fluid-h2 font-black leading-[0.9]">SELECT YOUR<br />FLIGHT PATH</h2>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-xl">
            <p className="text-white/60 text-sm uppercase tracking-widest font-bold mb-2">Status</p>
            <p className="text-red-500 font-black tracking-tighter text-2xl">COMING SOON</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 perspective-1000">
          {/*  Software Track  */}
          <div className="track-box preserve-3d p-10 md:p-16 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:bg-white/[0.05] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <iconify-icon icon="lucide:code-2" className="text-[12rem]"></iconify-icon>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-red-600 flex items-center justify-center rounded-full">
                  <iconify-icon icon="lucide:code-2" className="text-3xl text-white"></iconify-icon>
                </div>
                <span className="font-heading text-lg font-black tracking-[0.3em]">TRACK 01</span>
              </div>
              
              <h3 className="font-heading text-4xl md:text-5xl font-black mb-8 group-hover:text-red-500 transition-colors">SOFTWARE</h3>
              <p className="text-white/50 text-lg leading-relaxed mb-12">
                Architect the digital future of aerospace. From AI-driven orbital mechanics to real-time satellite telemetry analysis.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-xs font-black tracking-widest text-white/80">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span> SPACE SYSTEMS & DATA
                </li>
                <li className="flex items-center gap-4 text-xs font-black tracking-widest text-white/80">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span> AI/ML FOR AEROSPACE
                </li>
                <li className="flex items-center gap-4 text-xs font-black tracking-widest text-white/80">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span> SIMULATION ENGINES
                </li>
              </ul>
            </div>
          </div>

          {/*  Hardware Track  */}
          <div className="track-box preserve-3d p-10 md:p-16 border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:bg-white/[0.05] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <iconify-icon icon="lucide:cpu" className="text-[12rem]"></iconify-icon>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 border-2 border-red-600 flex items-center justify-center rounded-full group-hover:bg-red-600 transition-colors duration-500">
                  <iconify-icon icon="lucide:cpu" className="text-3xl text-white"></iconify-icon>
                </div>
                <span className="font-heading text-lg font-black tracking-[0.3em]">TRACK 02</span>
              </div>
              
              <h3 className="font-heading text-4xl md:text-5xl font-black mb-8 group-hover:text-red-500 transition-colors">HARDWARE</h3>
              <p className="text-white/50 text-lg leading-relaxed mb-12">
                Engineer the physical vessels of discovery. Build prototypes for propulsion systems, UAVs, and resilient aerospace electronics.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-xs font-black tracking-widest text-white/80">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span> ROCKETRY & PROPULSION
                </li>
                <li className="flex items-center gap-4 text-xs font-black tracking-widest text-white/80">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span> UAV DESIGN & AUTONOMY
                </li>
                <li className="flex items-center gap-4 text-xs font-black tracking-widest text-white/80">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span> EMBEDDED SATELLITE HW
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  Timeline Section  */}
    <section id="timeline" className="py-32 md:py-48 px-6 md:px-12 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h2 className="font-heading fluid-h2 font-black mb-6">MISSION<br /><span className="text-red-600">TIMELINE</span></h2>
          <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold">From Ignition to Completion</p>
        </div>

        <div className="relative">
          {/*  Vertical Line  */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"></div>
          <svg className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] h-full -translate-x-1/2 z-10 pointer-events-none">
            <line x1="1" y1="0" x2="1" y2="100%" stroke="#e63946" strokeWidth="2" className="timeline-path" />
          </svg>

          <div className="space-y-32">
            {/*  Step 1  */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24 scroll-reveal-step">
              <div className="w-full md:w-1/2 md:text-right pl-12 md:pl-0 md:pr-12 group">
                <span className="text-red-600 font-heading text-lg font-black block mb-4 group-hover:tracking-[0.2em] transition-all">01. REGISTRATION</span>
                <p className="text-white/60 text-sm md:text-base max-w-md md:ml-auto leading-relaxed">
                  Assemble your team of 2-4 visionaries. Secure your slot in the grand constellation of aerospace innovators.
                </p>
                <span className="text-[10px] uppercase font-bold text-white/20 mt-6 block">20 SEP - 26 SEP 2026</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-600 absolute left-0 md:left-1/2 -translate-x-1/2 z-20 shadow-[0_0_20px_rgba(230,57,70,0.5)]"></div>
              <div className="hidden md:block w-1/2"></div>
            </div>

            {/*  Step 2  */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24 scroll-reveal-step">
              <div className="hidden md:block w-1/2"></div>
              <div className="w-8 h-8 rounded-full bg-black border-2 border-red-600 absolute left-0 md:left-1/2 -translate-x-1/2 z-20"></div>
              <div className="w-full md:w-1/2 pl-12 group">
                <span className="text-red-600 font-heading text-lg font-black block mb-4 group-hover:tracking-[0.2em] transition-all">02. PPT SUBMISSION</span>
                <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
                  Detail your proposed solution for Round 1. Cover technical architecture, innovation, and implementation roadmaps.
                </p>
                <span className="text-[10px] uppercase font-bold text-white/20 mt-6 block">30 SEP 2026 DEADLINE</span>
              </div>
            </div>

            {/*  Step 3  */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24 scroll-reveal-step">
              <div className="w-full md:w-1/2 md:text-right pl-12 md:pl-0 md:pr-12 group">
                <span className="text-red-600 font-heading text-lg font-black block mb-4 group-hover:tracking-[0.2em] transition-all">03. SHORTLISTING</span>
                <p className="text-white/60 text-sm md:text-base max-w-md md:ml-auto leading-relaxed">
                  Top 50 crews are selected based on feasibility and creative impact. Prepare for the final on-ground mission.
                </p>
                <span className="text-[10px] uppercase font-bold text-white/20 mt-6 block">15 OCTOBER 2026</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-black border-2 border-red-600 absolute left-0 md:left-1/2 -translate-x-1/2 z-20"></div>
              <div className="hidden md:block w-1/2"></div>
            </div>

            {/*  Step 4  */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24 scroll-reveal-step">
              <div className="hidden md:block w-1/2"></div>
              <div className="w-8 h-8 rounded-full bg-red-600 absolute left-0 md:left-1/2 -translate-x-1/2 z-20 animate-pulse shadow-[0_0_30px_rgba(230,57,70,0.8)]"></div>
              <div className="w-full md:w-1/2 pl-12 group">
                <span className="text-red-600 font-heading text-lg font-black block mb-4 group-hover:tracking-[0.2em] transition-all">04. FINAL MISSION</span>
                <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
                  A high-intensity 12-hour build at MITS Campus. From concept to functional reality under the watchful eyes of industry experts.
                </p>
                <span className="text-[10px] uppercase font-bold text-white/20 mt-6 block">24-25 OCTOBER 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  Rewards Section  */}
    <section id="rewards" className="py-32 md:py-48 bg-[#0a0a0c] px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="scroll-reveal">
            <span className="text-red-600 font-bold uppercase tracking-[0.4em] text-xs mb-8 block">MISSION INCENTIVES</span>
            <h2 className="font-heading fluid-h2 font-black leading-[0.9] mb-12">
              REWARDS FOR<br />INNOVATION
            </h2>
            
            <div className="bg-gradient-to-r from-red-600 to-red-900 p-[1px] mb-16">
              <div className="bg-[#0a0a0c] p-10 md:p-16">
                <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Cumulative Prize Pool</p>
                <div className="font-heading text-7xl md:text-9xl font-black text-white">₹10,000</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="border-l border-white/10 pl-6 group">
                <iconify-icon icon="lucide:award" className="text-4xl text-red-600 mb-4 group-hover:rotate-12 transition-transform"></iconify-icon>
                <h4 className="font-heading text-sm font-black mb-2">FINALIST PASS</h4>
                <p className="text-white/40 text-xs">Certificates for all qualified crews</p>
              </div>
              <div className="border-l border-white/10 pl-6 group">
                <iconify-icon icon="lucide:box" className="text-4xl text-red-600 mb-4 group-hover:rotate-12 transition-transform"></iconify-icon>
                <h4 className="font-heading text-sm font-black mb-2">SPACE GEAR</h4>
                <p className="text-white/40 text-xs">Exclusive hackathon kits for participants</p>
              </div>
            </div>
          </div>
          
          <div className="relative perspective-1000">
            <div className="aspect-[4/5] md:aspect-square group overflow-hidden bg-white/5">
              <img src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80" alt="Astronaut" className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="absolute inset-0 border border-white/10 pointer-events-none translate-x-8 translate-y-8 md:translate-x-12 md:translate-y-12"></div>
          </div>
        </div>
      </div>
    </section>

    {/*  FAQ  */}
    <section id="faq" className="beige-section py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-heading fluid-h2 font-black text-black leading-none mb-6">MISSION<br />QUERIES</h2>
          <p className="text-black/40 uppercase tracking-widest text-xs font-bold">FAQ - Frequently Asked Questions</p>
        </div>

        <div className="space-y-6">
          <details className="group bg-black/5 p-8 transition-all duration-300 hover:bg-black/10 cursor-pointer">
            <summary className="font-heading text-xl md:text-2xl font-black flex justify-between items-center list-none text-black">
              WHO CAN JOIN THE CREW?
              <iconify-icon icon="lucide:plus" className="group-open:rotate-45 transition-transform duration-300 text-red-600"></iconify-icon>
            </summary>
            <div className="mt-6 text-gray-700 leading-relaxed max-w-2xl pr-8">
              Open to all university students across disciplines—Engineering, Sciences, Arts, Management, and beyond. If you have a passion for space, you have a place.
            </div>
          </details>
          
          <details className="group bg-black/5 p-8 transition-all duration-300 hover:bg-black/10 cursor-pointer">
            <summary className="font-heading text-xl md:text-2xl font-black flex justify-between items-center list-none text-black">
              TEAM COMPOSITION?
              <iconify-icon icon="lucide:plus" className="group-open:rotate-45 transition-transform duration-300 text-red-600"></iconify-icon>
            </summary>
            <div className="mt-6 text-gray-700 leading-relaxed max-w-2xl pr-8">
              Teams must consist of 2 to 4 members. Inter-college and inter-branch collaborations are highly encouraged to foster diverse thinking.
            </div>
          </details>

          <details className="group bg-black/5 p-8 transition-all duration-300 hover:bg-black/10 cursor-pointer">
            <summary className="font-heading text-xl md:text-2xl font-black flex justify-between items-center list-none text-black">
              THE SELECTION PROCESS?
              <iconify-icon icon="lucide:plus" className="group-open:rotate-45 transition-transform duration-300 text-red-600"></iconify-icon>
            </summary>
            <div className="mt-6 text-gray-700 leading-relaxed max-w-2xl pr-8">
              Round 1 is a remote PPT submission. Based on innovation and technical depth, 50 teams will be invited to the 12-hour offline hackathon at MITS, Gwalior.
            </div>
          </details>
        </div>
      </div>
    </section>

    {/*  Final CTA  */}
    <section className="relative py-48 md:py-64 flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale opacity-20 scale-125 parallax-image" alt="Galaxy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>
      <div className="relative z-10 text-center max-w-5xl px-6">
        <h2 className="font-heading fluid-h1 font-black mb-12 leading-[0.8] tracking-tighter">
          THE SKY IS<br />NOT THE <span className="text-red-600">LIMIT.</span>
        </h2>
        <p className="text-lg md:text-2xl text-white/40 mb-16 font-light tracking-[0.3em] uppercase">
          Be the architect of humanity's next leap.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8">
          <a href="https://unstop.com/p/nakshatra-the-aerospace-hackathon-2026-madhav-institute-of-technology-and-science-mits-gwalior-1751540" target="_blank" rel="noopener noreferrer" id="final-cta-primary" className="bg-red-600 px-16 py-6 font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(230,57,70,0.5)]">Register Now</a>
          <a href="#" id="final-cta-secondary" className="backdrop-blur-xl border border-white/20 px-16 py-6 font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">Event Deck</a>
        </div>
      </div>
    </section>

    {/*  Footer  */}
    <footer className="bg-black py-24 border-t border-white/5 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 md:gap-6 mb-12"><img src="/assets/brand/nakshatra-logo.png" alt="Nakshatra Hackathon" className="h-12 md:h-16 w-auto" /><div className="w-[1px] h-10 bg-white/30 hidden md:block"></div><img src="/assets/brand/club_logo.png" alt="Aerospace Club" className="h-12 md:h-16 w-auto" /></div>
            <p className="text-white/30 max-w-md mb-12 text-base leading-relaxed">
              An aerospace pioneering initiative by the Aerospace Club, MITS Gwalior. Pushing student boundaries toward the final frontier.
            </p>
            <div className="flex gap-8">
                <a href="https://www.instagram.com/aerospace.mits/" target="_blank" rel="noopener noreferrer" id="social-ig" className="text-white/30 hover:text-red-600 text-3xl transition-all hover:-translate-y-1"><iconify-icon icon="mdi:instagram"></iconify-icon></a>
                <a href="https://www.linkedin.com/in/aerospace-club-mits/" target="_blank" rel="noopener noreferrer" id="social-li" className="text-white/30 hover:text-red-600 text-3xl transition-all hover:-translate-y-1"><iconify-icon icon="mdi:linkedin"></iconify-icon></a>
              </div>
          </div>
          
          <div>
            <h4 className="font-heading text-xs font-bold tracking-[0.3em] text-white/50 mb-10 uppercase">Orbital Links</h4>
            <ul className="space-y-6">
              <li><a href="#about" id="footer-link-about" className="text-white/30 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">About Hackathon</a></li>
              <li><a href="#tracks" id="footer-link-tracks" className="text-white/30 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">Mission Tracks</a></li>
              <li><a href="#timeline" id="footer-link-time" className="text-white/30 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">Mission Timeline</a></li>
              <li><a href="#faq" id="footer-link-faq" className="text-white/30 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">Mission FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold tracking-[0.3em] text-white/50 mb-10 uppercase">Base Contact</h4>
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-white/20 mb-2">Project Lead</p>
                <p className="text-white/60 text-sm">Shreya Goyal</p>
                <a href="mailto:shreyagoyal401@gmail.com" id="footer-email-link" className="text-red-600 hover:text-white transition-colors text-sm">shreyagoyal401@gmail.com</a>
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-white/20 mb-2">Location</p>
                <p className="text-white/60 text-sm">MITS Campus, Gwalior<br />Madhya Pradesh, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/10 text-[10px] uppercase font-black tracking-[0.4em]">
            © 2026 Aerospace Club MITS. Ground Control Systems Active.
          </p>
          <div className="flex gap-10">
            <a href="#" id="legal-privacy" className="text-white/10 hover:text-white transition-colors text-[9px] uppercase font-black tracking-[0.3em]">Privacy</a>
            <a href="#" id="legal-terms" className="text-white/10 hover:text-white transition-colors text-[9px] uppercase font-black tracking-[0.3em]">Terms</a>
            <a href="#" id="legal-conduct" className="text-white/10 hover:text-white transition-colors text-[9px] uppercase font-black tracking-[0.3em]">Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  </div>

    </div>
  );
}



























































