"use client";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Github, ArrowUpRight, Layers } from "lucide-react";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data || []))
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <section 
      id="projects" 
      // CHANGED: md:py-24 -> md:pt-24 md:pb-12
      // This reduces the bottom gap on desktop while keeping the top breathing room.
      className="py-12 md:pt-24 md:pb-12 px-4 md:px-6 relative z-20 bg-[#DEDEDE]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-20 border-b border-black/5 pb-6 md:pb-10"
        >
          <div className="space-y-2 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded border border-black/5 bg-white/50 backdrop-blur-sm">
                <Layers size={10} className="text-emerald-600" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Selected Works</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium text-black tracking-tight leading-tight">
              Curated <span className="text-gray-400 font-light italic">Excellence</span>
            </h2>
          </div>

          <p className="text-gray-600 max-w-xs text-left md:text-right text-xs md:text-sm font-medium leading-relaxed mt-4 md:mt-0">
            Digital experiences crafted with pixel-perfect precision and engineering depth.
          </p>
        </motion.div>

        {/* ---------------- MOBILE: Immersive Poster Carousel ---------------- */}
        <div className="md:hidden flex overflow-x-auto gap-4 pb-8 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="relative snap-center flex-shrink-0 w-[85vw] max-w-[340px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl shadow-black/10 border border-white/20"
            >
              {/* Full Background Image */}
              <div className="absolute inset-0 bg-gray-900">
                <img
                  src={project.image || "/placeholder.jpg"}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90"
                />
                {/* Cinematic Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                
                {/* Category Badge */}
                <div className="mb-auto">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/80">
                        {project.category}
                    </span>
                </div>

                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white leading-tight">
                        {project.title}
                    </h3>
                    
                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-light">
                        {project.description}
                    </p>

                    {/* Glassmorphic Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {Array.isArray(project.techStack) &&
                            project.techStack.slice(0, 3).map((t: string) => (
                            <span key={t} className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/5 text-[10px] text-white/90 font-medium">
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <a
                            href={project.githubLink || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center gap-2 text-white text-xs font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all"
                        >
                            <Github size={16} /> Code
                        </a>
                        {project.liveLink && project.liveLink !== "#" && (
                            <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-3 rounded-xl bg-white text-black flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide hover:bg-emerald-400 transition-colors"
                            >
                            Demo <ArrowUpRight size={16} />
                            </a>
                        )}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- DESKTOP: Cinematic Grid ---------------- */}
        <motion.div
          className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project: any) => (
            <motion.div key={project.id} variants={cardVariants} className="group flex flex-col gap-8">
              {/* 1. Cinematic Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-gray-200 shadow-sm group-hover:shadow-2xl transition-all duration-700 ease-out">
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

              {/* 2. Project Details */}
              <div className="space-y-4 px-2">
                <div className="flex justify-between items-baseline border-b border-black/5 pb-4">
                  <h3 className="text-3xl font-medium text-black tracking-tight group-hover:text-[#00C853] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{project.category}</span>
                </div>

                <p className="text-gray-600 text-base leading-relaxed line-clamp-2 font-light">{project.description}</p>

                {/* Refined Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {Array.isArray(project.techStack) &&
                    project.techStack.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 text-[11px] font-semibold text-gray-500 bg-gray-100 rounded-full uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-300">
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