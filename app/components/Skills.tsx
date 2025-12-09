"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { 
    category: "Frontend Engineering", 
    items: ["React", "Next.js", "Tailwind CSS", "GSAP", "Three.js"],
    icon: "⚡"
  },
  { 
    category: "Backend Architecture", 
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    icon: "⚙️"
  },
  { 
    category: "AI & Machine Learning", 
    items: ["Python", "TensorFlow", "OpenAI API", "RAG Pipelines"],
    icon: "🧠"
  },
  { 
    category: "DevOps & Tools", 
    items: ["Git/GitHub", "Figma", "Docker", "Vercel"],
    icon: "🛠️"
  },
];

function SkillCard({ skillGroup, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-black/10 hover:border-black/20 transition-all duration-500 shadow-sm hover:shadow-xl"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-black/[0.02] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Category header */}
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
            className="text-3xl"
          >
            {skillGroup.icon}
          </motion.div>
          <h3 className="text-base font-bold text-black uppercase tracking-[0.15em]">
            {skillGroup.category}
          </h3>
        </div>
        
        {/* Index number */}
        <span className="text-6xl font-black text-black/[0.04] group-hover:text-black/[0.08] transition-colors">
          0{index + 1}
        </span>
      </div>

      {/* Skills tags */}
      <div className="relative z-10 flex flex-wrap gap-2.5">
        {skillGroup.items.map((item, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ 
              delay: index * 0.15 + 0.4 + i * 0.05,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(0, 0, 0, 0.95)",
              color: "#ffffff",
            }}
            className="cursor-default px-4 py-2 bg-white/50 border border-black/10 rounded-full text-sm font-medium text-black/80 hover:border-black transition-all duration-300"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="relative z-10 overflow-hidden bg-[#DEDEDE] py-32 px-6 md:px-12">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-black/[0.02] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-black/[0.02] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/20" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-black/50">
              Technical Arsenal
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-black/20 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tight mb-4">
              CORE{" "}
              <span className="text-black/30">COMPETENCIES</span>
            </h2>
            <p className="text-lg text-black/60 max-w-2xl">
              A comprehensive toolkit spanning frontend, backend, AI, and DevOps—engineered for building scalable, intelligent systems.
            </p>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skills.map((skillGroup, index) => (
            <SkillCard key={index} skillGroup={skillGroup} index={index} />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-20 h-[1px] w-full bg-gradient-to-r from-transparent via-black/20 to-transparent origin-center"
        />

      </div>
    </section>
  );
}