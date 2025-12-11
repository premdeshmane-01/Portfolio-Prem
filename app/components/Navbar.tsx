"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState, type MouseEvent } from "react";

/**
 * Responsive Navbar (updated)
 * - Small screens: pill aligns to the right and shows ONLY the hamburger icon (no "PREM" text)
 * - Large screens: full centered pill with links & resume CTA (unchanged)
 * - Hamburger retains slide-over functionality and accessibility features
 */

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isSmall, setIsSmall] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  const navOpacity = useTransform(scrollY, [0, 50], [0.95, 1]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.995]);
  const navY = useTransform(scrollY, [0, 100], [0, -1]);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        { id: "home", selector: "header, #home" },
        { id: "about", selector: "#about" },
        { id: "projects", selector: "#projects" },
      ];

      for (const s of sections) {
        const el = document.querySelector(s.selector) as HTMLElement | null;
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };

    const onResize = () => setIsSmall(window.innerWidth < 1024);
    updateScroll();
    onResize();

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const touch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(Boolean(touch));
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || isSmall) return;
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
        transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-6 z-50 flex justify-end lg:justify-center px-4 pointer-events-none"
        aria-label="Primary navigation"
      >
        <motion.div
          style={{
            opacity: navOpacity,
            scale: navScale,
            y: navY,
          }}
          onMouseMove={handleMouseMove}
          className={`pointer-events-auto relative flex items-center gap-2 transition-all duration-700 overflow-hidden
            ${isSmall ? "px-2 py-2 min-w-[auto] rounded-lg bg-white/90 border border-white/10 shadow-md" : "px-4 py-3 rounded-full bg-white/80 border border-white/40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]"}
            ${isScrolled ? "shadow-[0_8px_40px_rgba(0,0,0,0.15)] bg-white/95 border-white/70" : ""}`}
        >
          {/* Desktop centered links (visible on lg and up) */}
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
                  className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400
                    ${isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative z-10">{item.name}</span>

                  {isActive && (
                    <span aria-hidden className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 rounded-full bg-gray-900" />
                  )}
                </a>
              );
            })}

            <div className="relative w-px h-6 mx-2 overflow-hidden -z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-400/40 to-transparent" />
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 px-4 py-2 rounded-full bg-black text-white text-sm font-semibold flex items-center gap-2 hover:scale-[1.02] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
            >
              <span>Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          {/* Small screens: only hamburger (no "PREM" text, no compact resume) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              onKeyDown={(e) => toggleMenu(e)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="z-10 inline-flex items-center justify-center p-2 rounded-md bg-white/90 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <svg className="w-5 h-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

      {/* Mobile slide-over menu */}
      <motion.div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white/97 shadow-xl z-50 lg:hidden`}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="text-lg font-semibold">Menu</div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`block px-4 py-3 rounded-md text-base font-medium ${activeSection === item.id ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}

            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 mt-2 rounded-md text-base font-semibold text-white bg-black text-center"
                onClick={() => setMenuOpen(false)}
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Backdrop for mobile menu (click to close) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
