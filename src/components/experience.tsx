"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Experience {
  id: string
  company: string
  position: string
  period: string
  location: string
  type: string
  achievements: string[]
}

const EXPERIENCES: Experience[] = [
    {
      id: "utn",
      company: "Universidad Tecnológica Nacional",
      position: "Professor (Contract)",
      period: "AUGUST 2023 - PRESENT",
      location: "Mendoza, Argentina",
      type: "Contract",
      achievements: [
        "Crafted comprehensive curriculum for Software Engineering program, instructing 100+ students in modern JavaScript frameworks and tools",
        "Pioneered hands-on learning approach resulting in 40% increase in student project completion rates",
        "Mentored 25+ students on capstone projects, with 5 projects being adopted by local businesses",
      ],
    },
    {
      id: "leverege",
      company: "Leverege",
      position: "Senior React Native Developer",
      period: "AUGUST 2023 - FEBRUARY 2025",
      location: "Mendoza, Argentina",
      type: "Remote",
      achievements: [
        "Architected core features for IoT mobile application that achieved 4.8/5 star rating across platforms",
        "Optimized API response time by 65% through restructuring of Node.js backend services and introduction of efficient caching strategies",
        "Engineered cross-platform UI components that decreased development time by 30% while maintaining design consistency",
        "Designed comprehensive test suite that identified and resolved 40+ critical bugs before production release",
        "Spearheaded migration from JavaScript to TypeScript, resulting in 78% reduction in type-related runtime errors",
      ],
    },
    {
      id: "bitovi",
      company: "Bitovi",
      position: "Full Stack JavaScript Consultant",
      period: "AUGUST 2021 - JULY 2023",
      location: "Mendoza, Argentina",
      type: "Remote",
      achievements: [
        "Delivered strategic technical guidance to 12+ client projects, consistently exceeding delivery expectations and KPIs",
        "Accelerated application performance by 70% through integration of GraphQL and Next.js server-side rendering",
        "Constructed scalable database architecture using PostgreSQL that successfully handled 300% traffic growth",
        "Established modular component library with Storybook that shortened UI development time by 40% across multiple projects",
        "Instituted automated testing protocols that increased code coverage from 45% to 92% while minimizing regression issues by 65%",
      ],
    },
    {
      id: "kimetrica",
      company: "Kimetrica",
      position: "React Technical Lead Developer",
      period: "AUGUST 2020 - JULY 2021",
      location: "Mendoza, Argentina",
      type: "Remote",
      achievements: [
        "Led team of 8 developers in delivering complex data visualization applications for international humanitarian organizations",
        "Devised scalable frontend solution that processed and displayed 200+ million data points with sub-second response times",
        "Created comprehensive UI design system that diminished design inconsistencies by 85% across 5 different applications",
        "Formulated code quality standards and review processes that trimmed critical bugs by 75% in production environments",
        "Mentored junior developers, resulting in 3 promotions within the team during 12-month period",
      ],
    },
    {
      id: "joybird",
      company: "Joybird",
      position: "Full Stack JavaScript Developer",
      period: "AUGUST 2019 - JULY 2020",
      location: "Remote",
      type: "Remote",
      achievements: [
        "Engineered e-commerce features that boosted conversion rates by 18% and average order value by 12%",
      ],
    },
    {
      id: "mokriya",
      company: "Mokriya",
      position: "Full Stack JavaScript Developer",
      period: "AUGUST 2018 - JULY 2019",
      location: "Remote",
      type: "Remote",
      achievements: ["Built mobile application features using React Native that grew monthly active users by 45%"],
    },
    {
      id: "6connect",
      company: "6connect",
      position: "Software Engineer",
      period: "AUGUST 2016 - JULY 2018",
      location: "Remote",
      type: "Remote",
      achievements: [
        "Transformed network management tools that streamlined configuration time by 60% for enterprise clients",
      ],
    },
    {
      id: "careerlist",
      company: "Careerlist",
      position: "Solution Architect",
      period: "AUGUST 2015 - JULY 2016",
      location: "Remote",
      type: "Remote",
      achievements: [
        "Designed scalable architecture supporting 200K+ daily active users across multiple platforms",
      ],
    },
    {
      id: "vmbc",
      company: "VMBC",
      position: "Technical Leader",
      period: "NOVEMBER 2013 - JULY 2015",
      location: "On-site",
      type: "On-site",
      achievements: [
        "Orchestrated development team in delivering business-critical applications with 99.9% uptime",
      ],
    },
    {
      id: "exxonmobil",
      company: "ExxonMobil",
      position: "Intranet Application Developer",
      period: "MAY 2011 - OCTOBER 2013",
      location: "On-site",
      type: "On-site",
      achievements: [
        "Innovated internal applications that expedited operations and saved 25+ hours per week in manual processes",
      ],
    },
  ]

export default function Experience() {
  const [showAll, setShowAll] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      try {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        setReduced(!!mq.matches)
      } catch {}
    }
  }, [])

  const experiences = EXPERIENCES
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4)

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My journey through various roles and companies
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {displayedExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.3, delay: index * 0.08 }}
            >
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">{exp.position}</CardTitle>
                      <CardDescription className="text-lg font-medium mt-1">{exp.company}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">{exp.type}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                    <span className="mx-2">•</span>
                    <Briefcase className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="achievements">
                      <AccordionTrigger className="text-sm font-medium">Key Achievements</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {experiences.length > 4 && (
          <div className="flex justify-center mt-10">
            <Button variant="outline" onClick={() => setShowAll(!showAll)} className="flex items-center gap-2">
              {showAll ? (
                <>
                  Show Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <a href="/resume" className="flex items-center gap-2">
              View Full Resume <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
