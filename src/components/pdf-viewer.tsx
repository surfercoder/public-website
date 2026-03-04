"use client"

import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useSyncExternalStore } from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getPageWidth() {
  return window.innerWidth > 700 ? 600 : window.innerWidth - 30;
}

/* istanbul ignore next -- server snapshot for SSR */
function getPageWidthServer() {
  return 800;
}

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const pageWidth = useSyncExternalStore(subscribeToResize, getPageWidth, getPageWidthServer);
  
  return (
    <div className="pdf-container">
      <Document
        file="/AgustinCassaniCV.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page 
            key={`page_${index + 1}`} 
            pageNumber={index + 1} 
            width={pageWidth}
          />
        ))}
      </Document>
    </div>
  );
}
