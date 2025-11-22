"use client";
import { motion, Variants } from "framer-motion";
import Reveal from "./Reveal"; 

const skills = [
  { category: "Frontend Engineering", items: ["React", "Next.js", "Tailwind CSS", "GSAP", "Three.js", "Framer Motion"] },
  { category: "Backend Architecture", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase", "REST APIs"] },
  { category: "AI & Machine Learning", items: ["Python", "TensorFlow", "OpenAI API", "LangChain", "RAG Pipelines", "Prompt Engineering"] },
  { category: "DevOps & Tools", items: ["Git/GitHub", "Docker", "Figma", "Vercel", "Postman", "Linux"] },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export default function Skills() {
  return (
    <section className="py-32 px-6 relative z-10 bg-[#DEDEDE]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header - Minimal & Centered */}
        <div className="text-center mb-24">
          <Reveal width="100%">
            <span className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase block mb-3">
              Capabilities
            </span>
          </Reveal>
          <Reveal width="100%" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-medium text-black tracking-tight">
              Technical <span className="text-gray-400 italic font-light">Arsenal</span>
            </h2>
          </Reveal>
        </div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-500"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-8 bg-black/20 group-hover:w-12 group-hover:bg-black/40 transition-all duration-500"></div>
                <h3 className="text-sm font-bold text-black uppercase tracking-widest">
                  {skillGroup.category}
                </h3>
              </div>
              
              {/* Skill Tags */}
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item, i) => (
                  <motion.span 
                    key={item} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="cursor-default px-4 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full 
                    hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}