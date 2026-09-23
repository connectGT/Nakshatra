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
            </div>
            
            <div className="flex items-center gap-4 mt-6">
              <div className="flex-1 h-[1px] bg-white/5 max-w-[80px]"></div>
              <span className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold">More Partners Coming Soon</span>
              <div className="flex-1 h-[1px] bg-white/5 max-w-[80px]"></div>
            </div>

          </div>
        </section>
  
        {/*  Rewards Section  */}'''

c = c.replace(old, new)

with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('DONE')
