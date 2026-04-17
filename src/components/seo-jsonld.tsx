import React from "react"

function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  )
}

export default function SeoJsonLd() {
  const person = {
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@id": "https://agustincassani.com/#person",
    },
    name: "Agustin Cassani | Senior Software Engineer & Technical Leader",
    description:
      "Professional portfolio of Agustin Cassani, a Senior Software Engineer & Technical Leader with 18+ years of experience in web, mobile, and AI-powered solutions.",
    url: "https://agustincassani.com",
  }

  const breadcrumbHome = {
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Agustin Cassani",
    url: "https://agustincassani.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.google.com/search?q=site%3Aagustincassani.com+{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <JsonLd data={person} />
      <JsonLd data={profilePage} />
      <JsonLd data={breadcrumbHome} />
      <JsonLd data={website} />
    </>
  )
}
