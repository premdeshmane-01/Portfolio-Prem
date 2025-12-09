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
      className="relative z-10 overflow-hidden bg-[#020617] py-24 px-6"
    >
      {/* Background orbs / gradients */}
      <div className="pointer-events-none absolute inset-0">
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

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 md:flex-row md:items-start">
        {/* LEFT COLUMN – title + story */}
        <div className="flex-1 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.45)]" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-100/80">
              About
            </span>
          </motion.div>

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

              <p className="max-w-xl text-sm leading-relaxed text-slate-300/90">
                I enjoy sitting at the point where{" "}
                <span className="font-semibold text-slate-50">
                  engineering depth
                </span>{" "}
                meets{" "}
                <span className="font-semibold text-slate-50">
                  visual precision
                </span>
                . My work usually starts with messy constraints and ends with
                clear flows, stable systems, and interfaces that feel
                intentional rather than accidental.
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
                    desc: "Using AI to remove friction: assistants, internal tools, and automation around products.",
                  },
                  {
                    title: "Ship, then refine",
                    desc: "I like short build → feedback → refine loops more than big bang launches.",
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

        {/* RIGHT COLUMN – animated “profile module” */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 max-w-md self-stretch"
        >
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.02,
              boxShadow: "0 28px 75px rgba(0,0,0,0.85)",
            }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
            className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50"
          >
            {/* subtle diagonal glow */}
            <motion.div
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                repeatDelay: 2.2,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -inset-y-20 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent"
            />
            {/* noise */}
            <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15" />

            <div className="relative space-y-8 p-8 md:p-9">
              {/* top row */}
              <Reveal delay={0.15}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                      System Profile
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      Premsagar Deshmane
                    </h3>
                    <p className="mt-1 text-[0.8rem] text-slate-400">
                      Frontend · AI · Systems
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-right text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-200"
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>Active</span>
                    </div>
                    <p className="mt-1 text-[0.65rem] text-emerald-100/80">
                      Open to roles
                    </p>
                  </motion.div>
                </div>
              </Reveal>

              {/* description */}
              <Reveal delay={0.23}>
                <p className="text-sm leading-relaxed text-slate-300">
                  Computer Engineering student at SNJB (SPPU) and{" "}
                  <span className="font-semibold text-slate-50">
                    Team Lead for SIH 2026
                  </span>
                  . I like working on problems where reliability, polish, and
                  intelligence are all non-negotiable.
                </p>
              </Reveal>

              {/* metrics */}
              <Reveal delay={0.3}>
                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm">
                  {[
                    { label: "CGPA", value: "8.8" },
                    { label: "Projects", value: "20+" },
                    { label: "Internships", value: "2" },
                    { label: "SIH", value: "National Finalist" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.3 + idx * 0.05,
                      }}
                      whileHover={{
                        y: -4,
                        scale: 1.04,
                        boxShadow: "0 20px 50px rgba(15,23,42,0.9)",
                      }}
                      className="cursor-default rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
                    >
                      <div className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
                        {stat.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-50">
                        {stat.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>

              {/* bottom strip – focus tags */}
              <Reveal delay={0.42}>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "Frontend Engineering",
                    "AI Integration",
                    "System Design",
                    "Developer Experience",
                  ].map((tag, idx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: 0.42 + idx * 0.04,
                      }}
                      whileHover={{
                        y: -2,
                        scale: 1.03,
                        backgroundColor: "rgba(56,189,248,0.22)",
                      }}
                      className="cursor-default rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[0.7rem] font-medium text-slate-100"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
