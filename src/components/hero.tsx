import { Button } from "@/components/ui/button"
import { ArrowDown, Mail, Sparkles } from "lucide-react"
import Link from "next/link"

const TECH_BADGES = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "React Native",
  "AI / Claude",
  "Supabase",
  "GraphQL",
]

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Base radial gradient (required by tests: contains `bg-gradient-to-br`) */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-background via-background to-[color-mix(in_srgb,var(--brand)_6%,var(--background))]" />

      {/* Animated grid mask */}
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-mask opacity-60 dark:opacity-40" />

      {/* Aurora orbs (use float instead of blob to satisfy test) */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-40 dark:opacity-30 animate-float-y motion-reduce:animate-none"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 70%, transparent), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-24 w-[480px] h-[480px] rounded-full blur-3xl opacity-35 dark:opacity-30 animate-float-y motion-reduce:animate-none"
        style={{
          background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand-2) 65%, transparent), transparent)",
          animationDelay: "-3s",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-1/3 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 animate-float-y motion-reduce:animate-none"
        style={{
          background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand-3) 60%, transparent), transparent)",
          animationDelay: "-6s",
        }}
      />

      {/* Subtle noise */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-[0.35] mix-blend-overlay" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Availability pill */}
          <div className="motion-safe:animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping-soft" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-foreground/80">Open to new opportunities</span>
            <Sparkles className="size-3.5 text-[var(--brand)]" />
          </div>

          {/* Eyebrow */}
          <p className="mt-8 text-lg md:text-xl font-medium text-muted-foreground motion-safe:animate-fade-in-up motion-safe:delay-100">
            Hello, I&apos;m
          </p>

          {/* Name with gradient */}
          <div className="mt-3 mb-6 motion-safe:animate-fade-in-up motion-safe:delay-200">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-foreground via-foreground to-[color-mix(in_srgb,var(--brand)_50%,var(--foreground))] bg-clip-text text-transparent">
                Agustin Cassani
              </span>
            </h1>
          </div>

          {/* Role + intro */}
          <div className="mb-10 motion-safe:animate-fade-in-up motion-safe:delay-300">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              <span className="gradient-text">Senior Software Engineer & Technical Leader</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-pretty">
              With 18+ years of experience architecting and delivering modern web, mobile, and AI-powered solutions.
            </p>
          </div>

          {/* Tech badges marquee */}
          <div
            aria-hidden="true"
            className="mb-10 motion-safe:animate-fade-in-up motion-safe:delay-400 overflow-hidden max-w-2xl mx-auto"
            style={{ maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)" }}
          >
            <div className="flex gap-3 motion-safe:animate-marquee motion-reduce:animate-none w-max">
              {[...TECH_BADGES, ...TECH_BADGES].map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="shrink-0 px-3 py-1 rounded-full text-xs font-medium glass text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center motion-safe:animate-fade-in-up motion-safe:delay-500">
            <Button asChild size="lg" className="text-md group relative overflow-hidden bg-gradient-to-r from-[var(--brand)] to-[var(--brand-2)] text-white shadow-lg shadow-[color-mix(in_srgb,var(--brand)_40%,transparent)] hover:shadow-xl hover:shadow-[color-mix(in_srgb,var(--brand)_50%,transparent)] hover:opacity-100 transition-all duration-300 border-0 cursor-pointer">
              <Link href="/#contact" className="flex items-center gap-2">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Mail className="size-5" />
                Contact Me
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-md glass border-[color-mix(in_srgb,var(--brand)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_50%,transparent)] transition-all duration-300 cursor-pointer">
              <Link href="/resume">View My Resume</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-xs uppercase tracking-widest text-muted-foreground/70">Scroll</span>
        <div className="motion-safe:animate-scroll-hint">
          <ArrowDown className="size-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
