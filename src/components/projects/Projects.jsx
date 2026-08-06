"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projectsData, projectCategories } from "../../data/projectsData";
import { imageUrl } from "@/lib/imageUrl";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import TagChip from "../ui/TagChip";
import {
  glassCard,
  glassCardHover,
  glassCardGlow,
  glassCardBorderGlow,
  bulletDot,
  premiumBtnPrimary,
  premiumBtnGhost,
  premiumBtnOutline,
} from "../ui/styles";
import { EASE_PREMIUM } from "../ui/motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_PREMIUM, delay: i * 0.08 },
  }),
};

const ProjectCard = ({ project, index, onOpenDetail }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
  });

  const stackTags = project.stack.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index}
      className={`${glassCard} ${glassCardHover} group flex flex-col m-3 md:m-0`}
      whileHover={{ y: -6, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className={glassCardGlow} />
      <div className={glassCardBorderGlow} />

      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-base-300">
        <img
          src={imageUrl(project.image)}
          alt={project.heading}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-200/90 via-base-200/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-lg font-bold tracking-tight text-base-content sm:text-xl">
          {project.heading}
        </h2>

        <div className="mb-3 mt-2 flex flex-wrap gap-1.5">
          {stackTags.slice(0, 4).map((tag, i) => (
            <TagChip key={tag} index={i} className="!text-[10px] sm:!text-xs">
              {tag}
            </TagChip>
          ))}
        </div>

        <ul className="mb-5 flex-1 space-y-2.5 text-sm text-base-content/70">
          {project.desc.slice(0, 3).map((item, i) => (
            <li key={i} className="flex gap-2.5">
              <span className={bulletDot} />
              <span className="line-clamp-2 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          <motion.a
            href={project.view}
            target="_blank"
            rel="noopener noreferrer"
            className={`${premiumBtnPrimary} flex-1 min-w-[7rem] !py-2.5 !text-xs sm:!text-sm`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Live Demo
          </motion.a>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${premiumBtnOutline} !py-2.5 !text-xs sm:!text-sm`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Code
            </motion.a>
          )}
          <motion.button
            type="button"
            onClick={() => onOpenDetail(project)}
            className={`${premiumBtnGhost} !py-2.5 !text-xs sm:!text-sm`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Details
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`relative mx-auto max-h-[90vh] w-full max-w-2xl overflow-hidden ${glassCard} shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-h-[90vh] overflow-y-auto">
            <div className="relative aspect-video shrink-0 overflow-hidden bg-base-300">
              <img
                src={imageUrl(project.image)}
                alt={project.heading}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 sm:p-7">
              <h2 className="mb-1 text-2xl font-bold">{project.heading}</h2>
              <p className="mb-4 font-mono text-sm text-base-content/60">
                {project.stack}
              </p>
              <ul className="mb-6 space-y-2.5 text-sm text-base-content/80">
                {project.desc.map((item, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className={bulletDot} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                <a
                  href={project.view}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={premiumBtnPrimary}
                >
                  View Live
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={premiumBtnOutline}
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-base-content/15 bg-base-200/60 backdrop-blur-sm transition-colors hover:bg-base-200/80"
            aria-label="Close"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [detailProject, setDetailProject] = useState(null);

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const openDetail = useCallback((project) => setDetailProject(project), []);
  const closeDetail = useCallback(() => setDetailProject(null), []);

  return (
    <Section id="projects" ariaLabelledby="projects-heading">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          eyebrow="Portfolio"
          title="Services &"
          titleAccent="Projects"
          subtitle="Selected full-stack and frontend work — MERN, Next.js, React, and more. Filter by category to explore."
        />
        <h2 id="projects-heading" className="sr-only">
          Services and Projects
        </h2>

        <motion.div
          className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, ease: EASE_PREMIUM }}
        >
          {projectCategories.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all ${
                activeCategory === cat.id
                  ? "border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-base-content shadow-md shadow-cyan-500/10"
                  : "border-base-content/10 bg-base-200/20 text-base-content/60 hover:border-base-content/20 hover:bg-base-200/40"
              }`}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenDetail={openDetail}
                />
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 text-center text-base-content/60"
              >
                No projects in this category yet.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {detailProject ? (
            <ProjectDetailModal
              key={detailProject.id}
              project={detailProject}
              onClose={closeDetail}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default Projects;
