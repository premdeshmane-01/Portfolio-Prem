"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, type MouseEvent } from "react";

// 1. Defined nav items (Contact is included here)
const navItems = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  // Framer Motion: adjusted ranges so nav is fully visible at top (opacity 1)
  const navOpacity = useTransform(scrollY, [0, 50], [1, 1]); 
  const navScale = useTransform(scrollY, [0, 50], [1, 0.98]); 
  const navY = useTransform(scrollY, [0, 50], [0, -2]);

  // Device Check
  useEffect(() => {
    const checkDevice = () => {
      setIsSmall(window.innerWidth < 1024);
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 20);

      // A. Force "Home" active if near top
      if (currentScroll < 100) {
        setActiveSection("home");
        return;
      }

      // B. Force "Contact" active if at bottom of page
      // This fixes the issue where short contact sections don't trigger
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
        setActiveSection("contact");
        return;
      }

      // C. Standard Section Checks
      const sectionIds = ["contact", "projects", "about"]; 
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const offsetTop = el.offsetTop;
          if (currentScroll + 150 >= offsetTop) {
            setActiveSection(id);
            return; 
          }
        }
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll(); 
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); 
    setActiveSection(id);
    setMenuOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Navbar buffer
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  const toggleMenu = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (!e) return setMenuOpen((v) => !v);
    if ("key" in (e as any)) {
      const ke = e as React.KeyboardEvent;
      if (ke.key === "Enter" || ke.key === " ") {
        ke.preventDefault();
        setMenuOpen((v) => !v);
      }
    } else {
      setMenuOpen((v) => !v);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-6 z-50 flex justify-end lg:justify-center px-4 pointer-events-none"
        aria-label="Primary navigation"
      >
        <motion.div
          style={{ opacity: navOpacity, scale: navScale, y: navY }}
          className={`pointer-events-auto relative flex items-center gap-2 transition-all duration-500 overflow-hidden
            ${
              isSmall
                ? "px-2 py-2 min-w-[auto] rounded-lg bg-white/90 border border-white/10 shadow-md"
                : "px-4 py-3 rounded-full bg-white/80 border border-white/40 backdrop-blur-md shadow-sm"
            }
            ${isScrolled ? "shadow-md bg-white/95 border-white/60" : ""}
          `}
        >
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {!isSmall && !isTouch && (
               <div className="absolute inset-0 rounded-full opacity-40 pointer-events-none -z-10">
               <motion.div
                 className="absolute inset-0 rounded-full"
                 animate={{
                   background: [
                     "radial-gradient(circle at 20% 50%, rgba(219, 234, 254, 0.35) 0%, transparent 40%)",
                     "radial-gradient(circle at 80% 50%, rgba(243, 232, 255, 0.35) 0%, transparent 40%)",
                     "radial-gradient(circle at 50% 80%, rgba(252, 231, 243, 0.35) 0%, transparent 40%)",
                   ],
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               />
             </div>
            )}

            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                    ${isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-gray-100 -z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            <div className="relative w-px h-6 mx-2 bg-gray-300" />

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 px-4 py-2 rounded-full bg-black text-white text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              onKeyDown={(e) => toggleMenu(e)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="z-10 inline-flex items-center justify-center p-2 rounded-md bg-white/50 hover:bg-white focus:outline-none"
            >
              <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl z-50 lg:hidden p-4"
            >
               <div className="flex justify-between items-center mb-6">
                 <span className="font-bold text-lg">Menu</span>
                 <button onClick={() => setMenuOpen(false)}>
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>
               
               <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg font-medium transition-colors
                        ${activeSection === item.id ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    className="block px-4 py-3 mt-4 text-center rounded-lg bg-black text-white font-semibold"
                  >
                    Resume
                  </a>
                </li>
               </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}