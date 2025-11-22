"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none" // pointer-events-none allows clicking through empty space
    >
      <div className="pointer-events-auto px-2 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-lg flex items-center gap-2">
        
        {/* Nav Links */}
        {navItems.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-black hover:bg-white/80 transition-colors relative group"
          >
            <span className="relative z-10">{item.name}</span>
            {/* Subtle hover background animation */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
              layoutId="nav-hover"
            />
          </motion.a>
        ))}

        {/* Resume Button (Distinct Style) */}
        <motion.a
          href="/resume.pdf"
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-2 px-6 py-2 rounded-full bg-black text-white text-sm font-bold shadow-md hover:bg-gray-900 transition-colors flex items-center gap-2"
        >
          <span>Resume</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </motion.a>

      </div>
    </motion.nav>
  );
}