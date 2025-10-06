import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from "lucide-react"
import ContactForm from "@/components/contact-form"

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5 text-blue-600" />,
    title: "Email",
    value: "agustinscassani@gmail.com",
    link: "mailto:agustinscassani@gmail.com",
  },
  {
    icon: <Phone className="h-5 w-5 text-blue-600" />,
    title: "Phone",
    value: "+54 9 (261) 688-6005",
    link: "tel:+5492616886005",
  },
  {
    icon: <MapPin className="h-5 w-5 text-blue-600" />,
    title: "Location",
    value: "Mendoza, Argentina",
    link: "https://maps.google.com/?q=Mendoza,Argentina",
  },
]

const socialLinks = [
  {
    icon: <Linkedin className="h-5 w-5" />,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/agustincassani/",
  },
  {
    icon: <Github className="h-5 w-5" />,
    name: "GitHub",
    url: "https://github.com/surfercoder/",
  },
  {
    icon: <Instagram className="h-5 w-5" />,
    name: "Instagram",
    url: "https://www.instagram.com/thesurferdaddy/",
  },
]

function ContactSection() {

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential opportunities?
            <br />I&apos;d love to hear from you!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
            <div className="space-y-6 mb-8" style={{ marginTop: "20px" }}>
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="flex items-start gap-4 group"
                  target={item.title === "Location" ? "_blank" : undefined}
                  rel={item.title === "Location" ? "noopener noreferrer" : undefined}
                >
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Connect With Me</h3>
            <div className="flex gap-4" style={{ marginTop: "20px" }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>Fill out the form below and I&apos;ll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(ContactSection)
