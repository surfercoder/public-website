"use client"

import { useState, useSyncExternalStore } from "react"
import { LazyMotion, m, domAnimation } from "framer-motion"
import { Briefcase, Calendar, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import Link from "next/link"
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
      id: "imi-health",
      company: "IMI Health",
      position: "Co-Founder & CTO",
      period: "MARCH 2025 - PRESENT",
      location: "Mendoza, Argentina",
      type: "Remote",
      achievements: [
        "Architected and delivered an end-to-end AI-powered SaaS platform from zero to production launch (currently live with early-access physicians), enabling doctors to generate structured medical reports via real-time voice transcription and ambient AI",
        "Engineered full-stack platform using Next.js, TypeScript, Supabase, and Tailwind CSS / shadcn/ui, establishing a scalable foundation designed to support rapid user growth",
        "Integrated AssemblyAI for real-time and post-consultation voice transcription, reducing physician documentation time by eliminating manual data entry across both dictation and live ambient recording modes",
        "Implemented Anthropic Claude API for intelligent medical report generation, producing dual-format outputs: a structured clinical document for the physician and a plain-language summary for the patient",
        "Built automated multi-channel delivery system using Resend and WhatsApp Business API, enabling one-click report dispatch to doctors and patients",
        "Designed digital patient consent workflow embedded directly into the report pipeline, ensuring legal compliance and audit-ready documentation on every consultation",
        "Built and shipped a companion React Native / Expo mobile application for iOS and Android with full feature parity to the web platform, extending ambient AI recording to live in-person consultations",
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

function subscribeToReducedMotion(callback: () => void) {
  try {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    mq.addEventListener("change", callback)
    return () => mq.removeEventListener("change", callback)
  } catch {
    return () => {}
  }
}

function getReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

/* istanbul ignore next -- server snapshot for SSR */
function getReducedMotionServer() {
  return false
}

export default function Experience() {
  const [showAll, setShowAll] = useState(false)
  const reduced = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, getReducedMotionServer)

  const experiences = EXPERIENCES
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 4)

  return (
    <LazyMotion features={domAnimation}>
    <section id="experience" className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid bg-grid-mask opacity-40 dark:opacity-20" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand-2) 50%, transparent), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] mb-5">
            <span className="size-1.5 rounded-full bg-[var(--brand)] animate-ping-soft" />
            Career
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground via-foreground to-[var(--brand)] bg-clip-text text-transparent">Professional Experience</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey through various roles and companies
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline vertical line */}
          <div aria-hidden="true" className="hidden md:block absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--brand)]/40 via-[var(--brand-2)]/30 to-transparent" />

          <div className="grid grid-cols-1 gap-6">
            {displayedExperiences.map((exp, index) => (
              <m.div
                key={exp.id}
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.35, delay: index * 0.08 }}
                className="md:pl-12 relative"
              >
                {/* Timeline dot */}
                <span aria-hidden="true" className="hidden md:block absolute left-[10px] top-8 size-2.5 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] ring-4 ring-background shadow-md shadow-[color-mix(in_srgb,var(--brand)_40%,transparent)]" />

                <Card className="group relative overflow-hidden border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[color-mix(in_srgb,var(--brand)_15%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_30%,transparent)]">
                  {/* Animated gradient bar */}
                  <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--brand)] via-[var(--brand-2)] to-[var(--brand-3)]" />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--brand)_4%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="pb-2 pl-6 relative z-10">
                    <div className="flex justify-between items-start gap-3 flex-wrap">
                      <div>
                        <CardTitle className="text-xl font-bold">{exp.position}</CardTitle>
                        <CardDescription className="text-base font-medium mt-1 text-[var(--brand)]">{exp.company}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] border border-[color-mix(in_srgb,var(--brand)_25%,transparent)]">{exp.type}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-6 relative z-10">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-4">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        {exp.period}
                      </span>
                      <span className="hidden sm:inline opacity-40">•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="size-4" />
                        {exp.location}
                      </span>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="achievements" className="border-[color-mix(in_srgb,var(--foreground)_10%,transparent)]">
                        <AccordionTrigger className="text-sm font-semibold cursor-pointer hover:text-[var(--brand)] transition-colors">Key Achievements</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 mt-2">
                            {exp.achievements.map((achievement) => (
                              <li key={achievement} className="flex items-start gap-3 text-foreground/80">
                                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)]" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </div>

        {experiences.length > 4 && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 glass border-[color-mix(in_srgb,var(--brand)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_50%,transparent)] cursor-pointer transition-all duration-300"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="size-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="size-4" />
                </>
              )}
            </Button>
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="glass border-[color-mix(in_srgb,var(--brand)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--brand)_8%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_50%,transparent)] cursor-pointer transition-all duration-300"
          >
            <Link href="/resume" className="flex items-center gap-2">
              View Full Resume <ExternalLink className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
    </LazyMotion>
  )
}
