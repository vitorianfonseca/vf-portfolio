"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"

const AboutObject = dynamic(
  () => import("./about-object").then((m) => m.AboutObject),
  { ssr: false }
)


// Typing animation component
function TypingText({ texts, className, initialText }: { texts: string[]; className?: string; initialText?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState(initialText ?? "")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[currentIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 30 : 80)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, texts])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-5 bg-rose-300 ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </span>
  )
}

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [mounted, setMounted] = useState(false)
  const [canRender3D, setCanRender3D] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (mounted && isInView) {
      const t = setTimeout(() => setCanRender3D(true), 100)
      return () => clearTimeout(t)
    }
  }, [mounted, isInView])

  return (
    <section className="py-24 px-6 md:px-12 bg-[#2D2A26] relative overflow-hidden">
      {/* Static blobs — no JS animation */}
      <div className="absolute w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(251,113,133,0.1) 0%, transparent 70%)", top: "10%", right: "15%", filter: "blur(40px)" }} />
      <div className="absolute w-32 h-32 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(252,231,239,0.08) 0%, transparent 70%)", bottom: "20%", left: "10%", filter: "blur(30px)" }} />

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.span 
                className="font-mono text-xs text-rose-300/80 uppercase tracking-widest inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                About
              </motion.span>
              <motion.h2 
                className="font-serif text-4xl md:text-5xl font-bold text-[#FDF8F5] mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                The obsessive one.
              </motion.h2>
              <motion.div
                className="h-1 w-16 bg-linear-to-r from-rose-300/60 to-pink-200/40 mt-4 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: 64 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>

            {/* Creative typing element */}
            <motion.div
              className="bg-[rgba(253,248,245,0.03)] rounded-xl p-4 border border-[rgba(253,248,245,0.06)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-rose-300/50" />
                <span className="font-mono text-[10px] text-[#9A928A]/60 uppercase tracking-wider">Currently</span>
              </div>
              <div className="font-mono text-sm text-[#FDF8F5]/80">
                <span className="text-rose-300/60">{">"}</span>{" "}
                <TypingText
                  texts={[
                    "building beautiful interfaces",
                    "learning new technologies",
                    "obsessing over details",
                    "creating with passion",
                  ]}
                  initialText="building beautiful interfaces"
                />
              </div>
            </motion.div>

            <motion.div 
              className="space-y-6 text-[#C4BEB8] leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.p
                className="font-sans"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                In 2020 an injury ended my gymnastics career. Instead of losing the competitive edge that always defined me, I bought my first PC — and quickly realized the real challenge was in creating, not consuming. I started exploring tech and never stopped.
              </motion.p>

              <motion.p
                className="font-sans"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Almost everything I know I taught myself — university gives the foundation, but curiosity does the driving. I love building things that didn't exist before, understanding how everything works under the hood, and pushing my brain in new directions. That's what gymnastics gave me, just with code now.
              </motion.p>

              <motion.p
                className="font-sans"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                I want to build my own products — not work for a company forever. I'm learning everything I can: from frontend to backend, with a growing interest in cybersecurity and ethical hacking. Right now I'm building{" "}
                <motion.span
                  className="text-rose-300 font-medium cursor-pointer"
                  whileHover={{ textShadow: "0 0 8px rgba(251,113,133,0.5)" }}
                >
                  Unidesk
                </motion.span>{" "}and{" "}
                <motion.span
                  className="text-pink-200 font-medium cursor-pointer"
                  whileHover={{ textShadow: "0 0 8px rgba(252,231,239,0.5)" }}
                >
                  DSTools
                </motion.span>. Two very different projects. The same obsession with doing it right.
              </motion.p>
            </motion.div>

          </motion.div>

          {/* Right Column - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col mt-8 min-h-full"
          >
            {/* Circuit sphere */}
            <motion.div
              className="relative mb-2 hidden lg:block -mt-16"
              style={{ height: "420px" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {canRender3D && <AboutObject />}
            </motion.div>

            {/* Status card */}
            <motion.div
              className="rounded-xl p-4 mx-1"
              style={{ background: "rgba(253,248,245,0.03)", border: "1px solid rgba(253,248,245,0.06)" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                <span className="font-mono text-[10px] text-[#9A928A]/60 uppercase tracking-wider">Status</span>
              </div>
              <div className="font-mono text-sm text-[#FDF8F5]/80">
                <span className="text-rose-300/60">{">"}</span>{" "}
                <TypingText texts={["open to internships", "available for freelance", "looking for collabs", "based in Leiria, PT"]} />
              </div>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 pt-6 border-t border-[rgba(253,248,245,0.1)] relative"
            >
              <motion.span
                className="absolute -top-4 left-0 text-5xl text-rose-300/15 font-serif"
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {'"'}
              </motion.span>
              <p className="font-serif text-xl italic text-[#FDF8F5]/80 pl-6">
                The details are not the details. They make the design.
              </p>
              <cite className="font-mono text-xs text-rose-300/60 mt-4 block pl-6 not-italic">
                — Charles Eames
              </cite>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
