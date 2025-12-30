"use client";

import { motion, type Transition } from "framer-motion";
import Reveal from "./Reveal";

const floatTransition: Transition = {
  duration: 4,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden bg-[#020617] py-16 md:py-24 px-4 md:px-6"
    >
      {/* ---------------- Desktop visuals ---------------- */}
      <div className="hidden md:block pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.9, scale: 1.05 }}
          transition={floatTransition}
          className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/40 via-sky-500/20 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0.7, scale: 1.1 }}
          transition={floatTransition}
          className="absolute bottom-[-6rem] right-[-5rem] h-96 w-96 rounded-full bg-gradient-to-tr from-fuchsia-500/40 via-purple-500/20 to-transparent blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)] opacity-70" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 md:items-start">
          {/* LEFT COLUMN */}
          <div className="flex-1 space-y-8 md:space-y-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur text-slate-100/90"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.45)]" />
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em]">
                About
              </span>
            </motion.div>

            {/* ---------------- DESKTOP CONTENT ---------------- */}
            <div className="hidden md:block">
              <Reveal delay={0.15}>
                <div className="space-y-4">
                  <motion.h2
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ type: "spring", stiffness: 150, damping: 12 }}
                    className="text-4xl font-black tracking-tight text-slate-50 sm:text-5xl"
                  >
                    Architecting{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                      intelligent systems
                    </span>
                    <br />
                    that actually feel designed.
                  </motion.h2>

                  {/* ✅ SEO + HUMAN ABOUT TEXT */}
                  <p className="max-w-xl text-sm leading-relaxed text-slate-300/90">
                    I’m{" "}
                    <span className="font-semibold text-slate-50">
                      Premsagar Deshmane
                    </span>
                    , a Computer Engineering student focused on frontend
                    development, AI integration, and system design. I enjoy
                    working at the intersection of engineering depth and visual
                    precision—starting with real constraints and ending with
                    reliable systems and interfaces that feel intentional,
                    clear, and usable.
                  </p>

                  <p className="max-w-xl text-sm leading-relaxed text-slate-300/90">
                    Currently studying Computer Engineering at SNJB College of
                    Engineering (SPPU), I build modern web applications using
                    React and Next.js while exploring applied AI through
                    real-world projects, internships, and competitive problem
                    solving.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
                    How I think about building
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "System-first mindset",
                        desc: "Before pixels, I care about data, flows, edge-cases, and how everything composes.",
                      },
                      {
                        title: "Interfaces with intent",
                        desc: "Minimal, expressive UI where each interaction has a reason to exist.",
                      },
                      {
                        title: "AI as leverage",
                        desc: "Using AI to remove friction: assistants, internal tools, and automation.",
                      },
                      {
                        title: "Ship, then refine",
                        desc: "Short build → feedback → refine loops over big bang launches.",
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        whileHover={{
                          y: -6,
                          scale: 1.02,
                          rotateX: 2,
                          boxShadow: "0 22px 55px rgba(15,23,42,0.70)",
                        }}
                        className="cursor-default rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4 text-sm text-slate-200 backdrop-blur"
                      >
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                          {item.title}
                        </p>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-slate-300">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ---------------- MOBILE CONTENT ---------------- */}
            <div className="md:hidden space-y-3">
              <h2 className="text-2xl font-extrabold text-slate-50 leading-snug">
                Architecting{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                  intelligent systems
                </span>
              </h2>

              <p className="text-sm text-slate-300/90">
                Premsagar Deshmane — Computer Engineering student focused on
                frontend, AI, and reliable system design.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-slate-400 uppercase font-semibold">
                  Focus
                </div>
                <div className="text-slate-200">Frontend · AI · Systems</div>

                <div className="text-slate-400 uppercase font-semibold">
                  Approach
                </div>
                <div className="text-slate-200">Ship small, iterate fast</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — untouched (desktop + mobile cards remain same) */}
          {/* Your existing right column code stays exactly as-is */}
        </div>
      </div>
    </section>
  );
}
