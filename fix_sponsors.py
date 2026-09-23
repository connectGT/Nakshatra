import re

with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Update Unstop logo in Hero: use new PNG, bigger size, no invert (colored logo)
c = c.replace(
    '<img src="/assets/unstop-logo.svg" className="h-4 md:h-5 invert opacity-90" alt="Unstop" />',
    '<img src="/assets/unstop-logo.png" className="h-7 md:h-9 opacity-90" alt="Unstop" />'
)

# 2. Add Sponsors section before the rewards section
sponsors_section = '''      {/*  Sponsors Section  */}
      <section id="sponsors" className="py-20 md:py-28 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">Powered By</span>
          </div>
          
          <div className="flex flex-col items-center gap-16">
            {/* Title Sponsor */}
            <div className="flex flex-col items-center gap-6">
              <span className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold">Title Sponsor</span>
              <a href="https://unstop.com" target="_blank" rel="noopener noreferrer" className="group opacity-60 hover:opacity-100 transition-opacity duration-500">
                <img src="/assets/unstop-logo.png" className="h-10 md:h-14" alt="Unstop" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/*  Rewards Section  */}
      <section id="rewards"'''

c = c.replace('      {/*  Rewards Section  */}\n      <section id="rewards"', sponsors_section)

with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("DONE")
