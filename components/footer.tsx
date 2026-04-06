"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <>
      {/* CTA — dark */}
      <section className="px-6 md:px-12 bg-[#2D2A26] relative overflow-hidden min-h-[500px] md:h-[600px]">
        <div className="absolute pointer-events-none rounded-full" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(251,113,133,0.10) 0%, transparent 70%)", top: "-10%", right: "5%", filter: "blur(80px)" }} />

        {/* Photo — right half, desktop only */}
        <motion.div
          className="hidden lg:block absolute inset-0 left-1/2"
          style={{ zIndex: 1 }}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* pulsing glow behind the figure */}
          <motion.div
            className="absolute"
            style={{ bottom: "5%", left: "50%", translateX: "-50%", width: 340, height: 120, background: "radial-gradient(ellipse, rgba(251,113,133,0.18) 0%, transparent 70%)", filter: "blur(24px)", borderRadius: "50%" }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
          />

          <motion.div
            className="relative w-full h-full"
            style={{ top: "-30px", right: "40px" }}
            animate={{ scale: [1, 1.025, 1], rotate: [0, 0.6, 0, -0.6, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              src="/me.png"
              alt="Vitória Fonseca"
              fill
              className="object-contain object-center"
              style={{
                maskImage: "linear-gradient(to left, rgba(0,0,0,0.95) 35%, transparent 100%)",
                filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.55)) drop-shadow(0 8px 20px rgba(251,113,133,0.12))",
              }}
            />
          </motion.div>
        </motion.div>

        <div className="max-w-6xl mx-auto relative h-full flex items-center" style={{ zIndex: 2 }}>
          <div className="py-16 w-full lg:w-1/2">
            <motion.span
              className="block font-mono text-xs text-rose-300/60 uppercase tracking-widest"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              Contact
            </motion.span>

            <motion.h2
              className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-[#FDF8F5] mt-4 leading-tight"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              Let&apos;s build<br />
              <em className="not-italic text-rose-300/90">something.</em>
            </motion.h2>

            <motion.div
              className="h-1 w-24 bg-linear-to-r from-rose-300/60 to-pink-200/30 mt-6 rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
            />

            <motion.p
              className="font-sans text-[#9A928A] mt-6 max-w-sm leading-relaxed text-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              Open to internships, freelance, and interesting collabs.
              If you have an idea, I want to hear it.
            </motion.p>

            <motion.a
              href="mailto:hello@vitoriafonseca.dev"
              className="inline-flex items-center gap-3 mt-8 font-mono text-sm text-[#FDF8F5]/80 border border-[rgba(253,248,245,0.15)] px-6 py-3 rounded-full hover:border-rose-300/60 hover:text-rose-300 transition-colors duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: false, amount: 0.5 }}
              whileHover={{ x: 4 }}
            >
              hello@vitoriafonseca.dev
              <span className="text-rose-300/60">↗</span>
            </motion.a>

            <motion.div
              className="flex items-center gap-6 mt-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              {[
                { label: "GitHub", href: "https://github.com/vitorianfonseca" },
                { label: "LinkedIn", href: "https://linkedin.com/in/vitoriafonseca" },
              ].map(link => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#9A928A] hover:text-rose-300 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.label} ↗
                </motion.a>
              ))}
              <span className="font-mono text-xs text-[#9A928A]/40">Leiria, PT · WET (UTC+0)</span>
            </motion.div>
          </div>
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
