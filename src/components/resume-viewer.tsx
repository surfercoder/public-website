"use client"

import dynamic from "next/dynamic"

export default function ResumeViewer() {
  // Dynamically import the PDF viewer only on the client
  const PdfViewer = dynamic(() => import("@/components/pdf-viewer"), { ssr: false })
  return <PdfViewer />
}
