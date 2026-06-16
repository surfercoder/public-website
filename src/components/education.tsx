import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Reveal from "@/components/reveal"

interface EducationItem {
  degree: string
  institution: string
  location?: string
  period: string
}

const education: EducationItem[] = [
  {
    degree: "Master of Computer Science",
    institution: "Universidad Católica Argentina",
    location: "Buenos Aires, Argentina",
    period: "2014-2015",
  },
  {
    degree: "Bachelor of Computer Science",
    institution: "Universidad Juan Agustín Maza",
    location: "Mendoza, Argentina",
    period: "2005-2009",
  },
  {
    degree: "Cambridge Advanced English (CAE)",
    institution: "University of Cambridge",
    location: "Buenos Aires, Argentina",
    period: "2012",
  },
  {
    degree: "First Certificate in English (FCE)",
    institution: "University of Cambridge",
    location: "Mendoza, Argentina",
    period: "2009",
  },
]

export default function Education() {
  return (
    <section id="education" className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots opacity-25 dark:opacity-15" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 50%, transparent), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] mb-5">
            <span className="size-1.5 rounded-full bg-[var(--brand)] animate-ping-soft" />
            Learning
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground via-foreground to-[var(--brand)] bg-clip-text text-transparent">Education</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic background and language certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={(i % 2) * 80}>
              <Card className="group relative h-full overflow-hidden border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[color-mix(in_srgb,var(--brand)_15%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_30%,transparent)]">
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--brand)_5%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <span className="grid place-items-center size-11 rounded-xl bg-gradient-to-br from-[color-mix(in_srgb,var(--brand)_15%,transparent)] to-[color-mix(in_srgb,var(--brand-2)_15%,transparent)] text-[var(--brand)] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0">
                      <GraduationCap className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold leading-tight">{item.degree}</h3>
                      <p className="text-foreground/70 mt-1">{item.institution}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mt-3">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="size-4" />
                          {item.period}
                        </span>
                        {item.location && (
                          <>
                            <span className="opacity-40 hidden sm:inline">•</span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="size-4" />
                              {item.location}
                            </span>
                          </>
                        )}
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
