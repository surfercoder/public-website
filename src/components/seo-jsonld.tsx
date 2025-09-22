import React from "react"

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function SeoJsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Agustin Cassani",
    url: "https://agustincassani.com",
    image: "https://agustincassani.com/profile-image.jpeg",
    jobTitle: "Full Stack JavaScript Developer & Technical Lead",
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
    email: "mailto:agustinscassani@gmail.com",
    telephone: "+54 9 (261) 688-6005",
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
      <JsonLd data={website} />
    </>
  )
}
