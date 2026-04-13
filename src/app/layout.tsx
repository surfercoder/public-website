import type React from "react"
import "@/app/globals.css"
import "@/app/critical.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/navbar"
import SeoJsonLd from "@/components/seo-jsonld"
import PerformanceMonitor from "@/components/performance-monitor"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"]
})

export const metadata: Metadata = {
  title: "Agustin Cassani | Senior Software Engineer & Technical Leader",
  description: "Professional portfolio of Agustin Cassani, a Senior Software Engineer & Technical Leader with 18+ years of experience in web, mobile, and AI-powered solutions.",
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
    title: "Agustin Cassani | Senior Software Engineer & Technical Leader",
    description:
      "Professional portfolio of Agustin Cassani, a Senior Software Engineer & Technical Leader with 18+ years of experience in web, mobile, and AI-powered solutions.",
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
    title: "Agustin Cassani | Senior Software Engineer & Technical Leader",
    description:
      "Professional portfolio of Agustin Cassani, a Senior Software Engineer & Technical Leader with 18+ years of experience in web, mobile, and AI-powered solutions.",
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
        <PerformanceMonitor />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
