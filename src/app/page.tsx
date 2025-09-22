import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Certifications from "@/components/certifications"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Agustin Cassani | Full Stack JavaScript Developer",
  description: "Professional portfolio of Agustin Cassani, a Full Stack JavaScript Developer with 17+ years of experience in web and mobile development.",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Certifications />
      <ContactSection />
      <Footer />
    </main>
  )
}
