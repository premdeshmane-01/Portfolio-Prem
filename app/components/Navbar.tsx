"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navOpacity = useTransform(scrollY, [0, 50], [0.85, 1]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navY = useTransform(scrollY, [0, 100], [0, -2]);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["home", "about", "projects"];
      for (const section of sections) {
        const element = document.getElementById(section === "home" ? "" : section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const navItems = [
    { name: "Home", href: "#", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Projects", href: "#projects", id: "projects" },
  ];

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none px-6"
    >
      <motion.div 
        style={{ 
          opacity: navOpacity,
          scale: navScale,
          y: navY,
        }}
        onMouseMove={handleMouseMove}
        className={`pointer-events-auto relative px-4 py-3 rounded-full bg-white/80 backdrop-blur-3xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex items-center gap-2 transition-all duration-700 overflow-hidden ${
          isScrolled ? 'shadow-[0_8px_40px_rgba(0,0,0,0.15)] bg-white/95 border-white/70' : ''
        }`}
      >
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 rounded-full opacity-50">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(219, 234, 254, 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(243, 232, 255, 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(252, 231, 243, 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(219, 234, 254, 0.4) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Spotlight effect following cursor */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 197, 253, 0.15), transparent 70%)`,
          }}
        />

        {/* Glass reflection effect */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full pointer-events-none" />

        {/* Nav Links */}
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          
          return (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1 + index * 0.1, 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2.5 rounded-full text-sm font-medium group transition-all duration-300"
            >
              {/* Active background with gradient */}
              {isActive && (
                <motion.div
                  layoutId="activeBg"
                  className="absolute inset-0 bg-gradient-to-br from-gray-900/8 via-gray-800/6 to-gray-900/8 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              
              {/* Hover glow with color shift */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                initial={false}
                animate={{
                  background: [
                    'radial-gradient(circle at 50% 50%, rgba(219, 234, 254, 0) 0%, rgba(219, 234, 254, 0) 100%)',
                    'radial-gradient(circle at 50% 50%, rgba(219, 234, 254, 0.2) 0%, rgba(219, 234, 254, 0) 70%)',
                    'radial-gradient(circle at 50% 50%, rgba(243, 232, 255, 0.2) 0%, rgba(243, 232, 255, 0) 70%)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Underline reveal effect */}
              <motion.div
                className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-0 group-hover:w-3/4 transition-all duration-500"
              />
              
              <span className={`relative z-10 text-xs font-semibold tracking-wide transition-all duration-300 ${
                isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                {item.name}
              </span>
              
              {/* Enhanced dot indicator with pulse */}
              {isActive && (
                <>
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full"
                    animate={{
                      scale: [1, 2.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}
            </motion.a>
          );
        })}

        {/* Enhanced divider with gradient animation */}
        <motion.div 
          className="relative w-px h-6 mx-2 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-400/80 to-transparent"
            animate={{ 
              y: ['-100%', '100%'],
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-300/40 to-transparent" />
        </motion.div>

        {/* Premium Resume Button */}
        <motion.a
          href="/resume.pdf"
          target="_blank"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 1.3, 
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-6 py-2.5 rounded-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-gray-800/50"
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Multi-layer shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              delay: 0.5,
              ease: "easeInOut"
            }}
          />
          
          {/* Enhanced hover effect with color */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          
          <span className="relative z-10 text-xs font-bold tracking-wide">
            Resume
          </span>
          
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="relative z-10"
            animate={{ 
              y: [0, 3, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </motion.svg>
        </motion.a>

      </motion.div>
    </motion.nav>
  );
}