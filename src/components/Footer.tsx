// @ts-nocheck
import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#242323] pt-32 pb-16 px-10 md:px-20 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-20 pb-20 border-b border-white/5">
          <div className="lg:col-span-5">
            <h4 className="font-syncopate font-bold text-4xl mb-8 tracking-widest">NAKSHATRA</h4>
            <p className="text-[#bdb9b2]/60 font-space leading-relaxed max-w-sm mb-10">
              Organised by Aerospace Club, Madhav Institute of Technology & Science (MITS), Gwalior.
            </p>
            <div className="space-y-2">
              <p className="text-[10px] font-space uppercase font-bold tracking-[0.4em] text-[#bdb9b2]">Lead Organiser</p>
              <h5 className="text-xl font-orbitron font-bold">Shreya Goyal</h5>
              <a href="mailto:shreyagoyal401@gmail.com" className="text-[#bdb9b2]/80 font-space hover:text-[#b91f1f] transition-colors">shreyagoyal401@gmail.com</a>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h5 className="text-[10px] font-space uppercase font-bold tracking-widest text-[#bdb9b2] mb-6">Directory</h5>
              <nav className="flex flex-col space-y-3 text-sm font-space text-[#bdb9b2]/80">
                <a href="#about" className="hover:text-white transition-colors">Genesis</a>
                <a href="#tracks" className="hover:text-white transition-colors">Missions</a>
                <a href="#timeline" className="hover:text-white transition-colors">Chronology</a>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </nav>
            </div>
            <div>
              <h5 className="text-[10px] font-space uppercase font-bold tracking-widest text-[#bdb9b2] mb-6">Legal</h5>
              <nav className="flex flex-col space-y-3 text-sm font-space text-[#bdb9b2]/80">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Conduct</a>
              </nav>
            </div>
            <div>
              <h5 className="text-[10px] font-space uppercase font-bold tracking-widest text-[#bdb9b2] mb-6">Social</h5>
              <div className="flex gap-6">
                <a href="#" className="text-2xl text-white/20 hover:text-[#b91f1f] transition-colors"><iconify-icon icon="mdi:linkedin" className="iconify" ></iconify-icon></a>
                <a href="#" className="text-2xl text-white/20 hover:text-[#b91f1f] transition-colors"><iconify-icon icon="mdi:instagram" className="iconify" ></iconify-icon></a>
                <a href="#" className="text-2xl text-white/20 hover:text-[#b91f1f] transition-colors"><iconify-icon icon="mdi:twitter" className="iconify" ></iconify-icon></a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono font-bold uppercase tracking-[0.5em] text-white/20">
          <p>© 2026 Aerospace Club MITS. All rights reserved.</p>
          <p>Gwalior, Madhya Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
