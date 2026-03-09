"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export default function Contact() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <section id="contact" className="relative">
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            Let&apos;s build something amazing together. Feel free to reach out for collaborations,
            opportunities, or just a chat.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <motion.form
            action={formAction}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 md:p-8 space-y-5"
          >
            {/* Honeypot — hidden from humans, catches bots */}
            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
              <label htmlFor="honeypot">Do not fill this</label>
              <input id="honeypot" name="honeypot" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground-muted mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-card-border text-foreground placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                placeholder="Your name"
              />
              {state.errors?.name && (
                <p className="text-red-400 text-xs mt-1">{state.errors.name[0]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground-muted mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-card-border text-foreground placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                placeholder="your@email.com"
              />
              {state.errors?.email && (
                <p className="text-red-400 text-xs mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground-muted mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-card-border text-foreground placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
              {state.errors?.message && (
                <p className="text-red-400 text-xs mt-1">{state.errors.message[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>

            {/* Status Messages */}
            {state.message && state.success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-400 text-sm"
              >
                <CheckCircle size={16} />
                {state.message}
              </motion.div>
            )}
            {state.message && !state.success && state.message !== "" && !state.errors && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle size={16} />
                {state.message}
              </motion.div>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center gap-6"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">Let&apos;s Connect</h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                I&apos;m currently open to new opportunities and interesting projects. Whether you
                have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:saralbjr@gmail.com"
                className="flex items-center gap-4 p-4 glass-card hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-foreground-muted text-sm">saralbjr@gmail.com</div>
                </div>
              </a>

              <a
                href="https://github.com/saralbjr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                  <Github size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium">GitHub</div>
                  <div className="text-foreground-muted text-sm">github.com/saralbjr</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/saralbjr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium">LinkedIn</div>
                  <div className="text-foreground-muted text-sm">linkedin.com/in/saralbjr</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
