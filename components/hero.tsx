"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { CodeToArt } from "./code-to-art"

const FloatingGem = dynamic(
  () => import("./floating-gem").then((m) => m.FloatingGem),
  { ssr: false }
)


export function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center px-6 md:px-12 pt-24 pb-16 overflow-hidden bg-[#FDF8F5]">
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,113,133,0.15) 0%, rgba(248,200,220,0.08) 50%, transparent 70%)", top: "15%", right: "20%", filter: "blur(40px)" }}
          animate={{ x: [0, 40, -60, 80, -30, 50, -40, 0], y: [0, -70, 40, -50, 80, -40, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-24 h-24 md:w-40 md:h-40 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(252,231,239,0.2) 0%, rgba(251,113,133,0.1) 50%, transparent 70%)", top: "40%", left: "8%", filter: "blur(35px)" }}
          animate={{ x: [0, -50, 70, -40, 60, -80, 30, 0], y: [0, 60, -80, 50, -40, 70, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute w-28 h-28 md:w-44 md:h-44 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(248,200,220,0.18) 0%, rgba(252,231,239,0.1) 50%, transparent 70%)", bottom: "20%", right: "35%", filter: "blur(45px)" }}
          animate={{ x: [0, 80, -50, 60, -70, 40, -60, 0], y: [0, -40, 70, -60, 40, -80, 50, 0] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-serif italic text-5xl md:text-7xl lg:text-8xl font-bold text-[#2D2A26] tracking-tight whitespace-nowrap"
              >
                <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                  Vitoria
                </motion.span>{" "}
                <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="relative">
                  Fonseca
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 rounded-full"
                    style={{ background: "linear-gradient(90deg, rgba(251,113,133,0.6), rgba(252,231,239,0.4))" }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  />
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-serif text-3xl md:text-5xl lg:text-5xl italic text-[#9A928A] tracking-tight"
              >
                building things that didn't exist before.
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-lg font-sans text-lg text-[#9A928A] leading-relaxed"
            >
              Self-taught Computer Engineering student at IPLeiria. I build products from scratch — from idea to deployment. Obsessive about the details.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              <motion.a
                href="#work"
                className="group relative inline-flex items-center gap-2 font-mono text-sm text-[#2D2A26] pb-1 overflow-hidden"
                whileHover={{ x: 4 }}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById("work")
                  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" })
                }}
              >
                <span className="relative z-10">View Work</span>
                <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10">↗</span>
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-[#2D2A26]"
                  initial={{ width: "100%" }}
                  whileHover={{ width: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="#about"
                className="font-mono text-sm text-[#9A928A] hover:text-[#2D2A26] transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById("about")
                  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" })
                }}
              >
                More about me
              </motion.a>
            </motion.div>

            {/* Code to Art animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <CodeToArt />
            </motion.div>

          </motion.div>

          {/* Right – 3D Object */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: "600px" }}
          >
            <FloatingGem />
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-linear-to-b from-rose-300/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
