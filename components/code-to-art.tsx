"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

const transformations = [
  { code: "const beauty = design(logic);", art: "Where logic meets beauty" },
  { code: "return passion.create();", art: "Creating with passion" },
  { code: "while(true) { improve(); }", art: "Always improving" },
]

export function CodeToArt() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "transforming" | "showing">("typing")
  const [typedCode, setTypedCode] = useState("")
  const [showArt, setShowArt] = useState(false)
  const brushControls = useAnimation()

  useEffect(() => {
    const current = transformations[currentIndex]
    if (!current) return

    if (phase === "typing") {
      let charIndex = 0
      const typeInterval = setInterval(() => {
        if (charIndex <= current.code.length) {
          setTypedCode(current.code.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => setPhase("transforming"), 300)
        }
      }, 35)
      return () => clearInterval(typeInterval)
    }

    if (phase === "transforming") {
      brushControls.start({
        x: ["0%", "100%"],
        transition: { duration: 0.6, ease: "easeInOut" }
      }).then(() => {
        setShowArt(true)
        setPhase("showing")
      })
    }

    if (phase === "showing") {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % transformations.length)
        setPhase("typing")
        setTypedCode("")
        setShowArt(false)
        brushControls.set({ x: "0%" })
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, phase, brushControls])

  const current = transformations[currentIndex]

  return (
    <div className="relative w-full max-w-2xl">
      {/* Compact horizontal container */}
      <div className="relative bg-[#2D2A26] rounded-xl px-5 py-3 overflow-hidden shadow-lg">
        {/* Terminal dots - smaller */}
        <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-300/50" />
          <div className="w-2 h-2 rounded-full bg-pink-200/50" />
          <div className="w-2 h-2 rounded-full bg-[#9A928A]/30" />
        </div>

        {/* Single line content */}
        <div className="relative h-7 overflow-hidden ml-16 font-mono text-sm flex items-center">
          {/* Code being typed */}
          <motion.span
            className="text-[#FDF8F5]/80 whitespace-nowrap"
            animate={{ opacity: showArt ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {typedCode}
            {!showArt && (
              <motion.span
                className="inline-block w-1.5 h-4 bg-rose-300/80 ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.span>

          {/* Brush stroke overlay */}
          <motion.div
            className="absolute inset-y-0 left-0 w-full pointer-events-none flex items-center"
            initial={{ x: "0%" }}
            animate={brushControls}
          >
            {/* Brush icon */}
            <motion.div 
              className="absolute right-0 -translate-x-2"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 20L8 16M8 16L12 12M8 16L4 12M12 12L20 4"
                  stroke="#fb7185"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="4" r="2" fill="#fce7ef" />
              </svg>
            </motion.div>
            
            {/* Paint trail */}
            <div 
              className="absolute inset-y-0 left-0 right-6 bg-linear-to-r from-rose-400/15 via-pink-300/20 to-transparent"
              style={{ 
                maskImage: "linear-gradient(to right, black 85%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, black 85%, transparent)"
              }}
            />
          </motion.div>

          {/* Art text appearing */}
          <motion.span
            className="absolute inset-0 flex items-center text-rose-300 font-serif italic text-base whitespace-nowrap"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ 
              opacity: showArt ? 1 : 0,
              filter: showArt ? "blur(0px)" : "blur(4px)"
            }}
            transition={{ duration: 0.3 }}
          >
            {current?.art}
          </motion.span>
        </div>

        {/* Sparkle decoration */}
        <motion.span
          className="absolute top-2 right-3 text-rose-300/30 text-xs"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✦
        </motion.span>

        {/* Floating particles during transform */}
        {phase === "transforming" && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-rose-300 rounded-full"
                initial={{ 
                  x: "50%", 
                  y: "50%",
                  opacity: 1,
                  scale: 0
                }}
                animate={{ 
                  x: `${20 + Math.random() * 60}%`, 
                  y: `${Math.random() * 100}%`,
                  opacity: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Label below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-3 mt-3"
      >
        <div className="h-px w-8 bg-linear-to-r from-transparent to-rose-200/30" />
        <span className="text-[10px] font-mono text-[#9A928A]/50 tracking-widest uppercase">code transforms to art</span>
        <div className="h-px w-8 bg-linear-to-l from-transparent to-rose-200/30" />
      </motion.div>
    </div>
  )
}
