"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

type ProjectStatus = "live" | "wip" | "soon"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  year: string
  status: ProjectStatus
  href: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: "01",
    title: "Unidesk",
    description: "A productivity app built for students. Task management, note-taking, and study planning — all in one clean interface.",
    tags: ["React", "TypeScript", "Tailwind", "Supabase"],
    year: "2024",
    status: "live",
    href: "https://vf-unidesk.vercel.app/",
    githubUrl: "https://github.com/vitorianfonseca/unidesk",
  },
  {
    id: "02",
    title: "DSTools",
    description: "A comprehensive guide and base-builder for Don't Starve Together. Helping players survive one of gaming's most brutal worlds.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    year: "2024",
    status: "live",
    href: "https://dst-tools.vercel.app/",
    githubUrl: "https://github.com/vitorianfonseca/dstools",
  },
  {
    id: "03",
    title: "Coming Soon",
    description: "Something new is in the works. Stay tuned.",
    tags: [],
    year: "2025",
    status: "soon",
    href: "#",
  },
  {
    id: "04",
    title: "Coming Soon",
    description: "Another project on the horizon. More details soon.",
    tags: [],
    year: "2025",
    status: "soon",
    href: "#",
  },
]

const statusLabel = { live: "Live", wip: "In Progress", soon: "Coming Soon" }

/* ─── card ─────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isSoon = project.status === "soon"

  return (
    <article
      className={`relative shrink-0 flex flex-col rounded-2xl overflow-hidden w-full transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${!isSoon ? "hover:-translate-y-2 hover:shadow-[0_24px_48px_-8px_rgba(251,113,133,0.22),0_0_0_1px_rgba(45,42,38,0.06)]" : ""}`}
      style={{
        boxShadow: isSoon
          ? "0 2px 12px rgba(45,42,38,0.05), 0 0 0 1px rgba(45,42,38,0.06)"
          : "0 2px 12px rgba(45,42,38,0.08), 0 0 0 1px rgba(45,42,38,0.06)",
        opacity: isSoon ? 0.7 : 1,
      }}
    >
      {/* ── dark header ─────────────────────── */}
      <div className="relative bg-[#2D2A26] px-7 pt-7 pb-6 overflow-hidden">
        {/* subtle grid texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-${project.id}-${index}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${project.id}-${index})`}/>
        </svg>

        {/* ghost number */}
        <span
          className="absolute -bottom-3 right-5 font-serif font-bold select-none pointer-events-none"
          style={{ fontSize: "6.5rem", lineHeight: 1, color: "#fb7185", opacity: 0.07 }}
        >
          {project.id}
        </span>

        {/* status row */}
        <div className="relative flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-rose-300"
              animate={project.status === "live" ? { opacity: [1, 0.3, 1] } : { opacity: 0.4 }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] text-rose-300/70 uppercase tracking-widest">
              {statusLabel[project.status]}
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/25">{project.year}</span>
        </div>

        {/* title */}
        <h3 className="relative font-serif text-[1.6rem] font-bold text-white/90 leading-tight">
          {isSoon ? <span className="opacity-40">???</span> : project.title}
        </h3>

        {/* rose underline */}
        <div className="relative mt-3 h-px w-10 bg-rose-300/50 rounded-full" />
      </div>

      {/* ── light body ──────────────────────── */}
      <div className="bg-[#FDFAF8] flex flex-col flex-1 px-7 py-6 gap-4">
        {isSoon ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-4">
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-[rgba(45,42,38,0.15)] flex items-center justify-center">
              <span className="text-[#C4BBB4] text-lg">+</span>
            </div>
            <p className="font-mono text-xs text-[#C4BBB4] uppercase tracking-widest">Coming Soon</p>
          </div>
        ) : (
          <>
            <p className="font-sans text-sm text-[#7A7268] leading-relaxed flex-1">
              {project.description}
            </p>

            {/* tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-[#9A928A] px-2.5 py-1 rounded-full border border-[rgba(45,42,38,0.1)] bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* divider + links */}
            <div className="flex items-center gap-4 pt-3 border-t border-[rgba(45,42,38,0.07)]">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[11px] text-[#9A928A] hover:text-[#2D2A26] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-[11px] text-rose-300 hover:text-rose-400 transition-colors ml-auto"
                onClick={(e) => e.stopPropagation()}
              >
                View Live ↗
              </a>
            </div>
          </>
        )}
      </div>
    </article>
  )
}

/* ─── infinite carousel ─────────────────────── */
// card width 400px + gap 24px = 424px per slot; 4 projects → loop every 4 * 424 = 1696px
const CARD_WIDTH = 400
const CARD_GAP = 24
const LOOP_DISTANCE = projects.length * (CARD_WIDTH + CARD_GAP)

function ProjectsCarousel() {
  const looped = [...projects, ...projects]
  const [paused, setPaused] = useState(false)

  return (
    <div className="relative overflow-hidden w-full group/carousel">
      <div
        className="flex animate-carousel"
        style={{
          gap: CARD_GAP,
          width: "max-content",
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {looped.map((project, i) => (
          <div key={`${project.id}-${i}`} style={{ width: 400, flexShrink: 0 }}>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

      {/* Pause hint */}
      <motion.div
        className="absolute bottom-3 right-6 flex items-center gap-1.5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: paused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="w-1 h-3 rounded-full bg-[#9A928A]/50 inline-block" />
        <span className="w-1 h-3 rounded-full bg-[#9A928A]/50 inline-block" />
        <span className="font-mono text-[10px] text-[#9A928A]/60 uppercase tracking-widest ml-1">paused</span>
      </motion.div>
    </div>
  )
}

/* ─── section ───────────────────────────────── */
export function WorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent relative overflow-hidden">

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="font-mono text-xs text-[#9A928A] uppercase tracking-widest"
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Selected Work
          </motion.span>
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold text-[#2D2A26] mt-3 whitespace-nowrap"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Recent Projects
          </motion.h2>
          <div className="flex items-center gap-6 mt-4">
            <motion.div
              className="h-1 bg-linear-to-r from-rose-300/60 to-pink-200/40 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.a
              href="https://github.com/vitorianfonseca"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs text-[#9A928A] border border-[rgba(45,42,38,0.12)] px-4 py-2 rounded-full hover:text-[#2D2A26] hover:border-[rgba(45,42,38,0.3)] transition-colors"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -2 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              More on GitHub ↗
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Cards — desktop: infinite carousel / mobile: horizontal scroll */}
      <div className="hidden md:block w-full">
        <ProjectsCarousel />
      </div>

      <div className="md:hidden w-full overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        <div className="flex gap-4 px-6" style={{ width: "max-content" }}>
          {projects.map((project, i) => (
            <div key={project.id} style={{ scrollSnapAlign: "start", width: "85vw", maxWidth: 340 }}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
