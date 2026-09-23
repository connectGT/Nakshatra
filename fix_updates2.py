import re

with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Timeline Step 5
c = re.sub(r'24 OCT - 25 OCT 2026</span>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</section>',
'''24 OCT - 25 OCT 2026</span>
                </div>
              </div>

              {/*  Step 5  */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24 scroll-reveal-step">
                <div className="w-full md:w-1/2 md:text-right pl-12 md:pl-0 md:pr-12 group">
                  <span className="text-red-600 font-heading text-lg font-black block mb-4 group-hover:tracking-[0.2em] transition-all">05. CLOSING CEREMONY</span>
                  <p className="text-white/60 text-sm md:text-base max-w-md md:ml-auto leading-relaxed">
                    Final presentations, winners announcement, and award distribution.
                  </p>
                  <span className="text-[10px] uppercase font-bold text-white/20 mt-6 block">25 OCTOBER 2026</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-black border-2 border-red-600 absolute left-0 md:left-1/2 -translate-x-1/2 z-20"></div>
                <div className="hidden md:block w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>''', c)


# 2. Hero Metadata Date
c = re.sub(r'<span className="text-white/40 text-\[9px\] uppercase tracking-widest block mb-2">Location</span>', 
'''<div className="group cursor-pointer">
              <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Date</span>
              <span className="font-bold text-lg border-b border-red-500 pb-1 group-hover:text-red-500 transition-colors">24-25 Oct</span>
            </div>
            <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Location</span>''', c)


# 3. Sponsored by Unstop
c = re.sub(r'>Explore Challenges</a>\s*</div>',
'''>Explore Challenges</a>
          </div>
          
          <div className="mt-6 md:mt-8 hero-stagger opacity-0 flex flex-col items-center justify-center relative z-50">
            <span className="text-white/40 text-[8px] uppercase tracking-[0.3em] font-bold mb-1">Powered By</span>
            <div className="flex items-center gap-2 text-white">
              <span className="font-bold text-lg tracking-tight">Unstop</span>
            </div>
          </div>''', c)


with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("DONE")
