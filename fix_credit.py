with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

old = '''            </div>
          </div>
        </div>
      </footer>'''

new = '''            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="https://www.instagram.com/shy__guru/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/10 hover:text-white/40 transition-colors text-[9px] font-bold tracking-[0.3em] uppercase"
            >
              Designed &amp; Developed by shy__guru
            </a>
          </div>

        </div>
      </footer>'''

c = c.replace(old, new)
with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('DONE')
