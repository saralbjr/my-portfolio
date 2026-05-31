"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";

type NavLink =
  | { label: string; href: string }
  | { label: string; children: Array<{ label: string; href: string }> };

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  {
    label: "Resume",
    children: [
      { label: "Skills", href: "#skills" },
      { label: "Education", href: "#education" },
      { label: "Certifications", href: "#certifications" },
    ],
  },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let current = activeSection;

      const checkActive = (href: string) => {
        const el = href.startsWith("#")
          ? (document.querySelector(href) as HTMLElement | null)
          : null;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          return scrollPosition >= top && scrollPosition < top + height;
        }
        return false;
      };

      for (const link of navLinks) {
        if ("children" in link && link.children) {
          for (const child of link.children) {
            if (checkActive(child.href)) {
              current = child.href.substring(1);
            }
          }
        } else if ("href" in link && link.href) {
          if (checkActive(link.href)) {
            current = link.href.substring(1);
          }
        }
      }

      // Specific check for reaching bottom of page to select the last item
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        current = "contact";
      }

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    setActiveDropdown(null);

    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed z-50 left-0 right-0 transition-all duration-300 px-4 md:px-8 ${
        isScrolled ? "top-3 md:top-4" : "top-0"
      }`}
    >
      <div
        className={`mx-auto h-16 flex items-center justify-between transition-all duration-300 max-w-[var(--max-width)] ${
          isScrolled
            ? "glass-card px-6 rounded-full shadow-lg shadow-black/25 border border-card-border/85"
            : "px-6 border-b border-transparent"
        }`}
      >
        {/* Logo - Left */}
        <div className="flex-1 flex justify-start">
          <a
            href="#home"
            className="text-lg font-extrabold tracking-tight hover:opacity-80 transition-opacity flex items-center"
            onClick={(e) => handleClick(e, "#home")}
          >
            <span className="gradient-text">saralbjr</span>
          </a>
        </div>

        {/* Desktop Links - Perfectly Centered & Spacious */}
        <ul className="hidden md:flex items-center justify-center gap-1.5 lg:gap-3 bg-white/[0.04] dark:bg-white/[0.02] border border-card-border/40 py-1.5 px-3 rounded-full shadow-inner">
          {navLinks.map((link) => {
            if ("children" in link && link.children) {
              const isChildActive = link.children.some(
                (child) => activeSection === child.href.substring(1)
              );

              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1 cursor-pointer outline-none ${
                      isChildActive
                        ? "text-accent bg-accent/5 font-bold"
                        : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 glass-card p-2 rounded-2xl shadow-xl shadow-black/40 border border-card-border/80 z-50"
                      >
                        <ul className="flex flex-col gap-1">
                          {link.children.map((child) => {
                            const isChildSectionActive =
                              activeSection === child.href.substring(1);
                            return (
                              <li key={child.href}>
                                <a
                                  href={child.href}
                                  onClick={(e) => handleClick(e, child.href)}
                                  className={`block px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-150 ${
                                    isChildSectionActive
                                      ? "text-accent bg-accent/10 font-bold"
                                      : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                                  }`}
                                >
                                  {child.label}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            if ("href" in link && link.href) {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all duration-200 block ${
                      isActive
                        ? "text-accent bg-accent/5 font-bold"
                        : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            }

            return null;
          })}
        </ul>

        {/* Actions - Right */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2.5 rounded-full text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors border border-card-border/30 bg-white/[0.02]"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background-secondary/95 backdrop-blur-xl border border-card-border overflow-hidden rounded-3xl mt-2 mx-auto max-w-[var(--max-width)] shadow-xl shadow-black/30"
          >
            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => {
                if ("children" in link && link.children) {
                  const isChildActive = link.children.some(
                    (child) => activeSection === child.href.substring(1)
                  );

                  return (
                    <div key={link.label} className="flex flex-col gap-1">
                      <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground-muted/50 mt-2">
                        {link.label}
                      </div>
                      <div className="pl-3 border-l-2 border-card-border/60 flex flex-col gap-1 ml-4 my-1">
                        {link.children.map((child) => {
                          const isChildSectionActive =
                            activeSection === child.href.substring(1);
                          return (
                            <motion.li
                              key={child.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <a
                                href={child.href}
                                onClick={(e) => handleClick(e, child.href)}
                                className={`block px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                                  isChildSectionActive
                                    ? "text-accent bg-accent/10 border border-accent/20 font-bold"
                                    : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                                }`}
                              >
                                {child.label}
                              </a>
                            </motion.li>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                if ("href" in link && link.href) {
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
                        onClick={(e) => handleClick(e, link.href)}
                        className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                          isActive
                            ? "text-accent bg-accent/10 border border-accent/25 font-bold"
                            : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  );
                }

                return null;
              })}
              <li className="pt-3 border-t border-card-border mt-3 flex justify-center">
                <ThemeToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

