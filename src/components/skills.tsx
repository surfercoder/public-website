import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Layout, Server, Terminal, TestTube, Cloud, Blocks } from "lucide-react"

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Layout className="h-6 w-6 text-blue-600" />,
      skills: ["React", "React Native", "Next.js", "Redux", "Apollo Client", "TypeScript", "JavaScript"],
    },
    {
      title: "Backend Development",
      icon: <Server className="h-6 w-6 text-blue-600" />,
      skills: ["Node.js", "Express", "Apollo Server", "Microservices Architecture", "RESTful APIs"],
    },
    {
      title: "Databases & Query Languages",
      icon: <Database className="h-6 w-6 text-blue-600" />,
      skills: ["MongoDB", "PostgreSQL", "SQL", "Neo4j", "GraphQL"],
    },
    {
      title: "UI Frameworks & Design Systems",
      icon: <Code className="h-6 w-6 text-blue-600" />,
      skills: ["Material UI", "Tailwind CSS", "Ant Design", "Shadcn/ui", "Storybook"],
    },
    {
      title: "Testing & Quality Assurance",
      icon: <TestTube className="h-6 w-6 text-blue-600" />,
      skills: ["Jest", "React Testing Library", "Cypress", "Playwright", "TDD Methodologies"],
    },
    {
      title: "DevOps & Infrastructure",
      icon: <Cloud className="h-6 w-6 text-blue-600" />,
      skills: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD Pipelines", "GitLab CI", "GitHub Actions"],
    },
    {
      title: "Blockchain Technology",
      icon: <Blocks className="h-6 w-6 text-blue-600" />,
      skills: ["Ethereum", "Smart Contracts Development", "Web3.js", "DeFi Applications", "NFT Implementation"],
    },
    {
      title: "Development Tools",
      icon: <Terminal className="h-6 w-6 text-blue-600" />,
      skills: ["Git", "Cursor", "Windsurf", "Claude Code", "Figma", "Postman"],
    },
]

function SkillsInner() {
  const skillCategories = SKILL_CATEGORIES

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My expertise across various technologies and tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {category.icon}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default React.memo(SkillsInner)
