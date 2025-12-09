"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  from?: "up" | "down" | "left" | "right";
}

export default function Reveal({ children, delay = 0.2, from = "up" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getVariants = () => {
    const directions = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { y: 0, x: 40 },
      right: { y: 0, x: -40 },
    };

    return {
      hidden: { 
        opacity: 0, 
        ...directions[from],
        filter: "blur(4px)"
      },
      visible: { 
        opacity: 1, 
        y: 0, 
        x: 0,
        filter: "blur(0px)"
      },
    };
  };

  return (
    <div ref={ref}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={controls}
        transition={{ 
          duration: 0.6, 
          delay, 
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}