import { Button } from "@/components/ui/button"
import { ArrowDown, Mail } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <p className="mb-4 text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500">
            Hello, I&apos;m
          </p>

          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
              Agustin Cassani
            </h1>
          </div>

          <div className="mb-8 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 motion-safe:delay-200">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300">
              Senior Software Engineer & Technical Leader
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              With 18+ years of experience architecting and delivering modern web and mobile solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 motion-safe:delay-300">
            <Button asChild size="lg" className="text-md">
              <Link href="/#contact" className="flex items-center gap-2">
                <Mail className="size-5" />
                Contact Me
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-md">
              <Link href="/resume">View My Resume</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <div className="motion-safe:animate-scroll-hint">
          <ArrowDown className="size-6 text-gray-600 dark:text-gray-400" />
        </div>
      </div>
    </section>
  )
}
