import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: <Github size={18} />, href: "https://github.com/saral", label: "GitHub" },
  { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/saral", label: "LinkedIn" },
  { icon: <Mail size={18} />, href: "mailto:saral@example.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-background-secondary/50">
      <div className="max-w-[var(--max-width)] mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-foreground-muted flex items-center gap-1">
            © {new Date().getFullYear()} Saral Bajracharya. Made with{" "}
            <Heart size={14} className="text-red-400 fill-red-400" /> and Next.js
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground-muted bg-white/5 hover:bg-accent/10 hover:text-accent border border-card-border hover:border-accent/30 transition-all duration-200"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
