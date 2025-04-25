"use client"

import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect } from 'react';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(800);
  
  useEffect(() => {
    setPageWidth(window.innerWidth > 700 ? 600 : window.innerWidth - 30);
  }, []);
  
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
