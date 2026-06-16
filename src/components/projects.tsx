import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeader from "@/components/section-header"
import Reveal from "@/components/reveal"
import SpotlightCard from "@/components/spotlight-card"

interface Project {
  id: string
  name: string
  url: string
  image: string
  description: string
  tags: string[]
}

const PROJECTS: Project[] = [
  {
    id: "imi-health",
    name: "IMI Health",
    url: "https://www.imihealth.ai/",
    image: "/projects/imihealth.png",
    description:
      "AI-powered medical documentation SaaS that turns doctor-patient consultations into structured, standardized clinical reports through real-time voice transcription, generating both a technical report for the physician and a plain-language summary for the patient.",
    tags: ["Next.js", "TypeScript", "Supabase", "Claude API", "AssemblyAI", "Tailwind CSS"],
  },
  {
    id: "puntos-club",
    name: "Puntos Club",
    url: "https://puntosclub.ar/",
    image: "/projects/puntosclub.png",
    description:
      "White-label loyalty platform that lets businesses launch their own branded rewards club, where customers earn points for their purchases and redeem them for prizes from a customizable catalog, all managed from an admin control panel.",
    tags: ["React", "Node.js", "REST APIs", "Loyalty Platform"],
  },
]

function ProjectsInner() {
  return (
    <section id="projects" className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-gray-50 to-[color-mix(in_srgb,var(--brand)_4%,#f8fafc)] dark:from-gray-900 dark:via-gray-900 dark:to-[color-mix(in_srgb,var(--brand)_6%,#0f172a)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots opacity-30 dark:opacity-20" />
      <div
        aria-hidden="true"
        className="absolute -top-32 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 dark:opacity-25"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 60%, transparent), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured Projects"
          subtitle="Selected products I've built from zero to production"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 120}>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-labelledby={`project-name-${project.id}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-xl cursor-pointer"
              >
                <SpotlightCard className="h-full">
                  <Card className="relative h-full overflow-hidden border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-[color-mix(in_srgb,var(--brand)_20%,transparent)] group-hover:border-[color-mix(in_srgb,var(--brand)_35%,transparent)] pt-0 bg-card/90 backdrop-blur-sm">
                    {/* Gradient border on hover */}
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                      background: "linear-gradient(135deg, color-mix(in srgb, var(--brand) 25%, transparent), color-mix(in srgb, var(--brand-2) 25%, transparent))",
                      WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: "1px",
                    }} />

                    <div className="relative w-full aspect-[16/10] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.name} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay on hover */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--brand)_60%,transparent)] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                      />
                      {/* Visit pill */}
                      <span className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold glass shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Visit <ExternalLink className="size-3.5" />
                      </span>
                    </div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          id={`project-name-${project.id}`}
                          className="text-xl font-bold text-foreground group-hover:text-[var(--brand)] transition-colors"
                        >
                          {project.name}
                        </h3>
                        <ExternalLink className="size-5 text-[var(--brand)] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                      <p className="text-foreground/75 mb-4 leading-relaxed text-pretty">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-full bg-[color-mix(in_srgb,var(--brand)_8%,transparent)] text-[var(--brand)] border border-[color-mix(in_srgb,var(--brand)_18%,transparent)] transition-all duration-300 hover:bg-[color-mix(in_srgb,var(--brand)_15%,transparent)] hover:-translate-y-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default React.memo(ProjectsInner)
