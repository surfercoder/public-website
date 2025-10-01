"use client"

import { Award, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CertificationItem {
  name: string
  issuer: string
  period: string
}

const certifications: CertificationItem[] = [
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
    <section id="certifications" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Professional certifications and continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((item) => (
            <Card key={item.name}>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{item.issuer}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <Calendar className="h-4 w-4" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
