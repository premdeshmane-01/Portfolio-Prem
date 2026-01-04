"use client";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Github, ArrowUpRight, Layers } from "lucide-react";

// --- UPDATED SUB-COMPONENT: ProjectCard ---
function ProjectCard({ project, index, variants }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Track if mouse is over card
  const hasMultipleImages = project.images && project.images.length > 1;

  useEffect(() => {
    // STRICT RULE: Do not run timer if not hovering
    if (!hasMultipleImages || !isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 3000); // <--- EXACTLY 3 SECONDS

    return () => clearInterval(interval);
  }, [hasMultipleImages, project.images, isHovered]);

  // When mouse leaves, stop everything and reset to cover image
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <motion.div
      variants={variants}
      className={`group flex flex-col gap-6 ${
        index < 2 ? "md:col-span-3" : "md:col-span-2"
      }`}
      // 1. START HOVER TRACKING
      onMouseEnter={() => setIsHovered(true)}
      // 2. STOP HOVER TRACKING
      onMouseLeave={handleMouseLeave}
    >
      {/* Cinematic Image Container */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-gray-200 shadow-sm group-hover:shadow-2xl transition-all duration-700 ease-out ${
          index < 2 ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        {/* IMAGE LOGIC: Stacked images with Opacity transition */}
        {hasMultipleImages ? (
          project.images.map((img: string, idx: number) => (
            <motion.img
              key={img}
              src={img}
              alt={`${project.title} - view ${idx + 1}`}
              initial={false}
              animate={{
                // Only show the current index.
                opacity: idx === currentImageIndex ? 1 : 0,
                // Keep the visible image on top of the fading-out one
                zIndex: idx === currentImageIndex ? 10 : 1,
              }}
              // Smooth 1.2s crossfade. 
              // Since interval is 3s, you get: 1.2s fade -> 1.8s static -> repeat.
              transition={{ duration: 1.2, ease: "easeInOut" }} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))
        ) : (
          <img
            src={project.image || "/placeholder.jpg"}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        {/* Action Buttons */}
        <div className="absolute bottom-5 right-5 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 z-30">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
          >
            <Github size={16} strokeWidth={2} />
          </a>
          {project.liveLink && project.liveLink !== "#" && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-black hover:bg-[#00C853] hover:text-white transition-all duration-300 shadow-lg"
            >
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-3 px-1">
        <div className="flex justify-between items-start">
          <h3
            className={`font-medium text-black tracking-tight group-hover:text-[#00C853] transition-colors duration-300 ${
              index < 2 ? "text-2xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">
            {project.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 font-light">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {Array.isArray(project.techStack) &&
            project.techStack.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] font-semibold text-gray-500 bg-gray-100 rounded-md uppercase tracking-wide group-hover:bg-black group-hover:text-white transition-colors duration-300"
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

        // 1. DEFINE: Wolf Project
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

        // 2. FIND & UPDATE: The "Sundown" Project
        let cloneProject = fetchedProjects.find(
          (p: any) =>
            p.title.toLowerCase().includes("sundown") ||
            p.title.toLowerCase().includes("clone")
        );

        if (cloneProject) {
          cloneProject = {
            ...cloneProject,
            // Override images with your local files:
            images: [
              "/projects/sundown-1.png", 
              "/projects/sundown-2.png",
              "/projects/sundown-3.png",
              "/projects/sundown-4.png",
            ],
          };
        }

        // 3. FILTER
        const otherProjects = fetchedProjects.filter(
          (p: any) =>
            p.id !== "wolf-3d-clone" &&
            p.title !== "3D Wolf Experience" &&
            p.id !== cloneProject?.id
        );

        // 4. COMBINE
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
      className="py-12 md:pt-24 md:pb-12 px-4 md:px-6 relative z-20 bg-[#DEDEDE]"
    >
      <div className="max-w-7xl mx-auto">
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
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                Selected Works
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium text-black tracking-tight leading-tight">
              Curated{" "}
              <span className="text-gray-400 font-light italic">Excellence</span>
            </h2>
          </div>

          <p className="text-gray-600 max-w-xs text-left md:text-right text-xs md:text-sm font-medium leading-relaxed mt-4 md:mt-0">
            Digital experiences crafted with pixel-perfect precision and
            engineering depth.
          </p>
        </motion.div>

        <div className="md:hidden flex flex-col gap-8 pb-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              variants={cardVariants}
            />
          ))}
        </div>

        <motion.div
          className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-x-8 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
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