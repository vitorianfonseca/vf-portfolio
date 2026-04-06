"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const projects = [
  {
    id: "01",
    title: "Unidesk",
    description: "A productivity app built for students. Task management, note-taking, and study planning — all in one clean interface.",
    tags: ["React", "TypeScript", "Tailwind", "Supabase"],
    year: "2024",
    status: "live"  as const,
    href: "https://vf-unidesk.vercel.app/",
    githubUrl: "https://github.com/vitorianfonseca/unidesk",
  },
  {
    id: "02",
    title: "DSTools",
    description: "A comprehensive guide and base-builder for Don't Starve Together. Helping players survive one of gaming's most brutal worlds.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    year: "2024",
    status: "live"  as const,
    href: "https://dst-tools.vercel.app/",
    githubUrl: "https://github.com/vitorianfonseca/dstools",
  },
]

const statusLabel = { live: "Live", wip: "In Progress", soon: "Coming Soon" }

/* ─── card ─────────────────────────────────── */
function ProjectCard({ project }: { project: typeof projects[0] }) {
  const isDisabled = project.href === "#"

  return (
    <motion.article
      className="relative shrink-0 flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: CARD_WIDTH,
        boxShadow: "0 2px 12px rgba(45,42,38,0.08), 0 0 0 1px rgba(45,42,38,0.06)",
      }}
      whileHover={{ y: -8, boxShadow: "0 24px 48px -8px rgba(251,113,133,0.22), 0 0 0 1px rgba(45,42,38,0.06)" }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* ── dark header ─────────────────────── */}
      <div className="relative bg-[#2D2A26] px-7 pt-7 pb-6 overflow-hidden">
        {/* subtle grid texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${project.id})`}/>
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
              className="w-1.5 h-1.5 rounded-full bg-rose-400"
              animate={project.status === "live" ? { opacity: [1, 0.3, 1] } : {}}
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
          {project.title}
        </h3>

        {/* rose underline */}
        <div className="relative mt-3 h-px w-10 bg-rose-400/50 rounded-full" />
      </div>

      {/* ── light body ──────────────────────── */}
      <div className="bg-[#FDFAF8] flex flex-col flex-1 px-7 py-6 gap-4">
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
          {!isDisabled && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-[11px] text-rose-400 hover:text-rose-500 transition-colors ml-auto"
              onClick={(e) => e.stopPropagation()}
            >
              View Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

/* ─── cards grid ────────────────────────────── */
function ProjectsGrid({ isInView }: { isInView: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
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
          className="mb-14 flex items-end justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div>
            <motion.span
              className="font-mono text-xs text-[#9A928A] uppercase tracking-widest"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Selected Work
            </motion.span>
            <motion.h2
              className="font-serif text-4xl md:text-5xl font-bold text-[#2D2A26] mt-3"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Recent Projects
            </motion.h2>
            <motion.div
              className="h-1 bg-linear-to-r from-rose-300/60 to-pink-200/40 mt-4 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>

          <motion.a
            href="https://github.com/vitorianfonseca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#9A928A] border border-[rgba(45,42,38,0.12)] px-4 py-2 rounded-full hover:text-[#2D2A26] hover:border-[rgba(45,42,38,0.3)] transition-colors mt-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -2 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            More on GitHub ↗
          </motion.a>

        </motion.div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto">
        <ProjectsGrid isInView={isInView} />
      </div>
    </section>
  )
}
