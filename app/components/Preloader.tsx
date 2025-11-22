"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSequence = [
  "INITIALIZING SYSTEM...",
  "LOADING ASSETS...",
  "CONNECTING TO NEURAL NET...",
  "CALIBRATING 3D ENGINE...",
  "ACCESS GRANTED."
];

export default function Preloader() {
  const [textIndex, setTextIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFinalText, setShowFinalText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev >= bootSequence.length - 1) {
          clearInterval(interval);
          // After boot sequence finishes, show the final message
          setShowFinalText(true);
          
          // Wait 2 seconds on the final message, then hide loader
          setTimeout(() => setIsLoading(false), 2000); 
          return prev;
        }
        return prev + 1;
      });
    }, 300); // Speed of each line appearing

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black cursor-none"
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.8, ease: "easeInOut" } 
          }} 
        >
          {!showFinalText ? (
            <div className="w-80 font-mono text-sm">
              {/* Progress Bar */}
              <div className="w-full h-[2px] bg-gray-900 mb-4 overflow-hidden relative">
                <motion.div 
                  className="h-full absolute top-0 left-0 bg-green-500 shadow-[0_0_10px_#00ff00]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                />
              </div>

              {/* Terminal Lines */}
              <div className="flex flex-col gap-1 h-32">
                {bootSequence.slice(0, textIndex + 1).map((text, idx) => (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`tracking-widest ${
                      idx === bootSequence.length - 1 ? "text-green-400 font-bold" : "text-gray-500"
                    }`}
                  >
                    {`> ${text}`}
                  </motion.p>
                ))}
              </div>
            </div>
          ) : (
            /* Final Message */
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tighter text-center"
            >
              Let's Build <span className="text-gray-500">Experiences.</span>
            </motion.h1>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}