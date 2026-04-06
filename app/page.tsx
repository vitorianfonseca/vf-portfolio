"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { WorkSection } from "@/components/work-section"
import { AboutSection } from "@/components/about-section"
import { StackSection } from "@/components/stack-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "work", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const top = element.offsetTop - 80
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <main className="relative min-h-screen bg-[#FDF8F5] scroll-smooth">
      <AnimatedBackground />
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
      <div className="relative z-10">
      <section id="home">
        <Hero />
      </section>
      <Marquee />
      <section id="work">
        <WorkSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="stack"><StackSection /></section>
      <section id="contact">
        <Footer />
      </section>
      </div>
    </main>
  )
}
