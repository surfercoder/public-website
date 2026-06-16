import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Briefcase, GraduationCap, Globe2 } from "lucide-react"
import Image from "next/image"
import SectionHeader from "@/components/section-header"
import Reveal from "@/components/reveal"

const INFO_CARDS = [
  { icon: <MapPin className="size-5" />, label: "Mendoza, Argentina" },
  { icon: <Briefcase className="size-5" />, label: "18+ Years Experience" },
  { icon: <GraduationCap className="size-5" />, label: "Master of Computer Science" },
  { icon: <Calendar className="size-5" />, label: "Available for Projects" },
  { icon: <Globe2 className="size-5" />, label: "Remote (Americas/EMEA)" },
]

const STATS = [
  { value: "18+", label: "Years experience" },
  { value: "30+", label: "Projects shipped" },
  { value: "200K+", label: "Daily users served" },
]

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-white dark:bg-gray-950 overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots opacity-30 dark:opacity-20" />
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-25 dark:opacity-20"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 50%, transparent), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Me"
          title="About Me"
          subtitle="Get to know more about my background and professional journey"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-foreground to-[var(--brand)] bg-clip-text text-transparent">Senior Software Engineer & Technical Leader</span>
            </h3>

            <p className="text-foreground/80 mb-6 leading-relaxed text-pretty">
              With 18+ years of experience architecting and delivering modern web, mobile, and AI-powered SaaS
              solutions. I&apos;m an expert in React, React Native, Next.js, Node.js, and TypeScript with a proven
              track record leading remote development teams and integrating cutting-edge AI APIs to ship
              production-grade products from zero to launch.
            </p>

            <p className="text-foreground/80 mb-8 leading-relaxed text-pretty">
              I combine technical excellence with strategic vision to transform complex requirements into scalable,
              user-centered applications. My passion lies in creating efficient, elegant solutions that solve real-world
              problems.
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="relative rounded-xl p-4 glass text-center transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INFO_CARDS.map((item, i) => (
                <Reveal key={item.label} delay={i * 60}>
                  <Card className="group relative overflow-hidden border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[color-mix(in_srgb,var(--brand)_15%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_30%,transparent)]">
                    <CardContent className="p-4 flex items-center gap-3 relative z-10">
                      <span className="grid place-items-center size-9 rounded-lg bg-gradient-to-br from-[color-mix(in_srgb,var(--brand)_15%,transparent)] to-[color-mix(in_srgb,var(--brand-2)_15%,transparent)] text-[var(--brand)] group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="text-foreground/85 text-sm md:text-base">{item.label}</span>
                    </CardContent>
                    <span aria-hidden="true" className="absolute inset-0 -z-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--brand)_4%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2 flex justify-center" delay={200}>
            <div className="relative">
              {/* Outer animated gradient ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full opacity-70 blur-2xl animate-gradient-flow motion-reduce:animate-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--brand), var(--brand-2), var(--brand-3), var(--brand))",
                }}
              />
              {/* Sharp gradient border */}
              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-[3px] bg-[conic-gradient(from_180deg,var(--brand),var(--brand-2),var(--brand-3),var(--brand))]"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                  <Image
                    alt="Agustin Cassani"
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 320px"
                    src="/profile-image.jpeg"
                    quality={85}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
              </div>

              {/* Floating chip badges */}
              <div className="absolute -top-4 -right-2 px-3 py-1.5 rounded-full glass text-xs font-semibold shadow-md flex items-center gap-1.5 motion-safe:animate-float-y">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Open to work
              </div>
              <div className="absolute -bottom-2 -left-4 px-3 py-1.5 rounded-full glass text-xs font-semibold shadow-md motion-safe:animate-float-y" style={{ animationDelay: "-3s" }}>
                <span className="gradient-text">React · AI · Mobile</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
