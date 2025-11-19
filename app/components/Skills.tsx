"use client";
import { motion, Variants } from "framer-motion"; // Import Variants type

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "GSAP", "Three.js"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
  { category: "AI & ML", items: ["Python", "TensorFlow", "OpenAI API", "RAG Pipelines"] },
  { category: "Tools", items: ["Git/GitHub", "Figma", "Docker", "Vercel"] },
];

// Animation Variants (Explicitly Typed)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -50 }, 
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function Skills() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-white"
        >
          Technical <span className="text-gray-400">Arsenal</span>
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors"
            >
              <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item) => (
                  <motion.span 
                    key={item} 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    className="cursor-default px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 transition-colors"
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