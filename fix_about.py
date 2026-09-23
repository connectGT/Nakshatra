import re
with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(r'<p className="text-lg leading-relaxed text-gray-700 md:pr-12">\s*We provide a stellar platform.*?innovators\.\s*</p>', '', c, flags=re.DOTALL)

with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
