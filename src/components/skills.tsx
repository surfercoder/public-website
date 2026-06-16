import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Layout, Server, Terminal, TestTube, Cloud, Blocks, Sparkles, Workflow } from "lucide-react"
import Reveal from "@/components/reveal"

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
    {
      title: "AI & Integrations",
      icon: <Sparkles className="size-6" />,
      skills: [
        "Anthropic Claude API",
        "AssemblyAI",
        "AI-assisted Code Generation",
        "Prompt Engineering",
      ],
    },
    {
      title: "Frontend & Mobile",
      icon: <Layout className="size-6" />,
      skills: ["React", "React Native", "Expo", "Next.js", "TypeScript", "JavaScript", "Redux", "Apollo Client"],
    },
    {
      title: "Backend & APIs",
      icon: <Server className="size-6" />,
      skills: ["Node.js", "Express", "Apollo Server", "GraphQL", "REST APIs", "Microservices Architecture"],
    },
    {
      title: "Databases & Query Languages",
      icon: <Database className="size-6" />,
      skills: ["Supabase", "PostgreSQL", "MongoDB", "SQL", "Neo4j", "GraphQL"],
    },
    {
      title: "UI Frameworks & Design Systems",
      icon: <Code className="size-6" />,
      skills: ["Material UI", "Tailwind CSS", "Ant Design", "Shadcn/ui", "Storybook"],
    },
    {
      title: "Testing & Quality Assurance",
      icon: <TestTube className="size-6" />,
      skills: ["Jest", "React Testing Library", "Cypress", "Playwright", "TDD Methodologies"],
    },
    {
      title: "DevOps & Infrastructure",
      icon: <Cloud className="size-6" />,
      skills: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD Pipelines", "GitLab CI", "GitHub Actions"],
    },
    {
      title: "Architecture & Methodology",
      icon: <Workflow className="size-6" />,
      skills: ["Microservices", "System Design", "Agile/Scrum", "Component Libraries (Storybook)"],
    },
    {
      title: "Blockchain Technology",
      icon: <Blocks className="size-6" />,
      skills: ["Ethereum", "Smart Contracts Development", "Web3.js", "DeFi Applications", "NFT Implementation"],
    },
    {
      title: "Development Tools",
      icon: <Terminal className="size-6" />,
      skills: ["Git", "Cursor", "Windsurf", "Claude Code", "Figma", "Postman"],
    },
]

function SkillsInner() {
  const skillCategories = SKILL_CATEGORIES

  return (
    <section id="skills" className="relative py-20 bg-white dark:bg-gray-950 overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid bg-grid-mask opacity-50 dark:opacity-25" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-25 dark:opacity-20"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand-3) 50%, transparent), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 50%, transparent), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] mb-5">
            <span className="size-1.5 rounded-full bg-[var(--brand)] animate-ping-soft" />
            Stack
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground via-foreground to-[var(--brand)] bg-clip-text text-transparent">Technical Skills</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            My expertise across various technologies and tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <Reveal key={category.title} delay={(i % 4) * 80}>
              <Card className="group relative h-full overflow-hidden border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[color-mix(in_srgb,var(--brand)_15%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_35%,transparent)]">
                {/* Gradient backdrop on hover */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--brand)_6%,transparent)] via-transparent to-[color-mix(in_srgb,var(--brand-2)_6%,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="grid place-items-center size-11 rounded-xl bg-gradient-to-br from-[color-mix(in_srgb,var(--brand)_15%,transparent)] to-[color-mix(in_srgb,var(--brand-2)_15%,transparent)] text-[var(--brand)] shadow-sm shadow-[color-mix(in_srgb,var(--brand)_15%,transparent)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {category.icon}
                    </span>
                    <h3 className="text-base md:text-lg font-bold leading-tight">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-sm text-foreground/80 flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        <span className="size-1.5 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default React.memo(SkillsInner)
