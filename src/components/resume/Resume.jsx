import React, { useState, useEffect } from "react";
import pdf from "../../assets/updated resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

function Resume() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className="flex flex-col items-center py-28 lg:pt-52">
      <div className="mb-4">
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-soft flex items-center max-w-xs hover:underline"
        >
          <AiOutlineDownload />
          <span className="ml-2">Download CV</span>
        </a>
      </div>

      <div className="mb-4">
        <Document file={pdf} className="flex justify-center">
          <Page pageNumber={1} scale={width > 900 ? 1.3 : 0.6} renderTextLayer={false} 
            renderAnnotationLayer={false}/>
        </Document>
        <Document file={pdf} className="flex justify-center">
          <Page pageNumber={2} scale={width > 900 ? 1.3 : 0.6} renderTextLayer={false} 
            renderAnnotationLayer={false}/>
        </Document>
      </div>

      <div>
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-soft flex items-center max-w-xs hover:underline"
        >
          <AiOutlineDownload />
          <span className="ml-2">Download CV</span>
        </a>
      </div>
    </div>
  );
}

export default Resume;
