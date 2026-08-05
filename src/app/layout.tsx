import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Comfortaa,
  Josefin_Sans,
  Julius_Sans_One,
  Protest_Revolution,
} from "next/font/google";
import AppShell from "@/components/AppShell";
import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-family-comfortaa",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-family-josefin",
  display: "swap",
  weight: ["200", "400", "600"],
});

const sansOne = Julius_Sans_One({
  subsets: ["latin"],
  variable: "--font-family-sans-one",
  display: "swap",
  weight: "400",
});

const protest = Protest_Revolution({
  subsets: ["latin"],
  variable: "--font-family-protest",
  display: "swap",
  weight: "400",
});

const defaultTitle = "Sathiyaseelan | Full Stack Developer Portfolio";
const defaultDescription =
  "Sathiyaseelan — Full Stack Web Developer specializing in React, Next.js, and Node.js. Available for hire.";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://sathiya4046.github.io"
).replace(/\/$/, "");

export const metadata: Metadata = {
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
    "Next.js",
    "Node.js",
    "AWS",
    "Web Developer",
    "Portfolio",
    "Sathiyaseelan",
  ],
  authors: [{ name: "Sathiyaseelan" }],
  creator: "Sathiyaseelan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sathiyaseelan Portfolio",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/aws-certified-solutions-architect-associate.png",
        width: 1200,
        height: 630,
        alt: "Sathiyaseelan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/aws-certified-solutions-architect-associate.png"],
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
  jobTitle: "Full Stack Web Developer",
  sameAs: [
    "https://www.linkedin.com/in/sathiya4046/",
    "https://github.com/sathiya4046",
    "https://www.instagram.com/_sathiya_4046",
    "https://www.facebook.com/sathiya.s.mech",
  ],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","light");}}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${comfortaa.variable} ${josefin.variable} ${sansOne.variable} ${protest.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-base-100 font-comfortaa text-base-content antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-base-100 focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to content
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
