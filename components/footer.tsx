"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <>
      {/* CTA — dark */}
      <section className="px-6 md:px-12 py-24 bg-[#2D2A26] relative overflow-hidden">
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(251,113,133,0.08) 0%, transparent 70%)",
            top: "-20%", right: "5%",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs text-rose-300/60 uppercase tracking-widest">
              Contact
            </span>

            <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#FDF8F5] mt-4 leading-tight">
              Let&apos;s build<br />
              <em className="not-italic text-rose-300/90">something.</em>
            </h2>

            <div className="h-1 w-24 bg-linear-to-r from-rose-300/60 to-pink-200/30 mt-6 rounded-full" />

            <p className="font-sans text-[#9A928A] mt-8 max-w-sm leading-relaxed text-sm">
              Open to internships, freelance, and interesting collabs.
              If you have an idea, I want to hear it.
            </p>

            <motion.a
              href="mailto:hello@vitoriafonseca.dev"
              className="inline-flex items-center gap-3 mt-10 font-mono text-sm text-[#FDF8F5]/80 border border-[rgba(253,248,245,0.15)] px-6 py-3 rounded-full hover:border-rose-300/60 hover:text-rose-300 transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              hello@vitoriafonseca.dev
              <span className="text-rose-300/60">↗</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer bar — light, separate */}
      <footer className="bg-[#FDF8F5] border-t border-[rgba(45,42,38,0.08)] px-6 md:px-12 py-8">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm font-bold text-[#2D2A26]">vitória.fonseca</span>
            <span className="text-[rgba(45,42,38,0.2)]">·</span>
            <span className="font-mono text-xs text-[#9A928A]">Leiria, PT</span>
          </div>

          <div className="flex items-center gap-8">
            {[
              { label: "GitHub", href: "https://github.com/vitorianfonseca" },
              { label: "LinkedIn", href: "https://linkedin.com/in/vitoriafonseca" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#9A928A] hover:text-[#2D2A26] transition-colors"
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <p className="font-mono text-[10px] text-[#C4BEB8]">
            © {new Date().getFullYear()} — Built with obsessive attention to detail.
          </p>
        </motion.div>
      </footer>
    </>
  )
}
