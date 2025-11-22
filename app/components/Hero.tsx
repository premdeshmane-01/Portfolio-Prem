"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import ModelViewer from "./ModelViewer"; 

export default function Hero() {
  // Parallax Hooks
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, -900]); 
  const textY = useTransform(scrollY, [0, 400], [0, -100]); 
  
  // ANIMATION VARIANTS: Cinematic Slide Up
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 1, 0.5, 1] as const 
      },
    },
  };

  return (
    <motion.section 
      id="home" // semantic anchor for the hero
      style={{ y: heroY }}
      className="fixed inset-0 w-full h-screen z-50 overflow-hidden bg-[#DEDEDE] shadow-2xl"
    >
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-12 relative pt-20 pb-20 max-w-[1920px] mx-auto">
        
        {/* LEFT SIDE: CONTENT */}
        <motion.div 
          style={{ y: textY }}
          className="w-full md:w-5/12 flex flex-col items-start text-left z-30 space-y-8"
        >
          {/* PROFILE GROUP */}
          <div className="flex flex-col items-start gap-6">
            {/* PROFILE PICTURE */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-black shadow-lg"
            >
              <img 
                src="/profile.png" 
                alt="Premsagar Deshmane" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
              />
            </motion.div>

            {/* BADGE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-1.5 rounded-full border border-black/10 bg-white/40 backdrop-blur-md text-black/80 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm"
            >
              LETS BUILD EXPERIENCES
            </motion.div>
          </div>

          {/* NAME - CINEMATIC MASKED REVEAL */}
          <motion.div 
            className="space-y-[-0.2em]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden">
              <motion.h1 
                variants={textVariants}
                className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9]"
              >
                PREMSAGAR
              </motion.h1>
            </div>
            
            <div className="overflow-hidden">
              <motion.h1 
                variants={textVariants}
                className="text-6xl md:text-8xl font-black text-black/80 tracking-tighter leading-[0.9]"
              >
                DESHMANE
              </motion.h1>
            </div>
          </motion.div>

          {/* SUBTEXT */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-medium"
          >
            Architecting <span className="text-black font-bold border-b border-black/20 pb-0.5">Intelligent Systems</span> with <span className="text-black font-bold border-b border-black/20 pb-0.5">Precision Design</span>.
          </motion.p>
          
          {/* BUTTONS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              className="group px-8 py-4 bg-black text-white font-bold text-xs md:text-sm tracking-widest uppercase rounded-none hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Explore Work
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-8 py-4 border border-black/20 text-black font-bold text-xs md:text-sm tracking-widest uppercase rounded-none hover:bg-black hover:text-white transition-all"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: 3D MODEL */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-full md:w-1/2 h-[60vh] md:h-screen flex flex-col items-center justify-center relative"
        >
          <ModelViewer modelPath="/models/model1.glb" />
        </motion.div>

      </div>
    </motion.section>
  );
}
