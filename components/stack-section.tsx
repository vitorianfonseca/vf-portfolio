"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

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

export function StackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="bg-[#FDF8F5] border-t border-[rgba(45,42,38,0.08)] px-6 md:px-12 py-16" ref={ref}>
      <div className="max-w-6xl mx-auto space-y-0">

        {/* Header row */}
        <motion.div
          className="flex items-baseline justify-between mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="font-mono text-xs text-[#9A928A] uppercase tracking-widest">Skills & Focus</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2D2A26] mt-3">What I work with.</h2>
            <div className="h-1 w-20 bg-linear-to-r from-rose-300/60 to-pink-200/40 mt-4 rounded-full" />
          </div>
        </motion.div>

        {/* Category rows */}
        <div className="divide-y divide-[rgba(45,42,38,0.08)]">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              className="flex items-baseline gap-6 py-5"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + ci * 0.1 }}
            >
              {/* Label */}
              <span className="font-mono text-[10px] text-[#9A928A] uppercase tracking-widest w-20 shrink-0">
                {cat.label}
              </span>
              {/* Rose divider */}
              <span className="w-px h-4 bg-rose-300/60 shrink-0 self-center" />
              {/* Tools */}
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {cat.tools.map((tool, ti) => (
                  <motion.span
                    key={tool}
                    className="font-serif text-xl md:text-2xl text-[#2D2A26]/75 cursor-default"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.25 + ci * 0.1 + ti * 0.05 }}
                    whileHover={{ color: "#2D2A26", x: 3 }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently into */}
        <motion.div
          className="flex flex-wrap items-center gap-4 pt-8 mt-2 border-t border-[rgba(45,42,38,0.08)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <div className="flex items-center gap-2 shrink-0">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-rose-300 inline-block"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] text-[#9A928A] uppercase tracking-widest">Currently into</span>
          </div>
          {interests.map((item, i) => (
            <motion.span
              key={item}
              className="font-mono text-xs text-[#9A928A] px-3 py-1.5 rounded-full border border-[rgba(45,42,38,0.10)] bg-white cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
              whileHover={{ borderColor: "rgba(251,113,133,0.45)", color: "#2D2A26", y: -2 }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
