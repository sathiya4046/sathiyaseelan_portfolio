import Home from "@/components/home/Home";

const title = "Home";
const description =
  "Full Stack Web Developer — React, Node.js, modern web. Skills, experience, and projects.";

export const metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Sathiyaseelan Portfolio`,
    description,
    url: "/",
  },
};

export default function HomePage() {
  return <Home />;
}
