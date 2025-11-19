"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-white"
        >
          About Me
        </motion.h2>
        
        {/* Glass Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl"
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            I design and develop systems that solve real problems. 
            Currently a <strong>Computer Engineering student</strong> at SNJB and the <strong>Team Lead for SIH 2026</strong>.
            <br /><br />
            I bridge the gap between <span className="text-blue-400">creative design</span> and <span className="text-purple-400">solid engineering</span>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "CGPA", value: "8.8" },
              { label: "Projects", value: "20+" },
              { label: "Hackathons", value: "National" },
              { label: "Internships", value: "2" }
            ].map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}