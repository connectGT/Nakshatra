import re
with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

btn_new = '''<div className="mt-12 flex flex-wrap gap-4">
                  <a href="https://docs.google.com/document/d/1-GPBMiGJCmi2Tsgj4ZvCaMVQ3a0Hq3rsVrP1XZp9ocw/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] uppercase font-black tracking-[0.2em] text-red-500 hover:text-white border border-red-500/50 hover:border-white px-6 py-3 transition-all">Problem Statements</a>
                  <a href="https://docs.google.com/presentation/d/12flPwO6In63Y6bIxFFmW_1g4lsdW_W-KyBT_Y-I2wfc/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] uppercase font-black tracking-[0.2em] text-red-500 hover:text-white border border-red-500/50 hover:border-white px-6 py-3 transition-all">PPT Format</a>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSdD2Pd_7suCgOjRth4jgFGPOpAcjebbzgNt5tNGxY2DT9-5fA/viewform" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] uppercase font-black tracking-[0.2em] bg-red-600 text-white hover:bg-white hover:text-black border border-red-600 hover:border-white px-6 py-3 transition-all shadow-[0_0_15px_rgba(230,57,70,0.4)]">Submit PPT</a>
                </div>'''

c = re.sub(r'<div className="mt-12 flex flex-wrap gap-4">.*?</div>', btn_new, c, flags=re.DOTALL)

with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
