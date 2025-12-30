import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://your-project-name.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Premsagar Deshmane | Computer Engineering Student & Frontend Engineer",
    template: "%s | Premsagar Deshmane",
  },

  description:
    "Official portfolio of Premsagar Deshmane, a Computer Engineering student and Frontend & AI Engineer building reliable, performance-focused, and well-designed web systems.",

  keywords: [
    "Premsagar Deshmane",
    "Premsagar Deshmane Portfolio",
    "Frontend Engineer",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "Computer Engineering Student",
  ],

  authors: [{ name: "Premsagar Deshmane" }],
  creator: "Premsagar Deshmane",

  icons: {
    icon: "/profile.png",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Premsagar Deshmane",
    title: "Premsagar Deshmane | Frontend & AI Engineer",
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
