"use client";
import { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects", err));

    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // SMART POSITIONING LOGIC - TIGHTER GAP
  // If mouse is on LEFT side -> Show image 40px to the RIGHT of cursor
  // If mouse is on RIGHT side -> Show image 440px to the LEFT (400px width + 40px gap)
  const imageXOffset = mousePos.x < windowWidth / 2 ? 40 : -440;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="projects" 
      className="py-20 px-4 relative z-10"
      onMouseMove={handleMouseMove} 
    >
      {/* FLOATING IMAGE PREVIEW */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.img
            src={hoveredProject}
            alt="Project Preview"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              // Dynamic X position: Closer to cursor
              x: mousePos.x + imageXOffset, 
              y: mousePos.y - 150, // Center vertically on cursor
              rotate: mousePos.x < windowWidth / 2 ? 5 : -5 // Tilt inward
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.1, ease: "easeOut" }} // Snappy follow
            className="fixed top-0 left-0 w-[400px] h-[250px] object-cover rounded-xl pointer-events-none z-50 border-2 border-white/20 shadow-2xl bg-black"
          />
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Featured Projects
        </motion.h2>

        <motion.div 
          // FIX: This key forces the animation to restart when projects load
          key={projects.length} 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project: any) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredProject(project.image)}
              onMouseLeave={() => setHoveredProject(null)}
              className="glass-card group relative p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/30 cursor-none" 
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-gray-300 transition-colors">{project.title}</h3>
                </div>
                <div className="flex gap-3 z-20 relative">
                  <a href={project.githubLink} target="_blank" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                    <Github size={18} />
                  </a>
                  {project.liveLink && project.liveLink !== "#" && (
                     <a href={project.liveLink} target="_blank" className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                     <ExternalLink size={18} />
                   </a>
                  )}
                </div>
              </div>

              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 border border-white/10 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}