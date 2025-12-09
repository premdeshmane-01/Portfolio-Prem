"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // Use MotionValues for direct DOM manipulation (Performance Boost)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configuration for smooth follow
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Directly update motion value (no re-renders!)
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("cursor-pointer");

      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Creative Morphing Cursor 
        - Smooth Motion: Uses useSpring for physics-based movement
        - Mix-blend-difference for visibility
      */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%", // Centers the cursor perfectly on the mouse
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          rotate: isHovering ? 0 : 45, // Rotates from diamond to square
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
      >
        {/* The visual shape itself */}
        <motion.div 
          className="w-full h-full border-2 border-white bg-transparent"
          animate={{
            scale: isHovering ? 1 : 0.8,
            borderRadius: isHovering ? "20%" : "0%", // Morphs shape
            borderColor: "white",
            borderWidth: isHovering ? "2px" : "4px", // Thicker when small
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {/* Center Dot for precision - Moves Instantly (No Spring) */}
      <motion.div 
         className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
         style={{
            x: cursorX, // Direct raw mouse position for zero lag
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
         }}
         animate={{
           opacity: isHovering ? 0 : 1
         }}
         transition={{ duration: 0.1 }}
      />
    </>
  );
}