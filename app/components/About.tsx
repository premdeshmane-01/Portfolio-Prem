"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal"; // Import the new component

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative z-10 bg-[#DEDEDE]">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE: The "Identity Card" */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative corners */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-black/20 rounded-tl-3xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-black/20 rounded-br-3xl"></div>

            <div className="bg-[#111111] text-white p-10 rounded-2xl shadow-2xl border border-gray-800 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
              {/* Abstract background pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
              
              <Reveal delay={0.1}>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                  System Identity
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Premsagar Deshmane
                </h2>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="text-gray-400 leading-relaxed mb-8 font-light">
                  I design and develop systems that solve real problems. My work revolves around breaking down complex challenges and designing workable solutions with consistency.
                  <br /><br />
                  Currently a <span className="text-white font-bold">Computer Engineering student</span> at SNJB (SPPU) and the <span className="text-[#00C853] font-bold">Team Lead for SIH 2026</span>.
                </p>
              </Reveal>

              <div className="grid grid-cols-2 gap-6 border-t border-gray-800 pt-6">
                <Reveal delay={0.4}>
                  <div>
                    <div className="text-3xl font-bold text-[#00C853]">8.8</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">CGPA</div>
                  </div>
                </Reveal>
                <Reveal delay={0.5}>
                  <div>
                    <div className="text-3xl font-bold text-white">20+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Projects</div>
                  </div>
                </Reveal>
                <Reveal delay={0.6}>
                  <div>
                    <div className="text-3xl font-bold text-white">2</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Internships</div>
                  </div>
                </Reveal>
                <Reveal delay={0.7}>
                  <div>
                    <div className="text-lg font-bold text-white">National</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">SIH Finalist</div>
                  </div>
                </Reveal>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Visual "Mission" Text */}
          <div className="space-y-8">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-tight">
                BRIDGE THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-black">
                  GAP
                </span>
              </h2>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 border-l-4 border-black pl-6 italic">
                "I bridge the gap between technical depth and creative design."
              </p>
            </Reveal>

            <div className="flex gap-4 flex-wrap">
               <Reveal delay={0.4}>
                 <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-black border border-black/10 hover:bg-black hover:text-white transition-colors cursor-default">
                   Frontend Engineering
                 </span>
               </Reveal>
               <Reveal delay={0.5}>
                 <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-black border border-black/10 hover:bg-black hover:text-white transition-colors cursor-default">
                   AI Integration
                 </span>
               </Reveal>
               <Reveal delay={0.6}>
                 <span className="px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-black border border-black/10 hover:bg-black hover:text-white transition-colors cursor-default">
                   System Design
                 </span>
               </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}