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
    const id = setInterval(updateTime, 60_000);
    return () => clearInterval(id);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (id === "home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="relative z-10">
      <footer className="relative w-full text-white border-t border-white/10 overflow-hidden">

        {/* DESKTOP BACKGROUND */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-[#3b0a18] via-[#24070f] to-[#160409]" />

        {/* MOBILE BACKGROUND */}
        <div className="md:hidden absolute inset-0 bg-[#070707]" />

        {/* WATERMARK */}
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <span
            className="
              mt-[55%] md:mt-[65%]
              text-[22vw] md:text-[12vw]
              font-black tracking-tight
              text-white/[0.04]
              blur-[2px]
              select-none
              whitespace-nowrap
            "
            aria-hidden
          >
            EXPERIENCES
          </span>
        </div>

        {/* CONTENT */}
        <div className="relative px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-14">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 text-center md:text-left">

            {/* BRAND */}
            <div className="space-y-5 flex flex-col items-center md:items-start">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                PREMSAGAR <span className="text-white/40">DESHMANE</span>
              </h2>

              <p className="text-white/70 text-sm sm:text-base max-w-sm">
                Designing and engineering systems where clarity, performance,
                and intent come together.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-[11px] uppercase tracking-widest text-white/80 font-semibold">
                  Open to Work
                </span>
              </div>
            </div>

            {/* NAVIGATION */}
            <div className="flex flex-col gap-4 items-center md:items-start">
              <h3 className="text-xs uppercase tracking-[0.25em] text-white/40">
                Navigation
              </h3>

              {/* Mobile: 3x2 grid | Desktop: column */}
              <nav className="grid grid-cols-3 gap-x-6 gap-y-3 md:flex md:flex-col md:gap-3">
                {["Home", "About", "Projects", "Contact", "Resume"].map((item) => (
                  <a
                    key={item}
                    href={item === "Resume" ? "/resume.pdf" : `#${item.toLowerCase()}`}
                    onClick={(e) => item === "Home" && handleNavClick(e, "home")}
                    className="text-white/75 hover:text-white transition text-sm font-medium text-center md:text-left"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col gap-5 items-center md:items-start">
              <h3 className="text-xs uppercase tracking-[0.25em] text-white/40">
                Get in touch
              </h3>

              <div className="space-y-1">
                <a
                  href="mailto:premdeshmane01@gmail.com"
                  className="text-lg font-medium hover:text-white/80 transition"
                >
                  premdeshmane01@gmail.com
                </a>
                <p className="text-xs text-white/40">
                  Nashik, India • {time}
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                {[
                  { icon: Linkedin, href: "https://linkedin.com/in/prem-deshmane01" },
                  { icon: Github, href: "https://github.com/premdeshmane-01" },
                  { icon: Mail, href: "mailto:premdeshmane01@gmail.com" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur hover:bg-white hover:text-black transition"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/10 my-10" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <span>© 2025 Premsagar Deshmane</span>
            <span>Designed & built with intent</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
