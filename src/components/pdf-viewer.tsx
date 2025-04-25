"use client"

export default function PdfViewer() {
  return (
    <div className="w-full h-[calc(100vh*2)]">
      <iframe
        className="w-full h-full border border-gray-200 rounded-lg"
        src="/AgustinCassaniCV.pdf"
        title="Agustin Cassani CV"
      />
    </div>
  )
}
