"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Download, Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/theme-toggle"
import { usePathname } from "next/navigation"
import { getInitialSection } from "@/lib/navigation"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const observerRefs = useRef<IntersectionObserver[]>([])
  const pathname = usePathname()

  // Define sections to observe
  const sections = useMemo(() => ["home", "about", "experience", "skills", "contact"], [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialize/Sync active section based on current route and hash
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : ""
    setActiveSection(getInitialSection(pathname ?? "/", hash, sections))
  }, [pathname, sections])

  useEffect(() => {
    if (pathname !== "/") return
    // Disconnect any existing observers
    observerRefs.current.forEach((observer) => observer.disconnect())
    observerRefs.current = []

    // Create new observers for each section
    sections.forEach((section) => {
      const sectionElement =
        document.getElementById(section) ||
        (section === "home" ? document.querySelector("main > section:first-child") : null)

      if (!sectionElement) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When section is in view with at least 40% visibility
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              setActiveSection(section)
            }
          })
        },
        { threshold: [0.4] }, // Trigger when 40% of the element is visible
      )

      observer.observe(sectionElement)
      observerRefs.current.push(observer)
    })

    return () => {
      // Clean up observers on unmount
      observerRefs.current.forEach((observer) => observer.disconnect())
    }
  }, [sections, pathname])

  const toggleMenu = useCallback(() => setIsOpen((v) => !v), [])

  const navLinks = useMemo(() => [
    { name: "Home", href: "/#home", section: "home" },
    { name: "About", href: "/#about", section: "about" },
    { name: "Experience", href: "/#experience", section: "experience" },
    { name: "Skills", href: "/#skills", section: "skills" },
    { name: "Contact", href: "/#contact", section: "contact" },
    { name: "Resume", href: "/resume", section: "resume" },
  ], [])

  const socialLinks = useMemo(() => [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/agustincassani/",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/surfercoder/",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/thesurferdaddy/",
      icon: <Instagram className="h-5 w-5" />,
    },
  ], [])

  const handleLinkClick = useCallback((section: string) => {
    setActiveSection(section)
    setIsOpen(false)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl">
              Agustin Cassani
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.section)}
                  className={cn(
                    "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
                    activeSection === link.section && "font-semibold",
                  )}
                >
                  {link.name}
                  {activeSection === link.section && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white transition-all duration-300" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-2 ml-4">
              {socialLinks.map((link) => (
                <Button key={link.name} variant="ghost" size="icon" asChild className="rounded-full">
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </Button>
              ))}

              {/* Theme toggle */}
              <ThemeToggle />

              <Button asChild variant="default" className="ml-2">
                <Link href="/resume" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>CV</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium relative",
                activeSection === link.section && "font-semibold",
              )}
              onClick={() => handleLinkClick(link.section)}
            >
              {link.name}
              {activeSection === link.section && (
                <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-black dark:bg-white transition-all duration-300" />
              )}
            </Link>
          ))}

          <div className="flex items-center space-x-2 pt-4 px-3">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" asChild className="rounded-full">
                <Link href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </Link>
              </Button>
            ))}

            {/* Theme toggle */}
            <ThemeToggle />

            <Button asChild variant="default" className="ml-auto">
              <Link href="/resume" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>CV</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default React.memo(Navbar)
