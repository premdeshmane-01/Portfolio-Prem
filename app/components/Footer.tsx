"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react"; 

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { 
          hour: "2-digit", 
          minute: "2-digit",
          timeZone: "Asia/Kolkata" 
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.footer
      className="w-full bg-[#DEDEDE] flex flex-col justify-between px-8 md:px-24 py-8 overflow-hidden text-black relative border-t border-black/5"
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      viewport={{ amount: 0.3, once: false }}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cccccc_1px,transparent_1px),linear-gradient(to_bottom,#cccccc_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      {/* TOP SECTION - Compact */}
      <div className="flex flex-col md:flex-row justify-between items-start w-full relative z-10">
        {/* Left: Navigation */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">
            Navigation
          </h3>
          <div className="flex flex-col gap-0">
            {["Home", "About", "Projects", "Resume"].map((item, idx) => {
              if (item === "Home") {
                return (
                  <a
                    key={idx}
                    href="#home"
                    onClick={handleHomeClick}
                    className="text-4xl md:text-6xl font-bold text-black hover:text-[#00C853] transition-colors tracking-tighter cursor-pointer"
                  >
                    {item}
                  </a>
                );
              }

              const href =
                item === "Resume"
                  ? "/resume.pdf"
                  : `#${item.toLowerCase()}`;

              return (
                <a
                  key={idx}
                  href={href}
                  className="text-4xl md:text-6xl font-bold text-black hover:text-[#00C853] transition-colors tracking-tighter"
                >
                  {item}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: Info & Socials */}
        <div className="flex flex-col items-end text-right gap-6 mt-6 md:mt-0">
          {/* Status */}
          <div className="flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-black/5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-black uppercase tracking-wider">
              Open to Opportunities
            </span>
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
              Drop a line
            </h3>
            <a 
              href="mailto:premdeshmane01@gmail.com" 
              className="text-xl md:text-2xl font-medium text-black hover:text-[#00C853] transition-colors block"
            >
              premdeshmane01@gmail.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a 
              href="https://linkedin.com/in/prem-deshmane01" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full border border-black/10 hover:bg-black hover:text-white hover:border-black transition-all duration-300 group"
              title="LinkedIn"
            >
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
            <a 
              href="https://github.com/premdeshmane-01" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full border border-black/10 hover:bg-black hover:text-white hover:border-black transition-all duration-300 group"
              title="GitHub"
            >
              <Github size={18} strokeWidth={1.5} />
            </a>
            <a 
              href="mailto:premdeshmane01@gmail.com" 
              className="p-2.5 rounded-full border border-black/10 hover:bg-black hover:text-white hover:border-black transition-all duration-300 group"
              title="Email"
            >
              <Mail size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex flex-col md:flex-row justify-between items-end w-full relative z-10 pt-4 border-t border-black/10">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Local Time
          </span>
          <p className="text-xs font-medium text-black flex items-center gap-2">
            Nashik, India <span className="text-gray-400">|</span> {time}
          </p>
        </div>

        <div className="text-right mt-4 md:mt-0">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Designed &amp; Built by
          </p>
          <p className="text-xs font-bold text-black mt-1">
            Premsagar Deshmane © 2025
          </p>
        </div>
      </div>

      {/* Background Text */}
      <h1 className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] text-[15vw] font-black text-black/5 select-none pointer-events-none whitespace-nowrap z-0">
        PREMSAGAR
      </h1>
    </motion.footer>
  );
}
