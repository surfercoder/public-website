import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get to know more about my background and professional journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Dynamic Full Stack JavaScript Developer and Technical Lead
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              With 17+ years of experience architecting and delivering modern web and mobile solutions. I&apos;m an expert in
              React, React Native, Next.js, Node.js, and TypeScript with proven success leading remote development
              teams.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              I combine technical excellence with strategic vision to transform complex requirements into scalable,
              user-centered applications. My passion lies in creating efficient, elegant solutions that solve real-world
              problems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">Mendoza, Argentina</span>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">17+ Years Experience</span>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">Master of Computer Science</span>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">Available for Projects</span>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-xl">
              <Image 
                alt="Agustin Cassani" 
                className="object-cover" 
                fill 
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 320px"
                src="/profile-image.jpeg" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
