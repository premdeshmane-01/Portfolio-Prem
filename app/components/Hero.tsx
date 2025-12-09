"use client";

import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from "framer-motion";
import Image from "next/image";

export default function Hero() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 900], [0, -1200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 1.05]);

    // Mouse parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    };

    const springConfig = { damping: 25, stiffness: 150 };
    const moveX = useSpring(
        useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
        springConfig
    );
    const moveY = useSpring(
        useTransform(mouseY, [-0.5, 0.5], [-20, 20]),
        springConfig
    );

    // Reverse movement for background
    const bgMoveX = useSpring(
        useTransform(mouseX, [-0.5, 0.5], [10, -10]),
        springConfig
    );
    const bgMoveY = useSpring(
        useTransform(mouseY, [-0.5, 0.5], [10, -10]),
        springConfig
    );

    return (
        <motion.section
            style={{ y: heroY }}
            className="fixed inset-0 w-full h-screen z-0 overflow-hidden bg-[#0a0a0a]"
            onMouseMove={handleMouseMove}
        >
            {/* BACKGROUND IMAGE */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ scale, opacity, x: bgMoveX, y: bgMoveY }}
            >
                <Image
                    src="/yes.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover object-right opacity-100"
                    priority
                    quality={100}
                />

                {/* Grain Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage:
                            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                    }}
                />

                {/* Removed black tint gradients */}
                {/* 
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent w-[80%] md:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent h-[30%]" />
        */}
            </motion.div>

            {/* Subtle background accent */}
            <motion.div
                style={{ x: moveX, y: moveY }}
                className="pointer-events-none absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[120px]"
            />

            <div className="relative z-10 w-full h-full flex max-w-[1920px] mx-auto">
                {/* --- MAIN CONTENT --- */}
                <div className="flex-1 flex flex-col justify-center items-start pl-8 md:pl-24 pr-8 space-y-10 max-w-4xl">
                    {/* Badge with animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-default">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
                                Building Experiences
                            </span>
                        </div>
                    </motion.div>

                    {/* NAME - Staggered reveal */}
                    <div className="space-y-0 relative">
                        <div className="overflow-hidden pb-2">
                            <motion.h1
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.9]"
                            >
                                PREMSAGAR
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden relative">
                            <motion.h1
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.55,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="text-7xl md:text-9xl font-black text-white/40 tracking-tighter leading-[0.9]"
                            >
                                DESHMANE
                            </motion.h1>

                            {/* Animated Line */}
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 w-1 md:w-2 h-[80%] bg-white"
                                initial={{ scaleY: 0, originY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 1, delay: 1, ease: "circOut" }}
                            />
                        </div>
                    </div>

                    {/* SUBTEXT */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                        className="space-y-3 pl-2"
                    >
                        <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light max-w-xl">
                            Architecting{" "}
                            <span className="text-white font-medium relative inline-block group cursor-none">
                                Intelligent Systems
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
                            </span>{" "}
                            with{" "}
                            <span className="text-white font-medium relative inline-block group cursor-none">
                                Precision Design
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
                            </span>
                        </p>
                    </motion.div>

                    {/* BUTTONS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.4,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex flex-wrap gap-5 pt-8 pl-2"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-white text-black font-bold text-sm tracking-[0.2em] uppercase overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                                Explore Work
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </motion.a>

                        <motion.a
                            href="/resume.pdf"
                            download
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-[0.2em] uppercase transition-all hover:bg-white/5 backdrop-blur-sm"
                        >
                            <span className="flex items-center gap-3">
                                Download CV
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                            </span>
                        </motion.a>
                    </motion.div>

                    {/* Scroll indicator (centered) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2, ease: "easeOut" }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4"
                    >
                        <motion.div className="w-[1px] h-12 bg-white/20 overflow-hidden">
                            <motion.div
                                className="w-full h-1/2 bg-white"
                                animate={{ y: [-24, 48] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </motion.div>
                        <span className="text-[10px] text-white/40 uppercase tracking-[0.25em]">
                            Scroll to explore
                        </span>
                    </motion.div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex-1 hidden lg:block" />
            </div>
        </motion.section>
    );
}
