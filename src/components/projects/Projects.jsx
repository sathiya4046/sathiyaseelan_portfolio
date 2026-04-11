"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projectsData, projectCategories } from "../../data/projectsData";
import { imageUrl } from "@/lib/imageUrl";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      delay: i * 0.08,
    },
  }),
};

const ProjectCard = ({ project, index, onOpenDetail }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px",
  });

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-base-300 bg-base-200/50 shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden bg-base-300">
        <motion.img
          src={imageUrl(project.image)}
          alt={project.heading}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-200/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-lg font-bold tracking-tight md:text-xl">
          {project.heading}
        </h2>
        <p className="mb-3 font-mono text-xs text-base-content/70">
          {project.stack}
        </p>

        <ul className="mb-4 flex-1 space-y-1.5 text-sm text-base-content/80">
          {project.desc.slice(0, 3).map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span className="line-clamp-2">{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          <motion.a
            href={project.view}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm flex-1 min-w-0"
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
              className="btn btn-outline btn-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Code
            </motion.a>
          )}
          <motion.button
            type="button"
            onClick={() => onOpenDetail(project)}
            className="btn btn-ghost btn-sm"
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
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-2xl"
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
            <div className="p-6">
              <h2 className="mb-1 text-2xl font-bold">{project.heading}</h2>
              <p className="mb-4 font-mono text-sm text-base-content/70">
                {project.stack}
              </p>
              <ul className="mb-6 space-y-2 text-sm text-base-content/90">
                {project.desc.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                <a
                  href={project.view}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Live
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
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
            className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
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

  const filteredProjects = activeCategory === "all"
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const openDetail = useCallback((project) => setDetailProject(project), []);
  const closeDetail = useCallback(() => setDetailProject(null), []);

  return (
    <section className="mx-auto w-full max-w-8xl px-4 py-20  lg:py-34">

      <motion.div
        className="mb-10 flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {projectCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`btn btn-sm ${
              activeCategory === cat.id ? "btn-primary" : "btn-ghost"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
              className="col-span-full py-12 text-center text-base-content/70"
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
    </section>
  );
};

export default Projects;
