import sys
with open('src/SuperdesignV3.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

import re
c_new = re.sub(r'<div className="space-y-6">\s*<details className="group.*?THE SELECTION PROCESS\?.*?</details>\s*</div>', '''          <div className="space-y-6">
            <details className="group bg-black/5 p-8 transition-all duration-300 hover:bg-black/10 cursor-pointer">
              <summary className="font-heading text-xl md:text-2xl font-black flex justify-between items-center list-none text-black">
                ELIGIBILITY: WHO CAN JOIN?
                <iconify-icon icon="lucide:plus" className="group-open:rotate-45 transition-transform duration-300 text-red-600"></iconify-icon>
              </summary>
              <div className="mt-6 text-gray-700 leading-relaxed max-w-2xl pr-8">
                Open to all college/university students! Including Undergraduate, Postgraduate, Engineering, Management, Arts, Commerce, Sciences, Law, and Medical students. If you have a passion for space, you have a place.
              </div>
            </details>
            
            <details className="group bg-black/5 p-8 transition-all duration-300 hover:bg-black/10 cursor-pointer">
              <summary className="font-heading text-xl md:text-2xl font-black flex justify-between items-center list-none text-black">
                TEAM COMPOSITION & SIZE?
                <iconify-icon icon="lucide:plus" className="group-open:rotate-45 transition-transform duration-300 text-red-600"></iconify-icon>
              </summary>
              <div className="mt-6 text-gray-700 leading-relaxed max-w-2xl pr-8 space-y-2">
                <p>• Team Size: 2-4 members.</p>
                <p>• Inter-college teams are completely allowed.</p>
                <p>• Inter-branch/inter-specialisation teams are encouraged.</p>
                <p>• Each participant can be a member of only ONE team.</p>
              </div>
            </details>
            
            <details className="group bg-black/5 p-8 transition-all duration-300 hover:bg-black/10 cursor-pointer">
              <summary className="font-heading text-xl md:text-2xl font-black flex justify-between items-center list-none text-black">
                SUBMISSION & RULES
                <iconify-icon icon="lucide:plus" className="group-open:rotate-45 transition-transform duration-300 text-red-600"></iconify-icon>
              </summary>
              <div className="mt-6 text-gray-700 leading-relaxed max-w-2xl pr-8 space-y-2">
                <p>• Teams must select and work on ONE problem statement only.</p>
                <p>• The submitted solution must be the original work of the team.</p>
                <p>• Teams must complete the registration form and submit their PPT before the deadline to be considered.</p>
                <p>• Shortlisted teams must participate in the offline Final Hackathon at MITS, Gwalior.</p>
              </div>
            </details>
          </div>''', c, flags=re.DOTALL)
if c_new != c:
    with open('src/SuperdesignV3.tsx', 'w', encoding='utf-8') as f:
        f.write(c_new)
    print("SUCCESS")
else:
    print("FAILED TO MATCH")
