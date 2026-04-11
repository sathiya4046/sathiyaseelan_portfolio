import "./globals.css";
import AppShell from "@/components/AppShell";

const defaultTitle = "Sathiyaseelan | Full Stack Developer Portfolio";
const defaultDescription =
  "Sathiyaseelan — Full Stack Web Developer. Portfolio with React, Node.js projects. Available for hire.";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Sathiyaseelan Portfolio",
  },
  description: defaultDescription,
  keywords: [
    "Full Stack Developer",
    "Frontend",
    "React",
    "Node.js",
    "Web Developer",
    "Portfolio",
    "Sathiyaseelan",
  ],
  authors: [{ name: "Sathiyaseelan" }],
  creator: "Sathiyaseelan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Sathiyaseelan Portfolio",
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/SS-icon.svg",
  },
  other: {
    "theme-color": "#0f172a",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sathiyaseelan",
  description: defaultDescription,
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com/in/sathiya4046/",
    "https://github.com/sathiya4046",
    "https://www.instagram.com/_sathiya_4046",
    "https://www.facebook.com/sathiya.s.mech",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
