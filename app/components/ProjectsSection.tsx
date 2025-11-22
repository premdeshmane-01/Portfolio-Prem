"use client";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } // Cinematic easing
    }
  };

  return (
    <section id="projects" className="py-32 px-6 relative z-10 bg-[#DEDEDE]">
      <div className="max-w-7xl mx-auto">

        {/* Section Header - Refined & Balanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black/5 pb-10"
        >
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
              // Selected Works
            </span>
            <h2 className="text-5xl md:text-7xl font-medium text-black tracking-tight">
              Curated <span className="text-gray-400 font-light italic">Projects</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-xs text-right text-sm font-medium leading-relaxed mt-6 md:mt-0">
            A collection of digital experiences crafted with precision, performance, and passion.
          </p>
        </motion.div>

        {/* Projects Grid - Immersive & Cinematic */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project: any) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group flex flex-col gap-8"
            >
              {/* 1. Cinematic Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-gray-200 shadow-sm group-hover:shadow-2xl transition-all duration-700 ease-out">
                {/* Image with slow parallax-like zoom */}
                <img
                  src={project.image || "/placeholder.jpg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />

                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Action Buttons - Floating Appearance */}
                <div className="absolute bottom-6 right-6 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    title="View Code"
                  >
                    <Github size={18} strokeWidth={2} />
                  </a>
                  {project.liveLink && project.liveLink !== "#" && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-black hover:bg-[#00C853] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                      title="Live Demo"
                    >
                      <ArrowUpRight size={18} strokeWidth={2} />
                    </a>
                  )}
                </div>
              </div>

              {/* 2. Project Details - Clean & Sophisticated */}
              <div className="space-y-4 px-2">
                <div className="flex justify-between items-baseline border-b border-black/5 pb-4">
                  <h3 className="text-3xl font-medium text-black tracking-tight group-hover:text-[#00C853] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-600 text-base leading-relaxed line-clamp-2 font-light">
                  {project.description}
                </p>

                {/* Refined Tags - Monochrome Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-[11px] font-semibold text-gray-500 bg-gray-100 rounded-full uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}