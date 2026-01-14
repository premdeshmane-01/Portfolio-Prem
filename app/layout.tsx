import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import the ChatWidget here
import ChatWidget from "./components/ChatWidget"; 

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://portfolio-prem-4m65.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

title: {
    default: "Prem Deshmane",
    template: "%s | Premsagar Deshmane",
  },

  description:
    "Portfolio of Premsagar Deshmane (Prem), a Frontend Engineer and Data Scientist specializing in AI, Machine Learning, and MERN Stack development.",

keywords: [
    "Premsagar Deshmane",
    "Prem Deshmane",
    "Prem Portfolio",
    "Deshmane Portfolio",
    "Frontend Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "MERN Stack Developer",
    "React Developer India",
    "Next.js Developer",
    "Software Engineer Portfolio"
  ],

  authors: [{ name: "Premsagar Deshmane" }],
  creator: "Premsagar Deshmane",

  // ❌ DELETED: The 'icons' section is removed.
  // Next.js will now automatically look for 'icon.png' in your app/ folder.

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Prem Deshmane",
    title: "Premsagar Deshmane | Frontend & Data Scientist ",
    description:
      "Portfolio of Premsagar Deshmane — frontend engineering, AI systems, and modern web architecture.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Premsagar Deshmane Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Premsagar Deshmane | Frontend & AI Engineer",
    description:
      "Frontend & AI Engineer building reliable systems and intelligent web experiences.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {children}

        {/* 2. Add the Widget here so it appears on all pages */}
        <ChatWidget />

        {/* Structured Data: Personal Identity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Premsagar Deshmane",
              url: SITE_URL,
              jobTitle: "Computer Engineering Student & Frontend Engineer",
              sameAs: [
                "https://www.linkedin.com/in/prem-deshmane01",
                "https://github.com/premdeshmane-01",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "SNJB College of Engineering (SPPU)",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}