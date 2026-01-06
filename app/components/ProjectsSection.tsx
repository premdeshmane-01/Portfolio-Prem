"use client";
import { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Github, ArrowUpRight, Layers, Sparkles } from "lucide-react";

// --- UTILITY: Noise Background for Texture ---
const NoiseBackground = () => (
  <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
    <svg width="100%" height="100%">
      <filter id="pedigree-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.80"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#pedigree-noise)" />
    </svg>
  </div>
);

// --- UPDATED SUB-COMPONENT: ProjectCard ---
function ProjectCard({ project, index, variants }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const hasMultipleImages = project.images && project.images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages || !isHovered) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 3 Seconds
    return () => clearInterval(interval);
  }, [hasMultipleImages, project.images, isHovered]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <motion.div
      variants={variants}
      className={`group relative flex flex-col gap-5 ${
        index < 2 ? "md:col-span-3" : "md:col-span-2"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cinematic Image Container */}
      <div
        className={`relative w-full overflow-hidden rounded-[2rem] bg-gray-100 border border-white/20 shadow-sm transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] ${
          index < 2 ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        {/* Image Wrapper for Scaling Effect */}
        <div className="relative w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105">
          {hasMultipleImages ? (
            <AnimatePresence mode="popLayout">
              {project.images.map((img: string, idx: number) => (
                <motion.img
                  key={`${img}-${idx}`}
                  src={img}
                  alt={`${project.title} - view ${idx + 1}`}
                  initial={false}
                  animate={{
                    opacity: idx === currentImageIndex ? 1 : 0,
                    zIndex: idx === currentImageIndex ? 10 : 1,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
            </AnimatePresence>
          ) : (
            <img
              src={project.image || "/placeholder.jpg"}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-3 z-30 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
            title="View Source"
          >
            <Github size={18} />
          </a>
          {project.liveLink && project.liveLink !== "#" && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white text-black rounded-full hover:bg-[#00C853] hover:text-white transition-all duration-300 shadow-lg"
              title="Live Demo"
            >
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          )}
        </div>
      </div>

      {/* Project Meta Data */}
      <div className="flex flex-col gap-3 px-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3
              className={`font-semibold text-neutral-900 tracking-tight leading-none group-hover:text-[#00C853] transition-colors duration-300 ${
                index < 2 ? "text-3xl" : "text-2xl"
              }`}
            >
              {project.title}
            </h3>
            <span className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              {project.category}
            </span>
          </div>
        </div>

        <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2 font-medium max-w-[90%]">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {Array.isArray(project.techStack) &&
            project.techStack.slice(0, 4).map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 text-[11px] font-semibold text-neutral-600 border border-neutral-200 bg-white rounded-full uppercase tracking-wider transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white"
              >
                {tech}
              </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN COMPONENT ---
export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const fetchedProjects = data || [];

        const wolfProject = {
          id: "wolf-3d-clone",
          title: "3D Wolf Experience",
          category: "Interactive 3D",
          description:
            "An immersive WebGL experience featuring a reactive 3D wolf model with dynamic lighting and particle effects.",
          image: "/projects/wolf.png",
          images: [
            "/projects/wolf-1.png",
            "/projects/wolf-2.png",
            "/projects/wolf-3.png",
          ],
          techStack: ["Next.js", "Three.js", "R3F", "Tailwind"],
          githubLink: "https://github.com/premdeshmane-01/3d_wolfie",
          liveLink:
            "https://wolf3d-5uz8h9joj-premdeshmane-01s-projects.vercel.app/",
        };

        let cloneProject = fetchedProjects.find(
          (p: any) =>
            p.title.toLowerCase().includes("sundown") ||
            p.title.toLowerCase().includes("clone")
        );

        if (cloneProject) {
          cloneProject = {
            ...cloneProject,
            images: [
              "/projects/sundown-1.png",
              "/projects/sundown-2.png",
              "/projects/sundown-3.png",
              "/projects/sundown-4.png",
            ],
          };
        }

        const otherProjects = fetchedProjects.filter(
          (p: any) =>
            p.id !== "wolf-3d-clone" &&
            p.title !== "3D Wolf Experience" &&
            p.id !== cloneProject?.id
        );

        setProjects(
          [wolfProject, cloneProject, ...otherProjects].filter(Boolean)
        );
      })
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-20 md:py-32 px-4 md:px-6 bg-[#DEDEDE] overflow-hidden"
    >
      {/* Background Texture */}
      <NoiseBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 border-b border-black/10 pb-8"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 bg-white/40 backdrop-blur-sm shadow-sm">
              <Layers size={12} className="text-emerald-600" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-600 uppercase">
                Selected Works
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-neutral-900 tracking-tighter leading-[0.9]">
              Curated <br className="hidden md:block" />
              <span className="relative inline-block">
                Excellence
                <Sparkles
                  className="absolute -top-6 -right-8 text-[#00C853] opacity-50"
                  size={32}
                  strokeWidth={1}
                />
              </span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-2">
            <p className="text-neutral-600 max-w-sm text-left md:text-right text-sm md:text-base font-medium leading-relaxed">
              Digital experiences crafted with pixel-perfect precision and
              engineering depth.
            </p>
            <div className="h-1 w-20 bg-[#00C853] rounded-full opacity-80" />
          </div>
        </motion.div>

        {/* Mobile View (Stack) */}
        <div className="md:hidden flex flex-col gap-12 pb-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              variants={cardVariants}
            />
          ))}
        </div>

        {/* Desktop View (Bento Grid) */}
        <motion.div
          className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-x-10 gap-y-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project: any, index: number) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}