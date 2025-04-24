import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import PdfViewer from "@/components/pdf-viewer"

export const metadata: Metadata = {
  title: "Resume | Agustin Cassani",
  description: "Professional resume of Agustin Cassani, Full Stack JavaScript Developer with 17+ years of experience.",
}

export default function ResumePage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Resume</h1>
            <p className="text-gray-600 dark:text-gray-400">View and download my professional resume</p>
          </div>

          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <Button asChild>
              <a href="/AgustinCassaniCV.pdf" download className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <PdfViewer />
        </div>
      </div>
    </main>
  )
}
