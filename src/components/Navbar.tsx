"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let current = activeSection;
      for (const link of navLinks) {
        const el = document.querySelector(link.href) as HTMLElement | null;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            current = link.href.substring(1);
          }
        }
      }

      // Specific check for reaching bottom of page to select the last item
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        current = navLinks[navLinks.length - 1].href.substring(1);
      }

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background-secondary/80 backdrop-blur-xl border-b border-card-border shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
      style={{ height: "var(--nav-height)" }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
        >
          <span className="gradient-text">saralbjr</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                    setActiveSection(link.href.substring(1));
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 block ${
                    isActive
                      ? "text-accent"
                      : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>

                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-t-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
          <li className="ml-2 pl-2 border-l border-card-border">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-foreground-muted hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background-secondary/95 backdrop-blur-xl border-b border-card-border overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(link.href);
                        setActiveSection(link.href.substring(1));
                      }}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? "text-accent bg-accent/10 border border-accent/20"
                          : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
              <li className="pt-3 border-t border-card-border mt-2 flex justify-center">
                <ThemeToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
