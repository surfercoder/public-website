"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Mail } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Detect prefers-reduced-motion without relying on framer-motion hooks
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      try {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        setPrefersReducedMotion(!!mq.matches)
      } catch {
        // noop
      }
    }
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 z-0" />

      {/* Animated background elements (hidden for reduced motion) */}
      <div
        className="absolute inset-0 z-0 opacity-20 motion-reduce:hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 16 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, delay: 0.1 }}
            className="mb-4"
          >
            <h2 className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400">Hello, I&apos;m</h2>
          </motion.div>

          {/* Render the main headline immediately with no animation to optimize LCP */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
              Agustin Cassani
            </h1>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 16 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300">
              Full Stack JavaScript Developer & Technical Lead
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              With 17+ years of experience architecting and delivering modern web and mobile solutions.
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 16 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="text-md">
              <Link href="/#contact" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Me
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-md">
              <Link href="/resume">View My Resume</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : {
            duration: 0.4,
            delay: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 0.2,
          }}
          aria-hidden="true"
        >
          <ArrowDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </motion.div>
      </div>
    </section>
  )
}
