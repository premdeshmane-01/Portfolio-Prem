"use client";

import { motion, useInView } from "framer-motion";
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


/* ---------- Desktop Card (Compacted) ---------- */
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
      // CHANGED: Reduced padding (p-5 lg:p-6) for height efficiency
      className="relative overflow-hidden bg-white rounded-xl border border-gray-100 p-5 lg:p-6 shadow-sm transition-all duration-300 group"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />

      {/* Header: Reduced margins and icon sizes */}
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
        {/* Smaller number font */}
        <div className="text-3xl lg:text-4xl font-black text-gray-100 select-none group-hover:text-gray-200 transition-colors">
          0{index + 1}
        </div>
      </header>

      {/* Skill Tags: Tighter gap and smaller padding */}
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


/* ---------- Mobile Accordion ---------- */
function MobileAccordion({ skillGroup, index, openIndex, setOpenIndex }: { skillGroup: SkillGroupType; index: number; openIndex: number | null; setOpenIndex: (idx: number | null) => void; }) {
  const isOpen = openIndex === index;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex items-center justify-between p-3.5 bg-white active:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{skillGroup.icon}</span>
          <div className="text-left">
            <div className="font-bold text-gray-900 text-sm">{skillGroup.category}</div>
            <div className="text-[10px] text-gray-500">{skillGroup.items.length} Technologies</div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-3.5 pt-0 bg-gray-50/50 border-t border-gray-100">
          <div className="flex flex-wrap gap-2 mt-2">
            {skillGroup.items.map((item) => (
              <span key={item} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-600 shadow-sm">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-gray-500 italic leading-relaxed border-l-2 border-emerald-500 pl-2">
             "{skillGroup.description}"
          </p>
        </div>
      </div>
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
      // CHANGED: py-10 to fit tight vertical spaces.
      className="relative z-10 min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#FAFAFA] py-10 lg:py-12 px-4 md:px-8 lg:px-12"
    > 
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      <div className="relative max-w-6xl mx-auto w-full">
        
        {/* Header Section: Reduced margins (mb-6) */}
        <div ref={headerRef} className="mb-6 lg:mb-10 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider"
          >
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
             Technical Arsenal
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            // Smaller heading
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-2"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400">Versatility.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl leading-relaxed mx-auto md:mx-0"
          >
            I don't just write code; I build solutions. Adapting pixel-perfect frontends to scalable backends and AI.
          </motion.p>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {skills.map((s, i) => (
            <MobileAccordion key={s.category} skillGroup={s} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
          ))}
        </div>

        {/* Desktop View: Tighter gap (gap-4) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {skills.map((s, i) => (
            <DesktopSkillCard key={s.category} skillGroup={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}