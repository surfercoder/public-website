"use client"

export default function PdfViewer() {
  return (
    <div className="w-full h-[200vh] md:h-[180vh] overflow-y-auto">
      <iframe
        className="w-full h-full border border-gray-200 rounded-lg"
        src="/AgustinCassaniCV.pdf"
        style={{ minHeight: '200vh' }}
        title="Agustin Cassani CV"
      />
    </div>
  )
}
