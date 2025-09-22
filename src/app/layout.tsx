import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/navbar"
import SeoJsonLd from "@/components/seo-jsonld"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agustin Cassani | Full Stack JavaScript Developer",
  description: "Professional portfolio of Agustin Cassani, a Full Stack JavaScript Developer with 17+ years of experience in web and mobile development.",
  metadataBase: new URL("https://agustincassani.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: "Agustin Cassani | Full Stack JavaScript Developer",
    description:
      "Professional portfolio of Agustin Cassani, a Full Stack JavaScript Developer with 17+ years of experience in web and mobile development.",
    url: "https://agustincassani.com",
    siteName: "Agustin Cassani",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Agustin Cassani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agustin Cassani | Full Stack JavaScript Developer",
    description:
      "Professional portfolio of Agustin Cassani, a Full Stack JavaScript Developer with 17+ years of experience in web and mobile development.",
    images: [
      {
        url: "/profile-image.jpeg",
        alt: "Agustin Cassani",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SeoJsonLd />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
