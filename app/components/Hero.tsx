"use client";


import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";




export default function Hero() {
  // viewport tracking — used to choose image + object positioning
  const [vw, setVw] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [freezeMotion, setFreezeMotion] = useState(false);


  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, -1200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);

  // Mouse parallax (kept as-is)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };


  useEffect(() => {
  const onScroll = () => {
    if (window.scrollY > window.innerHeight * 0.6) {
      setFreezeMotion(true);
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  const bgMoveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), springConfig);
  const bgMoveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);

  // --- IMAGE STRATEGY ---
  // 1) If you have a mobile-cropped image, name it '/yes-mobile.jpg' (or change below).
  // 2) The component will choose mobile image for vw < 640; otherwise uses desktop image.
  // 3) Still apply objectPosition to nudge the focal point when mobile image is not available.
  const desktopSrc = "/yes1.webp";
  const mobileSrc = "/mobile.webp"; // optional — provide this for best results

  // choose src - we try to use mobileSrc when on small screens
  const usingMobileImage = vw < 640;
  // Note: Next/Image will 404 if mobileSrc doesn't exist; to avoid runtime error,
  // provide a mobile image file or keep using desktopSrc only (replace mobileSrc with desktopSrc).
  const chosenSrc = usingMobileImage ? mobileSrc : desktopSrc;

  // objectPosition tuning: if you don't have a mobile-specific crop
  // set objectPosition to keep the subject visible. Adjust manually if your subject sits differently.
  const objectPosition =
    vw < 420
      ? "50% 14%" // phones: move the focal point toward top (subject appears higher)
      : vw < 640
      ? "50% 22%"
      : vw < 1024
      ? "70% 50%" // tablets: slightly right
      : "85% 50%"; // large: keep right side focus

  return (
    <motion.section
    id="home"
      style={{ y: heroY }}
      className="fixed inset-0 w-full h-[100dvh] z-0 overflow-hidden bg-[#0a0a0a]"
      onMouseMove={handleMouseMove}
    >
      {/* BACKGROUND IMAGE CONTAINER */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale, opacity, x: bgMoveX, y: bgMoveY }}
      >
        <Image
  src={chosenSrc}
  alt="Hero Background"
  fill
  priority
  sizes="100vw"
  quality={90}
  className="
    object-cover
    sm:filter-none
    sm:blur-0
    sm:contrast-100
    sm:saturate-100

    filter
    blur-[6px]
    contrast-90
    saturate-90
  "
  style={{
    objectPosition: objectPosition,
  }}
/>


        {/* Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />

        

        {/* Mobile Gradient (darken bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent sm:hidden" />

        {/* Desktop Gradient (darken left area where text sits) */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent w-[70%]" />
      </motion.div>

      {/* Subtle background accent */}
      <motion.div
        style={{ x: moveX, y: moveY }}
        className="pointer-events-none absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-blue-500/[0.02] blur-[80px] md:blur-[120px]"
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full flex max-w-[1920px] mx-auto">
        <div className="flex-1 flex flex-col justify-end pb-20 sm:pb-0 sm:justify-center items-start px-6 md:pl-24 md:pr-8 space-y-6 md:space-y-10 max-w-4xl pt-12 md:pt-0">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-default">
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-white" />
              </span>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/80">Building Experiences</span>
            </div>
          </motion.div>

          {/* Name */}
          <div className="space-y-0 relative w-full">
            <div className="overflow-hidden pb-1 md:pb-2">
              <motion.h1 initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.9]">
                PREMSAGAR
              </motion.h1>
            </div>

            <div className="overflow-hidden relative pb-1 md:pb-0">
              <motion.h1 initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.55 }} className="text-5xl sm:text-7xl md:text-9xl font-black text-white/40 tracking-tighter leading-[0.9]">
                DESHMANE
              </motion.h1>
              <motion.div className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-8 w-1 md:w-2 h-[60%] md:h-[80%] bg-white" initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 1, ease: "circOut" }} />
            </div>
          </div>

          {/* Subtext */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }} className="space-y-3 pl-1 md:pl-2">
            <p className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-xs sm:max-w-xl">
              Architecting{" "}
              <span className="text-white font-medium relative inline-block group">
                Intelligent Systems
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
              </span>{" "}
              with{" "}
              <span className="text-white font-medium relative inline-block group">
                Precision Design
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
              </span>
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4 }} className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4 md:pt-8 pl-1 md:pl-2 w-full sm:w-auto">
            <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group relative px-8 py-3.5 md:py-4 bg-white text-black font-bold text-sm tracking-[0.2em] uppercase overflow-hidden text-center sm:text-left">
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center justify-center sm:justify-start gap-3 group-hover:text-white transition-colors duration-300">Explore Work</span>
            </motion.a>

            <motion.a href="/resume.pdf" download whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group px-8 py-3.5 md:py-4 border border-white/20 text-white font-bold text-sm tracking-[0.2em] uppercase transition-all hover:bg-white/5 backdrop-blur-sm text-center sm:text-left">
              <span className="flex items-center justify-center sm:justify-start gap-3">Download CV</span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }} className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <motion.div className="w-[1px] h-8 md:h-12 bg-white/20 overflow-hidden">
              <motion.div className="w-full h-1/2 bg-white" animate={{ y: [-24, 48] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
            </motion.div>
          </motion.div>
        </div>

        <div className="flex-1 hidden lg:block" />
      </div>
    </motion.section>
  );
}
