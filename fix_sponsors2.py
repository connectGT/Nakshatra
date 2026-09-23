import re

with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Add Sponsors section before the rewards section using regex
sponsors_html = '''
      {/*  Sponsors Section  */}
      <section id="sponsors" className="py-20 md:py-28 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">Powered By</span>
          </div>
          <div className="flex flex-col items-center gap-16">
            <div className="flex flex-col items-center gap-6">
              <span className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold">Title Sponsor</span>
              <a href="https://unstop.com" target="_blank" rel="noopener noreferrer" className="group opacity-60 hover:opacity-100 transition-opacity duration-500">
                <img src="/assets/unstop-logo.png" className="h-10 md:h-14" alt="Unstop" />
              </a>
            </div>
          </div>
        </div>
      </section>

'''

c = re.sub(r'\s*\{/\*\s*Rewards Section\s*\*/\}', sponsors_html + '      {/*  Rewards Section  */}', c)

with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("DONE")
