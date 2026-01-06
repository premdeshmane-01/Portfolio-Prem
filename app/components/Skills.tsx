"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ---------- Skills Data ---------- */
const skills = [
  {
    category: "Modern Frontend Engineering",
    items: ["React & React Native", "Next.js (App Router)", "TypeScript", "Tailwind & Shadcn UI", "Framer Motion", "GSAP"],
    icon: "⚡",
    description: "Crafting pixel-perfect, accessible, and high-performance interfaces that delight users."
  },
  {
    category: "Scalable Backend Systems",
    items: ["Node.js", "Express", "PostgreSQL & Prisma", "MongoDB", "Serverless Functions", "REST & GraphQL"],
    icon: "⚙️",
    description: "Architecting robust APIs and databases optimized for speed, security, and reliability."
  },
  {
    category: "AI Engineering & Integration",
    items: ["Python", "OpenAI API", "LangChain", "RAG Systems", "Vector Databases", "Prompt Engineering"],
    icon: "🧠",
    description: "Bridging the gap between software and intelligence to build adaptive, smart applications."
  },
  {
    category: "DevOps & Cloud Infrastructure",
    items: ["Git & GitHub Actions", "Docker", "AWS (EC2, S3)", "Vercel & Netlify", "CI/CD Pipelines"],
    icon: "🛠️",
    description: "Automating workflows and ensuring seamless deployment from development to production."
  }
];

type SkillGroupType = { category: string; items: string[]; icon: string; description: string };


/* ---------- Desktop Card (UNTOUCHED - EXACTLY AS PROVIDED) ---------- */
function DesktopSkillCard({ skillGroup, index }: { skillGroup: SkillGroupType; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      role="group"
      aria-labelledby={`skill-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.1)" }}
      className="relative overflow-hidden bg-white rounded-xl border border-gray-100 p-5 lg:p-6 shadow-sm transition-all duration-300 group"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />

      <header className="relative z-10 flex items-start justify-between mb-3 lg:mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gray-50 text-xl lg:text-2xl shadow-inner border border-gray-100 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
            {skillGroup.icon}
          </div>
          <div>
            <h3 id={`skill-${index}`} className="text-sm lg:text-base font-bold text-gray-900 leading-tight">
              {skillGroup.category}
            </h3>
            <p className="text-[9px] lg:text-[10px] font-medium text-emerald-600 mt-0.5 uppercase tracking-wide">
              Production Ready
            </p>
          </div>
        </div>
        <div className="text-3xl lg:text-4xl font-black text-gray-100 select-none group-hover:text-gray-200 transition-colors">
          0{index + 1}
        </div>
      </header>

      <div className="relative z-10 flex flex-wrap gap-1.5 lg:gap-2 mb-3 lg:mb-4">
        {skillGroup.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 + (i * 0.05) }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-2 py-1 rounded bg-gray-50 border border-gray-200 text-[10px] lg:text-xs font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors cursor-default"
          >
            {item}
          </motion.span>
        ))}
      </div>

      <p className="relative z-10 text-[11px] lg:text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors line-clamp-2">
        {skillGroup.description}
      </p>
    </motion.article>
  );
}


/* ---------- Mobile Accordion (RE-STYLED TO MATCH THEME) ---------- */
function MobileAccordion({ skillGroup, index, openIndex, setOpenIndex }: { skillGroup: SkillGroupType; index: number; openIndex: number | null; setOpenIndex: (idx: number | null) => void; }) {
  const isOpen = openIndex === index;

  return (
    <div className={`relative overflow-hidden rounded-xl border transition-all duration-500 ${isOpen ? 'border-emerald-200 shadow-lg' : 'border-gray-200 bg-white'}`}>
      {/* Mirror Desktop Visuals (Gradient Corner + Large Number) */}
      <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full opacity-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute top-1 right-3 text-2xl font-black transition-colors ${isOpen ? 'text-emerald-100' : 'text-gray-50'}`}>
        0{index + 1}
      </div>

      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="relative z-10 w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-11 h-11 rounded-xl shadow-inner border border-gray-100 transition-all ${isOpen ? 'bg-white shadow-emerald-100' : 'bg-gray-50'}`}>
            <span className="text-xl">{skillGroup.icon}</span>
          </div>
          <div className="text-left">
            <div className={`font-bold text-sm transition-colors ${isOpen ? 'text-emerald-900' : 'text-gray-900'}`}>{skillGroup.category}</div>
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">System Module 0{index + 1}</div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.2 : 1 }}
          className={isOpen ? "text-emerald-500" : "text-gray-400"}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          >
            <div className="p-4 pt-0 relative z-10">
              <div className="flex flex-wrap gap-2 mt-2">
                {skillGroup.items.map((item, i) => (
                  <motion.span 
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-2.5 py-1 bg-white border border-gray-100 rounded-md text-[10px] font-bold text-gray-700 shadow-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-gray-500 italic leading-relaxed border-l-2 border-emerald-500 pl-3">
                 {skillGroup.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function Skills() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(headerRef, { once: true });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section 
      id="skills" 
      className="relative z-10 min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#FAFAFA] py-16 lg:py-24 px-6 md:px-12"
    > 
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="relative max-w-6xl mx-auto w-full">
        
        {/* Header Section */}
        <div ref={headerRef} className="mb-12 lg:mb-16 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-black uppercase tracking-widest"
          >
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
             Technical Arsenal
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter mb-4"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-500">Versatility.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base lg:text-lg text-gray-500 max-w-2xl leading-relaxed mx-auto md:mx-0"
          >
            Building high-performance solutions across the stack, from pixel-perfect interfaces to AI-driven backend architectures.
          </motion.p>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {skills.map((s, i) => (
            <MobileAccordion key={s.category} skillGroup={s} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
          ))}
        </div>

        {/* Desktop View: UNTOUCHED GAP & GRID */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {skills.map((s, i) => (
            <DesktopSkillCard key={s.category} skillGroup={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}