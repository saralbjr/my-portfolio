"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    quote: "Saral completely turned our search engine traffic around. Our B2B SaaS platform gained a 140% increase in organic signups in under 6 months. His technical audit resolved critical indexing barriers we were struggling with for years.",
    name: "Liam Vance",
    role: "Founder & CEO",
    company: "SaaSify Metrics",
    rating: 5,
  },
  {
    quote: "Our Shopify store's revenue spiked by 120% after Saral restructured our collection pages and injected custom JSON-LD schema markups. The rich snippets star ratings alone increased our click-through-rates dramatically.",
    name: "Sophia Martinez",
    role: "Head of Growth",
    company: "TrendLine Apparel",
    rating: 5,
  },
  {
    quote: "Local search was a complete black hole for our multi-location clinics. Saral synced our profiles, restructured our localized FAQ pages, and automated review acquisition. Our phone calls from Google Maps rose by 95%!",
    name: "Daniel Carter",
    role: "Director of Marketing",
    company: "Apex Health Group",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative">
      <div className="section-inner">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            Client <span className="gradient-text">Feedback</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            What founders and marketing directors say about the impact on their search rankings, organic growth, and digital revenue.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card p-6 flex flex-col justify-between hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 relative group"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-6 text-accent/5 group-hover:text-accent/15 transition-colors duration-500">
                <Quote size={48} />
              </div>

              <div>
                {/* Stars Rating */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-foreground-muted text-[13px] leading-relaxed italic mb-6 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-accent/5 flex items-center gap-3">
                {/* Decorative Initial Circle */}
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-sm uppercase">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground leading-none mb-1">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-foreground-muted">
                    {t.role}, <span className="font-semibold text-accent/80">{t.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
