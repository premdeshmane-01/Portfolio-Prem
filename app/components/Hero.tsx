"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Alphabet for the scrambling effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Scramble Effect Function
  const scrambleText = (element: HTMLElement, originalText: string) => {
    let iteration = 0;
    const interval = setInterval(() => {
      element.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) return originalText[index];
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= originalText.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    if (nameRef.current) {
      scrambleText(nameRef.current, "PREMSAGAR DESHMANE");
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative z-10 pt-20">
      
      {/* 1. THE PROFILE AVATAR (Tactical Scanner Mode) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="relative w-44 h-44 md:w-56 md:h-56 mb-12 group cursor-pointer"
      >
        {/* Rotating Outer Dashed Ring (The Scanner) */}
        <div className="absolute -inset-4 rounded-full border border-dashed border-gray-700 group-hover:border-white/40 transition-colors duration-500 animate-[spin_12s_linear_infinite]"></div>
        
        {/* Static Inner Ring */}
        <div className="absolute -inset-1 rounded-full border border-white/10 group-hover:border-white/30 transition-colors duration-500"></div>

        {/* The Image Container */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#111] bg-black shadow-2xl">
          {/* Uses standard <img> tag for reliability with your PNG */}
          <img 
            src="/profile.png" 
            alt="Premsagar Deshmane" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out" 
          />
        </div>
      </motion.div>

      {/* Floating Badge - NEW TEXT */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.4 }}
        className="px-5 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] uppercase tracking-[0.3em] mb-8 backdrop-blur-md"
      >
        LETS BUILD EXPERIENCES
      </motion.div>

      {/* Main Scrambling Title */}
      <h1 
        ref={nameRef}
        className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter selection:bg-white selection:text-black"
        onMouseEnter={(e) => scrambleText(e.currentTarget, "PREMSAGAR DESHMANE")} 
      >
        PREMSAGAR DESHMANE
      </h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
      >
        Architecting <span className="text-gray-200 font-medium">Intelligent Systems</span> with <span className="text-gray-200 font-medium">Precision Design</span>.
      </motion.p>
      
      {/* Buttons - High Contrast & Sharp */}
      <div className="flex gap-6 justify-center">
        <motion.a 
          whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#000000" }}
          whileTap={{ scale: 0.98 }}
          href="#projects" 
          className="px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-none border border-white transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Explore Work
        </motion.a>
        
        <motion.a 
          whileHover={{ scale: 1.02, borderColor: "#ffffff", color: "#ffffff" }}
          whileTap={{ scale: 0.98 }}
          href="/resume.pdf" 
          download 
          className="px-8 py-4 border border-gray-800 text-gray-500 font-bold text-sm tracking-widest uppercase rounded-none transition-all hover:bg-white/5"
        >
          Download CV
        </motion.a>
      </div>
    </section>
  );
}