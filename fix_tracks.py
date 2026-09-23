import re

with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# SOFTWARE TRACK
sw_new = '''<ul className="space-y-4">
                  <li className="flex items-start gap-4 text-[10px] md:text-xs font-black tracking-widest text-white/80 leading-relaxed">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span> AUTOMATED CLOUD MASKING & RECONSTRUCTION
                  </li>
                  <li className="flex items-start gap-4 text-[10px] md:text-xs font-black tracking-widest text-white/80 leading-relaxed">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span> LUNAR SHADOWED REGION MAPPING
                  </li>
                  <li className="flex items-start gap-4 text-[10px] md:text-xs font-black tracking-widest text-white/80 leading-relaxed">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span> SPACE DEBRIS DETECTION & MITIGATION
                  </li>
                </ul>
                
                <div className="mt-12 flex flex-wrap gap-4">
                  <a href="https://docs.google.com/document/d/1-GPBMiGJCmi2Tsgj4ZvCaMVQ3a0Hq3rsVrP1XZp9ocw/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] uppercase font-black tracking-[0.2em] text-red-500 hover:text-white border border-red-500/50 hover:border-white px-6 py-3 transition-all">Problem Statements</a>
                  <a href="https://docs.google.com/presentation/d/12flPwO6In63Y6bIxFFmW_1g4lsdW_W-KyBT_Y-I2wfc/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] uppercase font-black tracking-[0.2em] text-red-500 hover:text-white border border-red-500/50 hover:border-white px-6 py-3 transition-all">PPT Format</a>
                </div>'''

c = re.sub(r'<ul className="space-y-6">\s*<li.*?SPACE SYSTEMS & DATA.*?</ul>', sw_new, c, flags=re.DOTALL)

# HARDWARE TRACK
hw_new = '''<ul className="space-y-4">
                  <li className="flex items-start gap-4 text-[10px] md:text-xs font-black tracking-widest text-white/80 leading-relaxed">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span> AUTONOMOUS LUNAR ROVER
                  </li>
                  <li className="flex items-start gap-4 text-[10px] md:text-xs font-black tracking-widest text-white/80 leading-relaxed">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span> SATELLITE COMPONENT HEALTH MONITORING
                  </li>
                  <li className="flex items-start gap-4 text-[10px] md:text-xs font-black tracking-widest text-white/80 leading-relaxed">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span> RADIATION & SPACE-WEATHER MONITOR
                  </li>
                </ul>
                
                <div className="mt-12 flex flex-wrap gap-4">
                  <a href="https://docs.google.com/document/d/1-GPBMiGJCmi2Tsgj4ZvCaMVQ3a0Hq3rsVrP1XZp9ocw/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] uppercase font-black tracking-[0.2em] text-red-500 hover:text-white border border-red-500/50 hover:border-white px-6 py-3 transition-all">Problem Statements</a>
                  <a href="https://docs.google.com/presentation/d/12flPwO6In63Y6bIxFFmW_1g4lsdW_W-KyBT_Y-I2wfc/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] uppercase font-black tracking-[0.2em] text-red-500 hover:text-white border border-red-500/50 hover:border-white px-6 py-3 transition-all">PPT Format</a>
                </div>'''

c = re.sub(r'<ul className="space-y-6">\s*<li.*?ROCKETRY & PROPULSION.*?</ul>', hw_new, c, flags=re.DOTALL)

c = c.replace('COMING SOON', 'LIVE NOW')
c = c.replace('NAKSHATRA is an aerospace-focused odyssey organized by the Aerospace Club, Madhav Institute of Technology & Science (MITS), Gwalior.', 'NAKSHATRA is an aerospace-focused hackathon organised by the Aerospace Club, Madhav Institute of Technology & Science (MITS), Gwalior, bringing together students to innovate and solve real-world challenges across space, astronomy, aeronautics, and aerospace technology.')

with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("DONE")
