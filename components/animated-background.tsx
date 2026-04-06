"use client"

import { useEffect, useRef } from "react"

const nodes = [
  { x: 0.10, y: 0.08, color: [251, 113, 133], size: 0.55, speed: 0.28, phase: 0.0 },
  { x: 0.88, y: 0.15, color: [252, 231, 239], size: 0.50, speed: 0.22, phase: 1.3 },
  { x: 0.50, y: 0.50, color: [248, 200, 220], size: 0.48, speed: 0.18, phase: 2.6 },
  { x: 0.15, y: 0.82, color: [251, 191, 163], size: 0.46, speed: 0.25, phase: 0.9 },
  { x: 0.82, y: 0.72, color: [251, 113, 133], size: 0.44, speed: 0.20, phase: 3.8 },
  { x: 0.35, y: 0.25, color: [252, 231, 239], size: 0.42, speed: 0.30, phase: 1.8 },
]

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let w = 0, h = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    resize()
    window.addEventListener("resize", resize)

    const start = performance.now()

    const draw = () => {
      const t = (performance.now() - start) / 1000

      ctx.clearRect(0, 0, w, h)

      // base colour
      ctx.fillStyle = "#faf8f4"
      ctx.fillRect(0, 0, w, h)

      // mesh nodes
      for (const n of nodes) {
        const px = (n.x + Math.sin(t * n.speed + n.phase) * 0.22) * w
        const py = (n.y + Math.cos(t * n.speed * 0.85 + n.phase) * 0.22) * h
        const r = n.size * Math.min(w, h)

        const g = ctx.createRadialGradient(px, py, 0, px, py, r)
        const [R, G, B] = n.color
        g.addColorStop(0,   `rgba(${R},${G},${B},0.08)`)
        g.addColorStop(0.4, `rgba(${R},${G},${B},0.03)`)
        g.addColorStop(1,   `rgba(${R},${G},${B},0)`)

        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Grain texture */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, opacity: 0.14 }}
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </>
  )
}
