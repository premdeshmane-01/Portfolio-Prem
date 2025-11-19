"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Counter Animation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800); // Slight pause at 100% for impact
          return 100;
        }
        // Smaller, smoother increments
        const jump = Math.floor(Math.random() * 5) + 1; 
        return Math.min(prev + jump, 100);
      });
    }, 50); // Faster interval for fluidity

    return () => clearInterval(interval);
  }, []);

  // Dynamic Color Logic: Shifts from Dark Gray (#444) to Pure White (#FFF)
  // Formula: 68 is roughly #444444, we add up to 255
  const colorValue = Math.floor(68 + (count / 100) * 187);
  const dynamicColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] cursor-none"
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }} 
        >
          <div className="flex flex-col items-center gap-4">
            
            {/* 1. Minimalist Percentage Counter */}
            <motion.span 
              className="text-4xl font-mono font-light tracking-widest"
              animate={{ color: dynamicColor }} // Color shifts dynamically
            >
              {count}%
            </motion.span>

            {/* 2. Dynamic Progress Bar */}
            <div className="w-48 h-[2px] bg-gray-900 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full absolute top-0 left-0"
                style={{ width: `${count}%` }}
                animate={{ backgroundColor: dynamicColor, boxShadow: `0 0 10px ${dynamicColor}` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>

            {/* 3. Tiny Status Text */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 mt-2">
              System Initializing
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}