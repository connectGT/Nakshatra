// @ts-nocheck
import React from "react";

export default function SuperdesignLanding() {
  return (
    <>


<div className="main-frame bg-[#020617] relative">
  
  {/*  Navigation  */}
  <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] z-50 bg-black/20 backdrop-blur-md rounded-full border border-white/5 py-4 px-8 flex items-center justify-between">
    <a href="#" id="nav-brand-logo" className="font-tanker text-2xl tracking-widest text-white">NAKSHATRA</a>
    <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
      <a href="#hero" id="nav-home-link" className="text-white border-b border-white pb-1">Home</a>
      <a href="#about" id="nav-about-link" className="hover:text-white transition-colors">About</a>
      <a href="#tracks" id="nav-tracks-link" className="hover:text-white transition-colors">Challenges</a>
      <a href="#timeline" id="nav-timeline-link" className="hover:text-white transition-colors">Timeline</a>
      <a href="#faq" id="nav-faq-link" className="hover:text-white transition-colors">FAQ</a>
      <a href="#contact" id="nav-contact-link" className="hover:text-white transition-colors">Contact</a>
    </div>
    <button className="md:hidden text-2xl"><iconify-icon icon="lucide:menu"></iconify-icon></button>
  </nav>

  {/*  Hero Section  */}
  <header id="hero" className="relative min-h-screen hero-bg flex flex-col items-center justify-center text-center px-6 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 z-0"></div>
    
    {/*  Main Headline Background Overlays  */}
    <div className="relative z-10 w-full">
      <div className="animate-in fade-in zoom-in duration-1000">
         <h1 className="massive-text font-tanker text-white uppercase font-bold drop-shadow-2xl mb-2">NAKSHATRA</h1>
         <p className="text-lg md:text-xl font-medium tracking-widest text-white/90 max-w-2xl mx-auto italic mb-10">
           "The term NAKSHATRA refers to the celestial constellations that guide our journey."
         </p>
         <a href="#register" id="hero-cta-btn" className="inline-flex items-center justify-center px-12 py-5 bg-[#0062ff] text-white text-base font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(0,98,255,0.4)]">
           REGISTER NOW
         </a>
      </div>
    </div>

    {/*  Quick Stats  */}
    <div className="absolute bottom-16 w-full flex justify-center gap-12 z-10 hidden lg:flex">
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Team Size</p>
        <p className="text-xl font-tanker">2-4 Members</p>
      </div>
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Tracks</p>
        <p className="text-xl font-tanker">Software + Hardware</p>
      </div>
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Location</p>
        <p className="text-xl font-tanker">MITS Gwalior</p>
      </div>
    </div>
  </header>

  {/*  About Section  */}
  <section id="about" className="py-32 px-10 md:px-20 relative bg-[#020617]">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-8">
        <h2 className="text-sm uppercase tracking-[0.5em] text-[#00f0ff] font-bold">About Nakshatra</h2>
        <h3 className="text-5xl md:text-6xl font-tanker leading-[0.9]">Defining the <br />Next Horizon.</h3>
        <p className="text-white/60 text-lg leading-relaxed max-w-xl">
          NAKSHATRA is an aerospace-focused hackathon organised by the Aerospace Club, Madhav Institute of Technology & Science (MITS), Gwalior. We bring together students to innovate and solve challenges across space, astronomy, aeronautics, and aerospace technology.
        </p>
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <iconify-icon icon="lucide:cpu" className="text-3xl text-[#00f0ff] mb-4"></iconify-icon>
            <h4 className="font-tanker text-xl">Hardware</h4>
            <p className="text-sm text-white/40">Physical systems & robotics</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <iconify-icon icon="lucide:binary" className="text-3xl text-[#00f0ff] mb-4"></iconify-icon>
            <h4 className="font-tanker text-xl">Software</h4>
            <p className="text-sm text-white/40">Algorithms & simulations</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <div className="absolute -inset-4 bg-[#0062ff]/20 rounded-[4rem] blur-2xl group-hover:bg-[#0062ff]/30 transition-all"></div>
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" className="relative w-full aspect-square object-cover rounded-[3rem] border border-white/10" alt="Aerospace Tech" />
      </div>
    </div>
  </section>

  {/*  Why Participate  */}
  <section className="py-32 bg-white text-black px-10 md:px-20">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <h2 className="text-7xl md:text-8xl font-tanker leading-none uppercase">Why <br />Join?</h2>
        <p className="max-w-md text-lg text-black/60 font-medium">
          Engage with aerospace problem statements and build innovative solutions that push boundaries.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-10 border border-black/5 rounded-[2.5rem] bg-slate-50 group hover:bg-black hover:text-white transition-all duration-500">
          <h4 className="text-3xl font-tanker mb-6">01 / Explore</h4>
          <p className="opacity-60 text-sm">Engage with aerospace-focused problem statements across space, astronomy, and aeronautics.</p>
        </div>
        <div className="p-10 border border-black/5 rounded-[2.5rem] bg-slate-50 group hover:bg-black hover:text-white transition-all duration-500">
          <h4 className="text-3xl font-tanker mb-6">02 / Build</h4>
          <p className="opacity-60 text-sm">Develop innovative solutions for a selected aerospace problem statement pushing limits.</p>
        </div>
        <div className="p-10 border border-black/5 rounded-[2.5rem] bg-slate-50 group hover:bg-black hover:text-white transition-all duration-500">
          <h4 className="text-3xl font-tanker mb-6">03 / Team Up</h4>
          <p className="opacity-60 text-sm">Work with teammates across colleges and specialisations in inter-disciplinary teams.</p>
        </div>
        <div className="p-10 border border-black/5 rounded-[2.5rem] bg-slate-50 group hover:bg-black hover:text-white transition-all duration-500">
          <h4 className="text-3xl font-tanker mb-6">04 / Present</h4>
          <p className="opacity-60 text-sm">Present your solution during the Final Round before the judging panel of experts.</p>
        </div>
      </div>
    </div>
  </section>

  {/*  Mission Tracks  */}
  <section id="tracks" className="py-32 px-10 md:px-20 bg-[#020617] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0062ff]/10 rounded-full blur-[120px]"></div>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-sm uppercase tracking-[0.5em] text-[#00f0ff] font-bold mb-6">Specializations</h2>
        <h3 className="text-6xl md:text-8xl font-tanker">Mission Tracks</h3>
        <p className="text-white/40 mt-4 tracking-widest uppercase text-xs">Problem statements launching soon</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative group">
           <div className="p-16 rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#0062ff]/50 transition-all duration-700">
             <iconify-icon icon="lucide:code" className="text-6xl text-white/20 mb-10 group-hover:text-[#0062ff] transition-colors"></iconify-icon>
             <h4 className="text-4xl font-tanker mb-6">SOFTWARE TRACK</h4>
             <p className="text-white/50 text-lg leading-relaxed mb-10">Develop software-based solutions for navigation systems, orbital calculations, or deep-space communication simulations.</p>
             <div className="flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full w-fit">
               <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
               <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Select this vertical</span>
             </div>
           </div>
        </div>
        <div className="relative group">
           <div className="p-16 rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#0062ff]/50 transition-all duration-700">
             <iconify-icon icon="lucide:wrench" className="text-6xl text-white/20 mb-10 group-hover:text-[#0062ff] transition-colors"></iconify-icon>
             <h4 className="text-4xl font-tanker mb-6">HARDWARE TRACK</h4>
             <p className="text-white/50 text-lg leading-relaxed mb-10">Engineered physical prototypes, avionics, sensor arrays, or scale-model propulsion mechanisms for flight testing.</p>
             <div className="flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full w-fit">
               <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
               <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Select this vertical</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  </section>

  {/*  Operation Protocol  */}
  <section className="py-32 bg-[#020617] border-y border-white/5">
    <div className="max-w-7xl mx-auto px-10">
      <h2 className="text-4xl font-tanker mb-16 text-center">Operation Protocol</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0062ff]/20 flex items-center justify-center mx-auto text-xl font-bold">01</div>
          <h5 className="text-[11px] font-bold uppercase tracking-widest">Register</h5>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-xl font-bold opacity-40">02</div>
          <h5 className="text-[11px] font-bold uppercase tracking-widest opacity-40">Choose</h5>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-xl font-bold opacity-40">03</div>
          <h5 className="text-[11px] font-bold uppercase tracking-widest opacity-40">Submit PPT</h5>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-xl font-bold opacity-40">04</div>
          <h5 className="text-[11px] font-bold uppercase tracking-widest opacity-40">Shortlist</h5>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-xl font-bold opacity-40">05</div>
          <h5 className="text-[11px] font-bold uppercase tracking-widest opacity-40">Hackathon</h5>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-xl font-bold opacity-40">06</div>
          <h5 className="text-[11px] font-bold uppercase tracking-widest opacity-40">Present</h5>
        </div>
      </div>
    </div>
  </section>

  {/*  Timeline  */}
  <section id="timeline" className="py-32 px-10 md:px-20 bg-[#020617]">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-20">
        <h3 className="text-5xl font-tanker">Chronology</h3>
        <span className="px-4 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-widest">UTC+5:30</span>
      </div>
      
      <div className="space-y-4">
        <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-8">
            <div className="text-4xl font-tanker text-white/20 group-hover:text-[#00f0ff] transition-colors">SEP 20</div>
            <div>
              <h5 className="text-xl font-bold uppercase tracking-wide">Round 1 Induction</h5>
              <p className="text-white/40 text-sm">Problem statements launched. 12:00 AM IST</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Live</span>
            <iconify-icon icon="lucide:chevron-right"></iconify-icon>
          </div>
        </div>

        <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-8">
            <div className="text-4xl font-tanker text-white/20 group-hover:text-red-500 transition-colors">SEP 26</div>
            <div>
              <h5 className="text-xl font-bold uppercase tracking-wide">Gateways Close</h5>
              <p className="text-white/40 text-sm">Registration Deadline. 10:08 PM IST</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-red-500">
            <span className="text-[10px] uppercase tracking-widest font-bold">Crucial</span>
            <iconify-icon icon="lucide:alert-circle"></iconify-icon>
          </div>
        </div>

        <div className="group p-10 rounded-[2.5rem] bg-[#0062ff] text-white flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl z-10">
          <div className="flex items-center gap-8">
            <div className="text-4xl font-tanker">OCT 24</div>
            <div>
              <h5 className="text-xl font-bold uppercase tracking-[0.2em]">The Main Event</h5>
              <p className="text-white/80 text-sm">12-Hour On-Campus Hackathon @ MITS Gwalior</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-bold">Final Sprint</span>
            <iconify-icon icon="lucide:zap" className="text-2xl"></iconify-icon>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  Rewards & Partners  */}
  <section id="rewards" className="py-32 px-10 md:px-20 bg-white text-black">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20">
      <div className="lg:col-span-7">
        <h3 className="text-5xl font-tanker mb-12 uppercase">Commendations</h3>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="p-10 bg-slate-100 rounded-[3rem] border border-black/5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-black/40 block mb-4">Reward 01</span>
            <h4 className="text-4xl font-tanker mb-2">Γé╣10,000</h4>
            <p className="text-sm opacity-60">Total Cash Prize Pool</p>
          </div>
          <div className="p-10 bg-slate-100 rounded-[3rem] border border-black/5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-black/40 block mb-4">Recognition</span>
            <h4 className="text-3xl font-tanker mb-2">Merit</h4>
            <p className="text-sm opacity-60">Certificates for all Finalists</p>
          </div>
          <div className="p-10 bg-slate-100 rounded-[3rem] border border-black/5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-black/40 block mb-4">Attendance</span>
            <h4 className="text-3xl font-tanker mb-2">Protocol</h4>
            <p className="text-sm opacity-60">Goodies & Participation Kits</p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5">
         <h3 className="text-5xl font-tanker mb-12 uppercase">Partners</h3>
         <div className="space-y-4">
           <div className="p-6 border border-black/10 rounded-2xl flex items-center justify-between group hover:bg-black hover:text-white transition-all">
             <span className="font-bold text-sm tracking-widest uppercase">IEEE India Council</span>
             <iconify-icon icon="lucide:arrow-up-right"></iconify-icon>
           </div>
           <div className="p-6 border border-black/10 rounded-2xl flex items-center justify-between group hover:bg-black hover:text-white transition-all">
             <span className="font-bold text-sm tracking-widest uppercase">IEEE MP Section</span>
             <iconify-icon icon="lucide:arrow-up-right"></iconify-icon>
           </div>
           <div className="p-6 border border-black/10 rounded-2xl flex items-center justify-between group hover:bg-black hover:text-white transition-all">
             <span className="font-bold text-sm tracking-widest uppercase">ABV IIITM Student Branch</span>
             <iconify-icon icon="lucide:arrow-up-right"></iconify-icon>
           </div>
         </div>
      </div>
    </div>
  </section>

  {/*  Eligibility & Rules  */}
  <section className="py-32 px-10 md:px-20 bg-[#020617]">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
      <div>
        <h3 className="text-5xl font-tanker mb-12">Entry Criteria</h3>
        <ul className="space-y-6">
          <li className="flex gap-6 pb-6 border-b border-white/5">
            <span className="text-2xl font-tanker text-[#0062ff]">01.</span>
            <div>
              <h5 className="font-bold uppercase tracking-widest mb-2">Multi-Disciplinary</h5>
              <p className="text-white/40 text-sm">Open to UG, PG, Engg, Medical, Law, Arts, Commerce and others.</p>
            </div>
          </li>
          <li className="flex gap-6 pb-6 border-b border-white/5">
            <span className="text-2xl font-tanker text-[#0062ff]">02.</span>
            <div>
              <h5 className="font-bold uppercase tracking-widest mb-2">Team Dynamics</h5>
              <p className="text-white/40 text-sm">2ΓÇô4 Members per team. Inter-college and inter-specialisation allowed.</p>
            </div>
          </li>
          <li className="flex gap-6 pb-6">
            <span className="text-2xl font-tanker text-[#0062ff]">03.</span>
            <div>
              <h5 className="font-bold uppercase tracking-widest mb-2">Strict Integrity</h5>
              <p className="text-white/40 text-sm">Solution must be original. Plagiarism leads to disqualification.</p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-5xl font-tanker mb-12">Mission Rules</h3>
        <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-4 text-sm text-white/60">
          <p>ΓÇó One team per participant.</p>
          <p>ΓÇó Select only one problem statement.</p>
          <p>ΓÇó Final Round is offline at MITS Campus, Gwalior.</p>
          <p>ΓÇó Judges' decisions are final and binding.</p>
          <p>ΓÇó Organisers reserve all rights to schedule modifications.</p>
        </div>
      </div>
    </div>
  </section>

  {/*  FAQ Section  */}
  <section id="faq" className="py-32 px-10 bg-white text-black">
    <div className="max-w-3xl mx-auto">
      <h3 className="text-6xl font-tanker text-center mb-20 uppercase">Inquiries</h3>
      <div className="space-y-4">
        <details className="group rounded-3xl bg-slate-50 border border-black/5 overflow-hidden">
          <summary className="p-8 flex justify-between items-center cursor-pointer font-bold tracking-widest uppercase text-xs">
            Who can participate?
            <iconify-icon icon="lucide:plus" className="group-open:rotate-45 transition-transform"></iconify-icon>
          </summary>
          <div className="px-8 pb-8 text-black/60 text-sm">
            NAKSHATRA is open to all college/university students including engineering, management, arts, commerce, sciences, law, and medical.
          </div>
        </details>
        <details className="group rounded-3xl bg-slate-50 border border-black/5 overflow-hidden">
          <summary className="p-8 flex justify-between items-center cursor-pointer font-bold tracking-widest uppercase text-xs">
            Can students from different colleges form a team?
            <iconify-icon icon="lucide:plus" className="group-open:rotate-45 transition-transform"></iconify-icon>
          </summary>
          <div className="px-8 pb-8 text-black/60 text-sm">
            Yes. Inter-college, inter-specialisation, and inter-branch teams are fully permitted.
          </div>
        </details>
        <details className="group rounded-3xl bg-slate-50 border border-black/5 overflow-hidden">
          <summary className="p-8 flex justify-between items-center cursor-pointer font-bold tracking-widest uppercase text-xs">
            Where is the final round?
            <iconify-icon icon="lucide:plus" className="group-open:rotate-45 transition-transform"></iconify-icon>
          </summary>
          <div className="px-8 pb-8 text-black/60 text-sm">
            The 12-hour offline Final Round will be held at the MITS Campus, Gwalior on 24ΓÇô25 October 2026.
          </div>
        </details>
      </div>
    </div>
  </section>

  {/*  Final CTA  */}
  <section className="py-48 bg-[#0062ff] text-white text-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none">
       <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:40px_40px]"></div>
    </div>
    <div className="relative z-10 px-10">
      <h3 className="massive-text font-tanker leading-[0.8] mb-12 uppercase">The Sky is <br />not the limit.</h3>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <a href="#" id="final-cta-btn" className="px-16 py-6 bg-white text-black font-bold uppercase tracking-[0.3em] rounded-full hover:bg-black hover:text-white transition-all shadow-2xl">Register Now</a>
        <a href="#" id="folio-cta-btn" className="px-16 py-6 border-2 border-white/40 text-white font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all">Download Folio</a>
      </div>
    </div>
  </section>

  {/*  Footer  */}
  <footer id="contact" className="bg-[#020617] pt-32 pb-16 px-10 md:px-20">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-20 pb-20 border-b border-white/5">
        <div className="lg:col-span-5">
          <h4 className="font-tanker text-4xl mb-8 tracking-widest">NAKSHATRA</h4>
          <p className="text-white/40 leading-relaxed max-w-sm mb-10">
            Organised by Aerospace Club, Madhav Institute of Technology & Science (MITS), Gwalior.
          </p>
          <div className="space-y-2">
            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/20">Lead Organiser</p>
            <h5 className="text-xl font-bold">Shreya Goyal</h5>
            <a href="mailto:shreyagoyal401@gmail.com" id="footer-email-link" className="text-white/60 hover:text-[#0062ff] transition-colors">shreyagoyal401@gmail.com</a>
          </div>
        </div>
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div>
            <h5 className="text-[10px] uppercase font-bold tracking-widest text-white/20 mb-6">Directory</h5>
            <nav className="flex flex-col space-y-3 text-sm text-white/60">
              <a href="#about" id="foot-about-link" className="hover:text-white">Genesis</a>
              <a href="#tracks" id="foot-tracks-link" className="hover:text-white">Missions</a>
              <a href="#timeline" id="foot-timeline-link" className="hover:text-white">Chronology</a>
              <a href="#faq" id="foot-faq-link" className="hover:text-white">FAQ</a>
            </nav>
          </div>
          <div>
            <h5 className="text-[10px] uppercase font-bold tracking-widest text-white/20 mb-6">Legal</h5>
            <nav className="flex flex-col space-y-3 text-sm text-white/60">
              <a href="#" id="legal-priv-link" className="hover:text-white">Privacy</a>
              <a href="#" id="legal-terms-link" className="hover:text-white">Terms</a>
              <a href="#" id="legal-code-link" className="hover:text-white">Conduct</a>
            </nav>
          </div>
          <div>
            <h5 className="text-[10px] uppercase font-bold tracking-widest text-white/20 mb-6">Social</h5>
            <div className="flex gap-6">
              <a href="#" id="social-li-link" className="text-2xl text-white/20 hover:text-[#0062ff] transition-colors"><iconify-icon icon="mdi:linkedin"></iconify-icon></a>
              <a href="#" id="social-ig-link" className="text-2xl text-white/20 hover:text-[#0062ff] transition-colors"><iconify-icon icon="mdi:instagram"></iconify-icon></a>
              <a href="#" id="social-tw-link" className="text-2xl text-white/20 hover:text-[#0062ff] transition-colors"><iconify-icon icon="mdi:twitter"></iconify-icon></a>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-[0.5em] text-white/20">
        <p>┬⌐ 2026 Aerospace Club MITS. All rights reserved.</p>
        <p>Gwalior, Madhya Pradesh, India</p>
      </div>
    </div>
  </footer>

</div>


    </>
  );
}