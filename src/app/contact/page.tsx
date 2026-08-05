import type { Metadata } from "next";
import Contact from "@/components/contact/Contact";

const title = "Contact";
const description =
  "Get in touch with Sathiyaseelan — full stack developer. Email, social links, and contact form.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} | Sathiyaseelan Portfolio`,
    description,
    url: "/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}
