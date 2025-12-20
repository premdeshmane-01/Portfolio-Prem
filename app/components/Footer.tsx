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
    <section id="contact" className="w-full relative z-10">
      <footer className="w-full bg-gradient-to-br from-[#2a0510] to-[#0f0205] text-white border-t border-white/10">
        
        {/* Main Content Container */}
        <div className="w-full px-6 md:px-12 lg:px-24 py-10 lg:py-12 relative overflow-hidden">
          
          {/* Subtle Background Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              background:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* GRID LAYOUT: 1 Col Mobile, 3 Cols Desktop */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
            
            {/* COLUMN 1: Brand & Status */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold tracking-tighter">PREMSAGAR</h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Building digital experiences with precision and passion. Always open to discussing new ideas and opportunities.
              </p>
              
              {/* Status Badge */}
              <div className="flex items-center gap-2 mt-2 w-fit px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Open to Work</span>
              </div>
            </div>

            {/* COLUMN 2: Navigation (Compact List) */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Navigation</h3>
              <nav className="flex flex-col gap-2">
                {["Home", "About", "Projects", "Contact", "Resume"].map((item, idx) => (
                  <a
                    key={idx}
                    href={item === "Resume" ? "/resume.pdf" : `#${item.toLowerCase()}`}
                    onClick={(e) => {
                        if (item === "Home") handleNavClick(e, "home");
                    }}
                    className="text-white/80 hover:text-[#00C853] transition-colors w-fit text-sm font-medium"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* COLUMN 3: Contact & Socials */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Get in touch</h3>
              
              <div className="flex flex-col gap-1">
                <a
                  href="mailto:premdeshmane01@gmail.com"
                  className="text-lg font-medium text-white hover:text-[#00C853] transition-colors break-all"
                >
                  premdeshmane01@gmail.com
                </a>
                <p className="text-xs text-white/50">Nashik, India • {time}</p>
              </div>

              {/* Social Icons (Compact) */}
              <div className="flex gap-3 mt-2">
                {[
                  { icon: Linkedin, href: "https://linkedin.com/in/prem-deshmane01" },
                  { icon: Github, href: "https://github.com/premdeshmane-01" },
                  { icon: Mail, href: "mailto:premdeshmane01@gmail.com" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white hover:text-[#3B0717] transition-all"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10 my-8 relative z-10"></div>

          {/* Bottom Bar: Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 text-xs text-white/40">
            <p>© 2025 Premsagar Deshmane. All rights reserved.</p>
            <p>Designed & Built with Next.js</p>
          </div>

          {/* Watermark (Very Subtle & Small now) */}
          <h1
            className="absolute bottom-0 right-0 translate-y-[20%] translate-x-[10%] text-[8rem] font-black text-white/[0.02] select-none pointer-events-none z-0 tracking-tighter leading-none"
            aria-hidden
          >
            PREMSAGAR
          </h1>

        </div>
      </footer>
    </section>
  );
}