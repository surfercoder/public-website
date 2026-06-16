import React from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import { Linkedin, Github, Instagram } from "@/components/brand-icons"
import { ObfuscatedEmailLink, ObfuscatedEmailText } from "@/components/obfuscated-email"

const ContactForm = dynamic(() => import("@/components/contact-form"))

const contactInfo = [
  {
    icon: <Phone className="size-5" />,
    title: "Phone",
    value: "+54 9 (261) 688-6005",
    link: "tel:+5492616886005",
  },
  {
    icon: <MapPin className="size-5" />,
    title: "Location",
    value: "Mendoza, Argentina",
    link: "https://maps.google.com/?q=Mendoza,Argentina",
  },
]

const socialLinks = [
  {
    icon: <Linkedin className="size-5" />,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/agustincassani/",
  },
  {
    icon: <Github className="size-5" />,
    name: "GitHub",
    url: "https://github.com/surfercoder/",
  },
  {
    icon: <Instagram className="size-5" />,
    name: "Instagram",
    url: "https://www.instagram.com/thesurferdaddy/",
  },
]

function ContactSection() {
  return (
    <section id="contact" className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid bg-grid-mask opacity-40 dark:opacity-20" />
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-25 dark:opacity-20"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand) 60%, transparent), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--brand-2) 60%, transparent), transparent)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] mb-5">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-ping-soft" />
            Let&apos;s Talk
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground via-foreground to-[var(--brand)] bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities?
            <br />I&apos;d love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-4 mb-10">
              <ObfuscatedEmailLink className="group flex items-center gap-4 p-4 rounded-xl glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[color-mix(in_srgb,var(--brand)_15%,transparent)] cursor-pointer">
                <span className="grid place-items-center size-11 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] text-white shadow-md shadow-[color-mix(in_srgb,var(--brand)_30%,transparent)] transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <Mail className="size-5" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-base font-semibold">Email</h4>
                  <p className="text-foreground/70 group-hover:text-[var(--brand)] transition-colors truncate">
                    <ObfuscatedEmailText />
                  </p>
                </div>
              </ObfuscatedEmailLink>

              {contactInfo.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="group flex items-center gap-4 p-4 rounded-xl glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[color-mix(in_srgb,var(--brand)_15%,transparent)] cursor-pointer"
                  target={item.title === "Location" ? "_blank" : undefined}
                  rel={item.title === "Location" ? "noopener noreferrer" : undefined}
                >
                  <span className="grid place-items-center size-11 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] text-white shadow-md shadow-[color-mix(in_srgb,var(--brand)_30%,transparent)] transition-transform duration-300 group-hover:scale-110 shrink-0">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold">{item.title}</h4>
                    <p className="text-foreground/70 group-hover:text-[var(--brand)] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative grid place-items-center size-12 rounded-xl glass overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[color-mix(in_srgb,var(--brand)_25%,transparent)] cursor-pointer"
                  aria-label={social.name}
                >
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-foreground/80 group-hover:text-white transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <Card className="relative overflow-hidden border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-card/85 backdrop-blur-md shadow-xl shadow-[color-mix(in_srgb,var(--brand)_10%,transparent)]">
              <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand)] via-[var(--brand-2)] to-[var(--brand-3)]" />
              <CardHeader>
                <CardTitle className="text-2xl">Send Me a Message</CardTitle>
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
