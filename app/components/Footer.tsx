"use client";
import { useEffect, useState } from "react";
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
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateTime();
    const id = setInterval(updateTime, 60_000); // cheap on battery
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ------------------ MOBILE FOOTER (COMPACT) ------------------ */}
      <footer className="md:hidden w-full bg-gradient-to-br from-[#3B0717] to-[#1a030a] text-white px-6 py-6 border-t border-white/10">
        <div className="flex flex-col gap-4">
          {/* Compact nav */}
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <a href="#home" className="hover:text-[#00C853]">Home</a>
            <a href="#about" className="hover:text-[#00C853]">About</a>
            <a href="#projects" className="hover:text-[#00C853]">Projects</a>
            <a href="/resume.pdf" className="hover:text-[#00C853]">Resume</a>
          </div>

          {/* Contact + time */}
          <div className="flex flex-col">
            <a
              href="mailto:premdeshmane01@gmail.com"
              className="font-medium text-sm hover:text-[#00C853]"
            >
              premdeshmane01@gmail.com
            </a>
            <span className="text-xs text-white/60 mt-1">Nashik, India • {time}</span>
          </div>

          {/* Social icons */}
          <div className="flex gap-3 mt-1">
            <a
              href="https://linkedin.com/in/prem-deshmane01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-[#3B0717] transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/premdeshmane-01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-[#3B0717] transition"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:premdeshmane01@gmail.com"
              aria-label="Email"
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-[#3B0717] transition"
            >
              <Mail size={18} />
            </a>
          </div>

          <p className="text-xs text-white/50 mt-2">© 2025 Premsagar Deshmane</p>
        </div>
      </footer>

      {/* ------------------ DESKTOP FOOTER (FULL / NON-OVERLAPPING) ------------------ */}
      <footer className="hidden md:block">
        <div className="w-full bg-gradient-to-br from-[#3B0717] to-[#1a030a] flex flex-col justify-between px-8 md:px-24 py-8 overflow-hidden text-white relative border-t border-white/10">
          {/* Decorative grid texture (non-blocking) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5 z-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.01) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full relative z-10">
            {/* Left: Navigation */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-1 drop-shadow-sm">
                Navigation
              </h3>
              <div className="flex flex-col gap-0">
                {["Home", "About", "Projects", "Resume"].map((item, idx) => (
                  <a
                    key={idx}
                    href={item === "Resume" ? "/resume.pdf" : `#${item.toLowerCase()}`}
                    className="text-4xl md:text-6xl font-bold text-white hover:text-[#00C853] transition-colors tracking-tighter drop-shadow-sm"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Info & Socials */}
            <div className="flex flex-col items-end text-right gap-6 mt-6 md:mt-0">
              {/* Status */}
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Open to Opportunities</span>
              </div>

              {/* Contact */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">Drop a line</h3>
                <a
                  href="mailto:premdeshmane01@gmail.com"
                  className="text-xl md:text-2xl font-medium text-white hover:text-[#00C853] transition-colors block drop-shadow-sm"
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
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#3B0717] transition-all duration-300 group bg-white/5 backdrop-blur-md shadow-sm"
                >
                  <Linkedin size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="https://github.com/premdeshmane-01"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#3B0717] transition-all duration-300 group bg-white/5 backdrop-blur-md shadow-sm"
                >
                  <Github size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="mailto:premdeshmane01@gmail.com"
                  aria-label="Email"
                  className="p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#3B0717] transition-all duration-300 group bg-white/5 backdrop-blur-md shadow-sm"
                >
                  <Mail size={18} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="flex flex-col md:flex-row justify-between items-end w-full relative z-10 pt-4 border-t border-white/10">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Local Time</span>
              <p className="text-xs font-medium text-white flex items-center gap-2">Nashik, India <span className="text-white/40">|</span> {time}</p>
            </div>

            <div className="text-right mt-4 md:mt-0">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Designed & Built by</p>
              <p className="text-xs font-bold text-white mt-1">Premsagar Deshmane © 2025</p>
            </div>
          </div>

          {/* Watermark (decorative & non-blocking) */}
          <h1
            className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-[30%] text-[15vw] font-black text-white/5 select-none pointer-events-none z-0"
            aria-hidden
          >
            PREMSAGAR
          </h1>
        </div>
      </footer>
    </>
  );
}
