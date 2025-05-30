import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"
import pdf from "./FSD.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function Resume() {
  const [width, setWidth] = useState(1200);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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

  const downloadVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const pageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center py-28 lg:pt-40"
    >
      <motion.div 
        className="mb-4"
        variants={downloadVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-soft flex items-center max-w-xs hover:underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AiOutlineDownload />
          <span className="ml-2">Download CV</span>
        </motion.a>
      </motion.div>

      <div className="mb-4">
        <Document file={pdf} className="flex justify-center">
          <motion.div
            variants={pageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Page 
              pageNumber={1} 
              scale={width > 900 ? 1.3 : 0.6} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </motion.div>
        </Document>
        
        {/* <Document file={pdf} className="flex justify-center mt-4">
          <motion.div
            variants={pageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <Page 
              pageNumber={2} 
              scale={width > 900 ? 1.3 : 0.6} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </motion.div>
        </Document> */}
      </div>

      <motion.div 
        className="mt-4"
        variants={downloadVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 0.4 }}
      >
        <motion.a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-soft flex items-center max-w-xs hover:underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AiOutlineDownload />
          <span className="ml-2">Download CV</span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default Resume;
