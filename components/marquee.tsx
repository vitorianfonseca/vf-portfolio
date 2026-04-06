"use client"

import { motion } from "framer-motion"

const techStack = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Figma",
  "Git",
  "Framer Motion",
  "Prisma",
]

export function Marquee() {
  return (
    <div className="py-8 border-y border-[rgba(45,42,38,0.06)] bg-[#FDF8F5] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex"
        aria-label="Tech stack"
      >
        <div className="flex animate-marquee">
          {[...techStack, ...techStack].map((tech, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="font-mono text-sm text-[#9A928A] whitespace-nowrap">
                {tech}
              </span>
              <span className="ml-8 text-rose-300/60">✦</span>
            </div>
          ))}
        </div>
        <div className="flex animate-marquee" aria-hidden="true">
          {techStack.map((tech, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="font-mono text-sm text-[#9A928A] whitespace-nowrap">
                {tech}
              </span>
              <span className="ml-8 text-rose-300/60">✦</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
