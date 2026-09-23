import re

with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

old = '''              </a>
            </div>
          </div>
        </div>
      </section>

      
      {/*  Rewards Section  */}'''

new = '''              </a>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="w-16 h-[1px] bg-white/10"></div>
              <span className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold">More Partners Coming Soon</span>
              <div className="w-16 h-[1px] bg-white/10"></div>
            </div>

          </div>
        </div>
      </section>

      
      {/*  Rewards Section  */}'''

c = c.replace(old, new)

with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("DONE" if old in (open('src/SuperdesignV3.tsx').read() == c and False or "x") else "DONE")
