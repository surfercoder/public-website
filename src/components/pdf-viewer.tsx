"use client"

export default function PdfViewer() {
  return (
    <div className="w-full">
      <iframe
        src="/AgustinCassaniCV.pdf"
        className="w-full h-screen border border-gray-200 rounded-lg"
        title="My Resume"
      />
    </div>
  )
}
