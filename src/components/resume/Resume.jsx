"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import pdf from "./FSD.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import { glassCard, premiumBtnPrimary } from "../ui/styles";
import { fadeUpItem, fadeUpStagger } from "../ui/motion";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Resume() {
  const [width, setWidth] = useState(1200);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const DownloadBtn = ({ delay = 0 }) => (
    <motion.a
      href={pdf}
      target="_blank"
      rel="noopener noreferrer"
      className={`${premiumBtnPrimary} gap-2`}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      variants={fadeUpItem}
      custom={delay}
    >
      <AiOutlineDownload className="text-lg" />
      <span>Download CV</span>
    </motion.a>
  );

  return (
    <Section id="resume" ariaLabelledby="resume-heading">
      <motion.div
        ref={ref}
        className="mx-auto flex w-full max-w-4xl flex-col items-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeUpStagger}
      >
        <SectionHeader
          eyebrow="Curriculum Vitae"
          title="My"
          titleAccent="Resume"
          subtitle="Download or preview my full-stack development credentials and professional background."
        />
        <h2 id="resume-heading" className="sr-only">
          Resume
        </h2>

        <motion.div className="mb-6" variants={fadeUpItem}>
          <DownloadBtn />
        </motion.div>

        <motion.div
          className={`w-full overflow-hidden ${glassCard} p-4 sm:p-6`}
          variants={fadeUpItem}
        >
          <Document file={pdf} className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 14 }}
            >
              <Page
                pageNumber={1}
                scale={width > 900 ? 1.2 : width > 600 ? 0.8 : 0.55}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </motion.div>
          </Document>
        </motion.div>

        <motion.div className="mt-6" variants={fadeUpItem}>
          <DownloadBtn />
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default Resume;
