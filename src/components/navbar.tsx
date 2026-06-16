"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback, useSyncExternalStore } from "react"
import Link from "next/link"
import { Menu, X, Download } from "lucide-react"
import { Github, Linkedin, Instagram } from "@/components/brand-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/theme-toggle"
import { usePathname } from "next/navigation"
import { getInitialSection } from "@/lib/navigation"
import { getScrolledServer, getHashServer } from "@/lib/navbar-helpers"

const SECTIONS = ["home", "about", "experience", "projects", "skills", "contact"]

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true })
  return () => window.removeEventListener("scroll", callback)
}

function getScrolled() {
  return window.scrollY > 10
}

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback)
  return () => window.removeEventListener("hashchange", callback)
}

function getHash() {
  return window.location.hash
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getScrolledServer)
  const hash = useSyncExternalStore(subscribeToHash, getHash, getHashServer)
  const pathname = usePathname()
  // Initial state derived from the hash store; during SSR/hydration this is "" (server snapshot),
  // and the prev-hash sync block below picks up the real hash on the next render after commit.
  const [activeSection, setActiveSection] = useState(() =>
    getInitialSection(pathname ?? "/", hash, SECTIONS)
  )
  // react-doctor-disable-next-line react-doctor/rerender-state-only-in-handlers -- React-recommended pattern for adjusting state from props (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes); state is set during render in the conditional below.
  const [prevPathname, setPrevPathname] = useState(pathname)
  // react-doctor-disable-next-line react-doctor/rerender-state-only-in-handlers -- same React pattern as prevPathname above.
  const [prevHash, setPrevHash] = useState(hash)
  const observerRefs = useRef<IntersectionObserver[]>([])

  const sections = useMemo(() => SECTIONS, [])

  // Sync active section when pathname or hash changes (React-recommended pattern for adjusting state from external inputs).
  if (prevPathname !== pathname || prevHash !== hash) {
    setPrevPathname(pathname)
    setPrevHash(hash)
    setActiveSection(getInitialSection(pathname ?? "/", hash, sections))
  }

  useEffect(() => {
    if (pathname !== "/") return
    // Disconnect any existing observers
    for (const observer of observerRefs.current) observer.disconnect()
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
    { name: "Projects", href: "/#projects", section: "projects" },
    { name: "Skills", href: "/#skills", section: "skills" },
    { name: "Contact", href: "/#contact", section: "contact" },
    { name: "Resume", href: "/resume", section: "resume" },
  ], [])

  const socialLinks = useMemo(() => [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/agustincassani/",
      icon: <Linkedin className="size-5" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/surfercoder/",
      icon: <Github className="size-5" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/thesurferdaddy/",
      icon: <Instagram className="size-5" />,
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
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-[color-mix(in_srgb,var(--foreground)_8%,transparent)]"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="group font-bold text-xl flex items-center gap-2">
              <span className="grid place-items-center size-8 rounded-lg bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] text-white shadow-md shadow-[color-mix(in_srgb,var(--brand)_40%,transparent)] transition-transform duration-300 group-hover:rotate-6">
                <span className="font-display text-sm leading-none">AC</span>
              </span>
              <span className="hidden sm:inline text-gray-900 dark:text-white">
                Agustin <span className="gradient-text">Cassani</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 p-1 rounded-full glass">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.section)}
                  className={cn(
                    "relative isolate px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
                    activeSection === link.section
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white",
                  )}
                >
                  {link.name}
                  {activeSection === link.section && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] shadow-md shadow-[color-mix(in_srgb,var(--brand)_35%,transparent)] transition-all duration-300" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-1 ml-2">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full text-gray-700 dark:text-gray-200 hover:text-[var(--brand)] hover:bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] transition-colors cursor-pointer"
                >
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </Button>
              ))}

              {/* Theme toggle */}
              <ThemeToggle />

              <Button
                asChild
                variant="default"
                className="ml-2 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] text-white shadow-md shadow-[color-mix(in_srgb,var(--brand)_35%,transparent)] hover:shadow-lg hover:shadow-[color-mix(in_srgb,var(--brand)_50%,transparent)] hover:opacity-95 transition-all duration-300 border-0 cursor-pointer"
              >
                <Link
                  href="/AgustinCassaniCV.pdf"
                  download
                  className="flex items-center gap-2"
                >
                  <Download className="size-4" />
                  <span>CV</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-[var(--brand)] focus:outline-none transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block size-6" aria-hidden="true" />
              ) : (
                <Menu className="block size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-[color-mix(in_srgb,var(--foreground)_8%,transparent)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium relative transition-all duration-200 cursor-pointer",
                activeSection === link.section
                  ? "font-semibold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)]"
                  : "text-gray-700 dark:text-gray-200 hover:text-[var(--brand)] hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]",
              )}
              onClick={() => handleLinkClick(link.section)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-2 pt-4 px-3">
            {socialLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full text-gray-700 dark:text-gray-200 hover:text-[var(--brand)] hover:bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] cursor-pointer"
              >
                <Link href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                </Link>
              </Button>
            ))}

            {/* Theme toggle */}
            <ThemeToggle />

            <Button
              asChild
              variant="default"
              className="ml-auto bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] text-white shadow-md shadow-[color-mix(in_srgb,var(--brand)_35%,transparent)] border-0 cursor-pointer"
            >
              <Link
                href="/AgustinCassaniCV.pdf"
                download
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Download className="size-4" />
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
