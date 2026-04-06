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
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
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
  }, [text, deleting, index, items])

  return (
    <div className="flex items-center gap-2 font-mono text-sm text-[#2D2A26]/80">
      <span className="text-rose-400/70">{">"}</span>
      <span>{text}</span>
      <motion.span
        className="inline-block w-0.5 h-4 bg-rose-300 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </div>
  )
}

export function StackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  return (
    <section className="bg-[#FDF8F5] border-t border-[rgba(45,42,38,0.08)] px-6 md:px-12 py-16" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-[#9A928A] uppercase tracking-widest">Skills & Focus</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2D2A26] mt-3">What I work with.</h2>
          <div className="h-1 w-20 bg-linear-to-r from-rose-300/60 to-pink-200/40 mt-4 rounded-full" />
        </motion.div>

        {/* Category rows */}
        <div className="divide-y divide-[rgba(45,42,38,0.07)]">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              className="relative flex items-center gap-6 py-6 cursor-default transition-colors duration-200"
              style={{ background: hoveredRow === ci ? "rgba(251,113,133,0.03)" : "transparent" }}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + ci * 0.1 }}
              onHoverStart={() => setHoveredRow(ci)}
              onHoverEnd={() => setHoveredRow(null)}
            >
              {/* Label */}
              <span className="font-mono text-[10px] text-[#9A928A] uppercase tracking-widest w-20 shrink-0">
                {cat.label}
              </span>

              {/* Rose pipe */}
              <motion.span
                className="w-px h-5 shrink-0"
                style={{ background: hoveredRow === ci ? "rgba(251,113,133,0.8)" : "rgba(251,113,133,0.4)" }}
                transition={{ duration: 0.2 }}
              />

              {/* Tools with dot separators */}
              <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 flex-1">
                {cat.tools.map((tool, ti) => (
                  <span key={tool} className="flex items-baseline gap-1">
                    <motion.span
                      className="font-serif text-xl md:text-2xl text-[#2D2A26]"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: hoveredRow === ci ? 1 : 0.7 } : { opacity: 0 }}
                      transition={{ duration: 0.2, delay: isInView ? 0.25 + ci * 0.1 + ti * 0.05 : 0 }}
                    >
                      {tool}
                    </motion.span>
                    {ti < cat.tools.length - 1 && (
                      <span className="font-mono text-[10px] text-rose-300/60 pb-0.5">·</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Count — right aligned */}
              <span className="font-mono text-xs text-[#9A928A]/30 shrink-0 tabular-nums">
                {String(cat.tools.length).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Currently into — terminal style */}
        <motion.div
          className="pt-8 mt-2 border-t border-[rgba(45,42,38,0.08)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-rose-300 inline-block"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] text-[#9A928A] uppercase tracking-widest">Currently into</span>
          </div>
          <div className="bg-[#2D2A26] rounded-xl px-5 py-4 inline-flex items-center gap-3 min-w-[320px]">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.15)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.15)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.15)]" />
            </div>
            {isInView && <TerminalCycler items={interests} />}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
