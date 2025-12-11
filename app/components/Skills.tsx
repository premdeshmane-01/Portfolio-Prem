"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ---------- keep your original skills data ---------- */
const skills = [
  { category: "Frontend Engineering", items: ["React", "Next.js", "Tailwind CSS", "GSAP", "Three.js"], icon: "⚡" },
  { category: "Backend Architecture", items: ["Node.js", "Express", "MongoDB", "PostgreSQL"], icon: "⚙️" },
  { category: "AI & Machine Learning", items: ["Python", "TensorFlow", "OpenAI API", "RAG Pipelines"], icon: "🧠" },
  { category: "DevOps & Tools", items: ["Git/GitHub", "Figma", "Docker", "Vercel"], icon: "🛠️" },
];

type SkillGroupType = { category: string; items: string[]; icon: string };

/* ---------- Desktop card - unchanged visuals (kept identical) ---------- */
function DesktopSkillCard({ skillGroup, index }: { skillGroup: SkillGroupType; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      role="group"
      aria-labelledby={`skill-${index}`}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
      className="relative overflow-hidden bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-black/6 transition-all duration-300 focus-within:shadow-lg"
      tabIndex={-1}
    >
      <div className="pointer-events-none absolute -top-8 -right-10 w-36 h-36 rounded-full bg-black/[0.02] blur-2xl hidden md:block" />
      <header className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div aria-hidden className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-black/5 to-black/10 text-2xl">
            <span className="select-none">{skillGroup.icon}</span>
          </div>

          <div>
            <h3 id={`skill-${index}`} className="text-sm md:text-base font-semibold text-black">
              {skillGroup.category}
            </h3>
            <p className="text-xs text-black/50 mt-1 max-w-[22rem]">{skillGroup.items.length} key skills</p>
          </div>
        </div>

        <div className="text-3xl font-extrabold text-black/[0.06] md:text-4xl select-none">{`0${index + 1}`}</div>
      </header>

      <div className="relative z-10 mt-4 md:mt-6 flex flex-wrap gap-2.5">
        {skillGroup.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15 + index * 0.06 + i * 0.03, type: "spring", stiffness: 260, damping: 24 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/6 text-sm font-medium text-black/80 hover:bg-black hover:text-white transition-colors duration-200"
          >
            <span className="text-xs opacity-80">•</span>
            <span className="truncate max-w-[8rem]">{item}</span>
          </motion.span>
        ))}
      </div>

      <p className="mt-4 text-xs text-black/50 hidden md:block">Focused on building production-ready systems—clean code, scalable architecture and thoughtful UX.</p>
    </motion.article>
  );
}

/* ---------- Mobile: improved single-open accordion with polished UI ---------- */
function MobileAccordion({ skillGroup, index, openIndex, setOpenIndex }: { skillGroup: SkillGroupType; index: number; openIndex: number | null; setOpenIndex: (idx: number | null) => void; }) {
  const isOpen = openIndex === index;
  return (
    <div className="w-full">
      <button
        aria-expanded={isOpen}
        aria-controls={`skill-panel-${index}`}
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex items-center justify-between gap-4 p-3 rounded-xl bg-white/95 border border-black/6 shadow-sm hover:shadow-md transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-black/[0.04] flex items-center justify-center text-lg">{skillGroup.icon}</div>
          <div className="text-left">
            <div className="text-sm font-semibold text-black">{skillGroup.category}</div>
            <div className="text-xs text-black/50">{skillGroup.items.length} skills</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-black/50 mr-2 hidden sm:inline">{isOpen ? "Collapse" : "Expand"}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-black/60"
          >
            <ChevronDown size={18} />
          </motion.span>
        </div>
      </button>

      <div
        id={`skill-panel-${index}`}
        role="region"
        aria-labelledby={`skill-${index}`}
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-[480px] mt-3" : "max-h-0"}`}
      >
        <div className="p-3 bg-white/95 border border-t-0 border-black/6 rounded-b-xl">
          <div className="flex flex-wrap gap-2">
            {skillGroup.items.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full bg-black/[0.05] text-black/80">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-black/50">Experience building production systems with these tools. Tap to view details (desktop shows richer cards).</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Final exported component: desktop unchanged, mobile improved ---------- */
export default function Skills() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [openIndex, setOpenIndex] = useState<number | null>(0); // open first by default for mobile

  return (
    <section className="relative z-10 overflow-hidden bg-[#F3F3F3] py-16 md:py-28 px-4 md:px-12">
      <div className="relative max-w-7xl mx-auto">
        {/* Header (keeps your desktop look) */}
        <div ref={headerRef} className="mb-8 md:mb-16">
          <div className="flex items-center gap-4 mb-4" aria-hidden>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-black/20" />
            <span className="text-xs font-medium uppercase tracking-wider text-black/50">Technical Arsenal</span>
            <div className="h-px flex-1 bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-tight">
              CORE <span className="font-black text-black/30">COMPETENCIES</span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-black/60 max-w-2xl">
              A concise toolkit spanning frontend, backend, ML, and DevOps—focused on scalable, production-ready systems.
            </p>
          </div>
        </div>

        {/* MOBILE: single-column accordion (visible < md) */}
        <div className="md:hidden space-y-3">
          {skills.map((s, i) => (
            <MobileAccordion key={s.category} skillGroup={s} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
          ))}
        </div>

        {/* DESKTOP: original grid (visible md+) - preserved look */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {skills.map((s, i) => (
            <DesktopSkillCard key={s.category} skillGroup={s} index={i} />
          ))}
        </div>

        {/* Accent divider */}
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.25 }} className="mt-12 md:mt-20 h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent origin-center" aria-hidden />
      </div>
    </section>
  );
}
