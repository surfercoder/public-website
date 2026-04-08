import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Selected products I&apos;ve built from zero to production
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} live site`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
            >
              <Card className="h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-xl pt-0">
                <div className="relative w-full aspect-[16/10] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                    <ExternalLink className="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default React.memo(ProjectsInner)
