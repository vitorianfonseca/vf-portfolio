"use client"

import { motion } from "framer-motion"

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F5]/90 backdrop-blur-sm border-b border-[rgba(45,42,38,0.06)]"
      style={{ borderWidth: "0.5px" }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <motion.button
          onClick={() => onNavigate("home")}
          className="font-mono text-sm text-[#2D2A26] tracking-tight hover:opacity-70 transition-opacity"
          whileHover={{ scale: 1.02 }}
          aria-label="Go to home"
        >
          vitória.fonseca
        </motion.button>

        <div className="flex items-center gap-4 sm:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#9A928A] hover:text-[#2D2A26] transition-colors"
              aria-label={`Navigate to ${item.label}`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-rose-400 to-pink-300"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}

          <div className="hidden sm:flex items-center gap-2 ml-2 sm:ml-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-mono text-xs text-[#9A928A]">Available</span>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
