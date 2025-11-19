"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center p-6"
    >
      <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex gap-8 text-sm font-medium text-gray-300 shadow-lg">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="/resume.pdf" className="text-blue-400 hover:text-blue-300">Resume</a>
      </div>
    </motion.nav>
  );
}