import Contact from "@/components/contact/Contact";

const title = "Contact";
const description =
  "Get in touch with Sathiyaseelan — full stack developer. Email, social links, and contact form.";

export const metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Sathiyaseelan Portfolio`,
    description,
    url: "/contact",
  },
};

export default function ContactPage() {
  return <Contact />;
}
