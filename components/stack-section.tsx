"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const categories = [
  {
    label: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    tools: ["PostgreSQL", "Supabase", "Prisma", "Node.js"],
  },
  {
    label: "Tooling",
    tools: ["Figma", "Git", "Vercel", "VS Code"],
  },
]

const interests = [
  "rust & systems",
  "ethical hacking",
  "distributed systems",
  "product design",
  "open-source",
]

function TerminalCycler({ items }: { items: string[] }) {
  const [mounted, setMounted] = useState(false)
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const current = items[index]
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1))
        } else {
          setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1))
        } else {
          setDeleting(false)
          setIndex((prev) => (prev + 1) % items.length)
        }
      }
    }, deleting ? 25 : 70)
    return () => clearTimeout(timeout)
  }, [mounted, text, deleting, index, items])

  return (
    <div className="flex items-center gap-2 font-mono text-sm text-[#FDF8F5]/80">
      <span className="text-rose-400/70">{">"}</span>
      <span>{text}</span>
      <motion.span
        className="inline-block w-1.5 h-4 bg-rose-300/80 ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </div>
  )
}

export function StackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-60px" })
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  return (
    <section className="bg-[#FDF8F5] border-t border-[rgba(45,42,38,0.08)] px-6 md:px-12 py-16" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header — staggered */}
        <div className="mb-12">
          <motion.span
            className="font-mono text-xs text-[#9A928A] uppercase tracking-widest"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.45 }}
          >
            Skills & Focus
          </motion.span>
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold text-[#2D2A26] mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            What I work with.
          </motion.h2>
          <motion.div
            className="h-1 bg-linear-to-r from-rose-300/60 to-pink-200/40 mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
          />
        </div>

        {/* Category rows */}
        <div className="divide-y divide-[rgba(45,42,38,0.07)]">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              className="relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-6 cursor-default transition-colors duration-200"
              style={{ background: hoveredRow === ci ? "rgba(251,113,133,0.03)" : "transparent" }}
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.5, delay: 0.28 + ci * 0.12, ease: "easeOut" }}
              onHoverStart={() => setHoveredRow(ci)}
              onHoverEnd={() => setHoveredRow(null)}
            >
              <span className="font-mono text-[10px] text-[#9A928A] uppercase tracking-widest w-20 shrink-0">
                {cat.label}
              </span>

              <motion.span
                className="hidden sm:block w-px h-5 shrink-0"
                style={{ background: hoveredRow === ci ? "rgba(251,113,133,0.8)" : "rgba(251,113,133,0.4)" }}
                transition={{ duration: 0.2 }}
              />

              <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 flex-1">
                {cat.tools.map((tool, ti) => (
                  <span key={tool} className="flex items-baseline gap-1">
                    <motion.span
                      className="font-sans text-base sm:text-lg md:text-xl text-[#2D2A26]"
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: hoveredRow === ci ? 1 : 0.75, y: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, delay: 0.35 + ci * 0.1 + ti * 0.06 }}
                    >
                      {tool}
                    </motion.span>
                    {ti < cat.tools.length - 1 && (
                      <span className="font-mono text-[10px] text-rose-300/60 pb-0.5">·</span>
                    )}
                  </span>
                ))}
              </div>

              <motion.span
                className="hidden sm:block font-mono text-xs text-[#9A928A]/30 shrink-0 tabular-nums"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + ci * 0.12 }}
              >
                {String(cat.tools.length).padStart(2, "0")}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Currently into */}
        <motion.div
          className="pt-8 mt-2 border-t border-[rgba(45,42,38,0.08)]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-rose-300 inline-block"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] text-[#9A928A] uppercase tracking-widest">Currently into</span>
          </div>
          <div className="relative bg-[#2D2A26] rounded-xl px-5 py-3 flex items-center gap-3 w-full max-w-lg shadow-lg overflow-hidden">
            {/* Colored traffic-light dots — same as CodeToArt */}
            <div className="flex gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-rose-300/50" />
              <span className="w-2 h-2 rounded-full bg-pink-200/50" />
              <span className="w-2 h-2 rounded-full bg-[#9A928A]/30" />
            </div>
            <TerminalCycler items={interests} />
            {/* Sparkle decoration */}
            <motion.span
              className="absolute top-2 right-3 text-rose-300/30 text-xs"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦
            </motion.span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
