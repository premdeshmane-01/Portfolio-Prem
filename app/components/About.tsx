"use client";

import { motion, type Transition } from "framer-motion";
import { MapPin, GraduationCap, CircleDot, Code2, Sparkles, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const floatTransition: Transition = {
  duration: 6,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

const philosophyItems = [
  { title: "System First", desc: "Data & flows before pixels." },
  { title: "Intentional UI", desc: "Minimal, expressive, purposeful." },
  { title: "AI Leverage", desc: "Automation to remove friction." },
  { title: "Iterate Fast", desc: "Ship small, refine often." },
];

const stats = [
  { icon: MapPin, label: "Base", value: "India" },
  { icon: GraduationCap, label: "Edu", value: "Comp. Eng." },
  { icon: CircleDot, label: "Status", value: "Open to Work" },
  { icon: Code2, label: "Stack", value: "React/Next.js" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden bg-[#DEDEDE] py-12 md:py-24 px-4 md:px-6"
    >
      {/* ---------------- Depth Background ---------------- */}
      {/* Mesh Gradient for subtle depth behind the content */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-white/60 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gray-400/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          
          {/* ================= LEFT COLUMN (Story & Philosophy) ================= */}
          <div className="flex-1 space-y-10 w-full">
            
            {/* BADGE (Glass Pill) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/60 bg-white/30 backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <Sparkles size={12} className="text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/80">
                About Me
              </span>
            </motion.div>

            {/* MAIN TEXT */}
            <div>
              <Reveal delay={0.15}>
                <div className="space-y-6">
                  <motion.h2
                    className="text-4xl md:text-6xl lg:text-7xl font-medium text-black tracking-tight leading-[0.95]"
                  >
                    Architecting{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800 font-serif italic">
                        intelligent systems
                      </span>
                      {/* Text Underline Decoration */}
                      <span className="absolute bottom-1 left-0 w-full h-2 bg-emerald-500/10 -rotate-1 -z-0" />
                    </span>
                    <br />
                    that feel designed.
                  </motion.h2>

                  <div className="space-y-4 pt-2">
                    <p className="max-w-xl text-base md:text-lg leading-relaxed text-gray-800 font-medium">
                      I’m <span className="font-bold border-b-2 border-emerald-500">Premsagar Deshmane</span>.
                    </p>
                    <p className="max-w-xl text-sm md:text-base leading-relaxed text-gray-600">
                      A Computer Engineering student bridging the gap between pixel-perfect frontend design and robust AI-driven backends.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* ---------------- PHILOSOPHY SECTION ---------------- */}
              <Reveal delay={0.25}>
                <div className="space-y-6 mt-12 md:mt-16">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 pl-1">
                    // Core Philosophy
                  </h3>

                  {/* DESKTOP: Grid */}
                  <div className="hidden md:grid gap-4 grid-cols-2 max-w-lg">
                    {philosophyItems.map((item, i) => (
                      <PhilosophyCard key={i} item={item} index={i} />
                    ))}
                  </div>

                  {/* MOBILE: Horizontal Scroll */}
                  <div className="md:hidden flex overflow-x-auto gap-3 pb-6 -mx-4 px-4 snap-x hide-scrollbar">
                    {philosophyItems.map((item, i) => (
                      <div key={i} className="snap-center flex-shrink-0 w-[220px]">
                         <PhilosophyCard item={item} index={i} mobile />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (High-Fi Cards) ================= */}
          <div className="flex-1 w-full md:pt-20">
            <Reveal delay={0.3}>
              <>
                 {/* DESKTOP: Grid Layout */}
                 <div className="hidden md:grid grid-cols-2 gap-5">
                    <RoleCards />
                 </div>

                 {/* MOBILE: Swipeable Deck */}
                 <div className="md:hidden flex overflow-x-auto gap-4 pb-12 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar">
                    <RoleCards mobile />
                 </div>
              </>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

// ---------------- SUB-COMPONENTS ---------------- //

function PhilosophyCard({ item, index, mobile = false }: { item: any, index: number, mobile?: boolean }) {
  return (
    <motion.div
      whileHover={!mobile ? { y: -4 } : {}}
      className="
        h-full p-5 rounded-2xl
        bg-white border border-white/50
        shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] 
        hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]
        transition-all duration-300
        flex flex-col justify-center relative overflow-hidden
      "
    >
      {/* Inner Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50 opacity-50" />
      
      <div className="relative z-10 flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400">
             0{index + 1}
          </div>
          <p className="text-xs font-bold text-black">{item.title}</p>
      </div>
      <p className="relative z-10 text-[11px] leading-relaxed text-gray-500 pl-9">{item.desc}</p>
    </motion.div>
  );
}

function RoleCards({ mobile = false }: { mobile?: boolean }) {
    const cardClass = mobile 
        ? "snap-center flex-shrink-0 w-[280px] h-[210px]" 
        : "min-h-[200px]"; 

    return (
        <>
            {/* 1. SNAPSHOT CARD (The ID Badge) */}
            <motion.div 
                whileHover={!mobile ? { y: -5, scale: 1.02 } : {}}
                className={`${cardClass} group relative p-6 rounded-3xl flex flex-col justify-between transition-all duration-500
                bg-white border-t border-l border-white/80 border-b border-r border-black/5
                shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
                `}
            >
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Profile</h3>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 relative z-10">
                    {stats.map((stat, i) => (
                    <div key={i}>
                        <p className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">{stat.label}</p>
                        <p className="text-xs font-bold text-black truncate">{stat.value}</p>
                    </div>
                    ))}
                </div>

                {/* Decorative Pattern */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-multiply" />
            </motion.div>

            {/* 2. FULL STACK (High Fidelity) */}
            <RoleCard 
                className={cardClass}
                title="Full Stack"
                title2="Developer"
                subtitle="React / Next.js"
                accentColor="bg-emerald-500"
                tags={["React", "Next.js", "GSAP"]}
                mobile={mobile}
            />

            {/* 3. AI/ML ENGINEER */}
            <RoleCard 
                className={cardClass}
                title="AI/ML"
                title2="Engineer"
                subtitle="AICTE Intern"
                accentColor="bg-violet-500"
                tags={["Python", "LLMs", "RAG"]}
                mobile={mobile}
            />

            {/* 4. SALES & MARKETING */}
            <RoleCard 
                className={cardClass}
                title="Sales &"
                title2="Marketing"
                subtitle="Cameo Event"
                accentColor="bg-amber-500"
                tags={["Growth", "CRM", "Leads"]}
                mobile={mobile}
            />
        </>
    );
}

function RoleCard({ className, title, title2, subtitle, accentColor, tags, mobile }: any) {
    return (
        <motion.div 
            whileHover={!mobile ? { y: -8, scale: 1.02 } : {}}
            className={`${className} group relative overflow-hidden p-6 rounded-3xl flex flex-col justify-between cursor-default transition-all duration-500
            bg-gradient-to-b from-white to-[#FAFAFA]
            border-t border-l border-white border-b border-r border-gray-200
            shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]
            `}
        >
            {/* Ambient Light Source (The "Blob") */}
            <div className={`absolute -top-12 -right-12 w-48 h-48 ${accentColor} rounded-full blur-[80px] opacity-10 transition-all duration-700 group-hover:opacity-25 group-hover:scale-110`} />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-black leading-none tracking-tight">
                        {title} <br/> <span className="font-light text-gray-500">{title2}</span>
                    </h3>
                    <div className={`w-8 h-8 rounded-full ${accentColor} bg-opacity-10 flex items-center justify-center`}>
                        <ArrowUpRight size={14} className="text-black opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                </div>
                <p className="text-xs font-semibold text-gray-400 mt-2 tracking-wide uppercase">{subtitle}</p>
            </div>
            
            {/* Floating Tags */}
            <div className="relative z-10 flex flex-wrap gap-2 content-end">
                {tags.map((tech: string) => ( 
                <span key={tech} className="px-2.5 py-1 bg-white border border-gray-100 shadow-sm text-gray-600 text-[10px] font-bold rounded-md transition-all duration-300 group-hover:border-black/10 group-hover:shadow-md">
                    {tech}
                </span>
                ))}
            </div>
        </motion.div>
    );
}