import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Certifications from "@/components/certifications"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Agustin Cassani | Senior Software Engineer & Technical Leader",
  description: "Professional portfolio of Agustin Cassani, a Senior Software Engineer & Technical Leader with 18+ years of experience in web, mobile, and AI-powered solutions.",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <ContactSection />
      <Footer />
    </main>
  )
}
