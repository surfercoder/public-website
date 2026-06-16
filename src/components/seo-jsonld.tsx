import React from "react"

const person = {
  "@type": "Person",
  "@id": "https://agustincassani.com/#person",
  name: "Agustin Cassani",
  url: "https://agustincassani.com",
  image: "https://agustincassani.com/profile-image.jpeg",
  jobTitle: "Senior Software Engineer & Technical Leader",
  description:
    "Senior Software Engineer & Technical Leader with 18+ years of experience architecting and delivering modern web, mobile, and AI-powered solutions.",
  knowsAbout: [
    "React",
    "React Native",
    "Next.js",
    "Node.js",
    "TypeScript",
    "GraphQL",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "AI Solutions",
    "Full-Stack Development",
    "Technical Leadership",
  ],
  sameAs: [
    "https://www.linkedin.com/in/agustincassani/",
    "https://github.com/surfercoder/",
    "https://www.agustincassani.com/",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mendoza",
    addressCountry: "AR",
  },
  telephone: "+54 9 (261) 688-6005",
}

const profilePage = {
  "@type": "ProfilePage",
  mainEntity: { "@id": "https://agustincassani.com/#person" },
  name: "Agustin Cassani | Senior Software Engineer & Technical Leader",
  description:
    "Professional portfolio of Agustin Cassani, a Senior Software Engineer & Technical Leader with 18+ years of experience in web, mobile, and AI-powered solutions.",
  url: "https://agustincassani.com",
}

const breadcrumbHome = {
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://agustincassani.com",
    },
  ],
}

const website = {
  "@type": "WebSite",
  name: "Agustin Cassani",
  url: "https://agustincassani.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.google.com/search?q=site%3Aagustincassani.com+{search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const graph = {
  "@context": "https://schema.org",
  "@graph": [person, profilePage, breadcrumbHome, website],
}

function escapeJsonForScript(value: string) {
  return value
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")
}

const safeJson = escapeJsonForScript(JSON.stringify(graph))

export default function SeoJsonLd() {
  return (
    <script type="application/ld+json">{safeJson}</script>
  )
}
