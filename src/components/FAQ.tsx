import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Who can participate in Nakshatra?',
    a: 'Nakshatra is open to undergraduate and postgraduate students from any recognized university across India. Teams can have 3-5 members.'
  },
  {
    q: 'Do I need prior aerospace experience?',
    a: 'While helpful, it is not mandatory. We are looking for strong problem-solving skills in software, hardware, and data analysis. Mentors will be available to help bridge domain knowledge gaps.'
  },
  {
    q: 'Is this an online or offline hackathon?',
    a: 'The initial idea submission and shortlisting phases are online. The grand finale will be an offline 48-hour intensive build phase.'
  },
  {
    q: 'What is the evaluation criteria?',
    a: 'Projects are evaluated on technical complexity, innovation, practical viability in space environments, and presentation quality.'
  }
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 md:px-12 bg-gradient-to-t from-brand-navy to-[#060b14] border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display text-white">SYSTEM QUERIES</h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-white/10 bg-[#05080D] transition-colors"
            >
              <button 
                className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`text-lg font-medium transition-colors ${open === i ? 'text-brand-blue' : 'text-white'}`}>
                  {faq.q}
                </span>
                {open === i ? (
                  <Minus size={20} className="text-brand-blue flex-shrink-0" />
                ) : (
                  <Plus size={20} className="text-brand-silver/50 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  open === i ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8 pt-0 text-brand-silver/60 font-light leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
