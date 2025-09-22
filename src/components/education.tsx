import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Academic background and language certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {education.map((item) => (
            <Card key={item.degree}>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.degree}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{item.institution}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <Calendar className="h-4 w-4" />
                      <span>{item.period}</span>
                      {item.location && (
                        <>
                          <span className="mx-1">•</span>
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </>
                      )}
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
