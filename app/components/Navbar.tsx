"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useState } from "react";
import { Linkedin, Github, Mail } from "lucide-react";

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

  const navOpacity = useTransform(scrollY, [0, 50], [1, 1]);
  const navScale = useTransform(scrollY, [0, 50], [1, 0.98]);

  /* ---------- device ---------- */
  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------- scroll spy ---------- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);

      if (y < 100) {
        setActiveSection("home");
        return;
      }

      for (const id of ["contact", "projects", "about"]) {
        const el = document.getElementById(id);
        if (el && y + 160 >= el.offsetTop) {
          setActiveSection(id);
          return;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          {/* ---------- DESKTOP ---------- */}
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
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full
                bg-white/5 backdrop-blur-md
                border border-white/20
                hover:bg-white/10
                transition-all
                active:scale-95
              "
            >
              <img
                src="/menu-bar.svg"
                alt="Menu"
                className="w-5 h-5"
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
            {/* glass backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl" />

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
