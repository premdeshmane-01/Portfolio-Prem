"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useState } from "react";
import { Linkedin, Github, Mail } from "lucide-react";

// --- CONFIGURATION ---
// Map your sections to the menu theme they require.
const SECTION_THEMES: Record<string, "glass" | "solid"> = {
  home: "glass",
  about: "glass",
  skills: "solid",
  projects: "solid",
  contact: "solid",
};

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  // Default to 'glass' (Hero style)
  const [menuTheme, setMenuTheme] = useState<"glass" | "solid">("glass");

  const navOpacity = useTransform(scrollY, [0, 50], [1, 1]);
  const navScale = useTransform(scrollY, [0, 50], [1, 0.98]);

  /* ---------- device check ---------- */
  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------- scroll spy & theme engine ---------- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      setIsScrolled(y > 20);

      // --- FIX: Force "Home" when near the top ---
      // This prevents "About" from activating because the Hero is fixed/parallax
      if (y < vh * 0.5) {
        setActiveSection("home");
        setMenuTheme("glass");
        return;
      }

      // 1. FOOTER CHECK (Highest Priority)
      if (window.innerHeight + y >= pageHeight - 50) {
        setMenuTheme("glass");
        return;
      }

      // 2. SECTION CHECK
      // "home" is removed from here because we handled it explicitly above
      const sectionsToCheck = ["contact", "projects", "skills", "about"];
      let currentId = activeSection; // Default to current to prevent flickering

      for (const id of sectionsToCheck) {
        const el = document.getElementById(id);
        if (el) {
          if (y >= el.offsetTop - vh * 0.4) {
            currentId = id;
            break; 
          }
        }
      }

      setActiveSection(currentId);

      // 3. APPLY THEME
      const theme = SECTION_THEMES[currentId] || "glass";
      setMenuTheme(theme);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); 
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    setActiveSection(id);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      {/* ================= NAV BAR ================= */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 inset-x-0 z-50 flex justify-end lg:justify-center px-4 pointer-events-none"
      >
        <motion.div
          style={{ opacity: navOpacity, scale: navScale }}
          className={`pointer-events-auto flex items-center px-4 py-3 rounded-full
            ${
              isSmall
                ? "bg-transparent border-transparent"
                : `backdrop-blur-xl border border-white/30 ${
                    isScrolled ? "bg-white/90" : "bg-white/70"
                  }`
            }
          `}
        >
          {/* ---------- DESKTOP (Untouched) ---------- */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition
                    ${active ? "text-black" : "text-gray-600 hover:text-black"}
                  `}
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <a
              href="/resume.pdf"
              target="_blank"
              className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold"
            >
              Resume
            </a>
          </div>

          {/* ---------- MOBILE MENU BUTTON ---------- */}
          <div className="lg:hidden">
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              className={`
                flex items-center justify-center
                w-10 h-10 rounded-full
                backdrop-blur-md
                transition-all duration-500 ease-out
                active:scale-95
                ${
                  menuTheme === "solid"
                    ? "bg-black/80 border border-black/10 shadow-lg"
                    : "bg-white/5 border border-white/20 hover:bg-white/10"
                }
              `}
            >
              <img
                src="/menu-bar.svg"
                alt="Menu"
                className="w-5 h-5 transition-opacity duration-300"
                style={{ filter: "invert(1)" }}
              />
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* ================= MOBILE OVERLAY ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 h-full flex flex-col items-center justify-center gap-10 text-white"
            >
              {/* nav links */}
              <nav className="flex flex-col items-center gap-6">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleNav(item.id)}
                    className="text-3xl font-semibold tracking-tight"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>

              {/* socials */}
              <div className="flex gap-6 mt-6">
                {[
                  { icon: Linkedin, href: "https://linkedin.com/in/prem-deshmane01" },
                  { icon: Github, href: "https://github.com/premdeshmane-01" },
                  { icon: Mail, href: "mailto:premdeshmane01@gmail.com" },
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-3 rounded-full bg-white/10 border border-white/20"
                  >
                    <s.icon size={22} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}