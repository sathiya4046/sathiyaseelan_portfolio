import type { Metadata } from "next";
import Projects from "@/components/projects/Projects";

const title = "Services & Projects";
const description =
  "Selected full-stack and frontend work — MERN, Next.js, React, and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${title} | Sathiyaseelan Portfolio`,
    description,
    url: "/services",
  },
};

export default function ServicesPage() {
  return <Projects />;
}
