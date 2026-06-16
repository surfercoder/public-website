import { Award, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Reveal from "@/components/reveal"

interface CertificationItem {
  name: string
  issuer: string
  period: string
}

const certifications: CertificationItem[] = [
  {
    name: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    period: "2026",
  },
  {
    name: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    period: "2026",
  },
  {
    name: "Building with the Claude API",
    issuer: "Anthropic",
    period: "2026",
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    period: "2026",
  },
  {
    name: "Claude Code 101",
    issuer: "Anthropic",
    period: "2026",
  },
  {
    name: "Software Development with AI",
    issuer: "BIG School",
    period: "2025",
  },
  {
    name: "Ethereum Blockchain Developer Bootcamp With Solidity",
    issuer: "Udemy",
    period: "2025",
  },
  {
    name: "Ethereum and Solidity: The Complete Developer's Guide",
    issuer: "Udemy",
    period: "2024",
  },
  {
    name: "Next JS: The Complete Developer's Guide",
    issuer: "Udemy",
    period: "2024",
  },
  {
    name: "Internet of Things: Roadmap to a Connected World",
    issuer: "MIT",
    period: "2017",
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-20 bg-white dark:bg-gray-950 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid bg-grid-mask opacity-40 dark:opacity-20" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-25 dark:opacity-20"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand-2) 50%, transparent), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] mb-5">
            <span className="size-1.5 rounded-full bg-[var(--brand)] animate-ping-soft" />
            Credentials
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground via-foreground to-[var(--brand)] bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 70}>
              <Card className="group relative h-full overflow-hidden border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[color-mix(in_srgb,var(--brand)_15%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_30%,transparent)]">
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--brand)_5%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <span className="grid place-items-center size-11 rounded-xl bg-gradient-to-br from-[color-mix(in_srgb,var(--brand)_15%,transparent)] to-[color-mix(in_srgb,var(--brand-2)_15%,transparent)] text-[var(--brand)] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0">
                      <Award size={20} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-bold leading-snug">{item.name}</h3>
                      <p className="text-foreground/70 mt-1">{item.issuer}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                        <Calendar size={16} className="flex-none" />
                        <span>{item.period}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
