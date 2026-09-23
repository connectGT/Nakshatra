import re

with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

bad_pattern = r'<div className="group cursor-pointer">\s*<div className="group cursor-pointer">\s*<span className="text-white/40 text-\[9px\] uppercase tracking-widest block mb-2">Date</span>\s*<span className="font-bold text-lg border-b border-red-500 pb-1 group-hover:text-red-500 transition-colors">24-25 Oct</span>\s*</div>\s*<span className="text-white/40 text-\[9px\] uppercase tracking-widest block mb-2">Location</span>'

good_html = '''<div className="group cursor-pointer">
              <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Date</span>
              <span className="font-bold text-lg border-b border-red-500 pb-1 group-hover:text-red-500 transition-colors">24-25 Oct</span>
            </div>
            <div className="group cursor-pointer">
              <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-2">Location</span>'''

c = re.sub(bad_pattern, good_html, c)

with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
