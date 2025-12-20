import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Premsagar Deshmane | Frontend & AI Engineer",
    template: "%s | Premsagar Deshmane",
  },

  description:
    "Premsagar Deshmane is a Computer Engineering student and Frontend & AI Engineer building reliable, well-designed systems and intelligent web experiences.",

  keywords: [
    "Premsagar Deshmane",
    "Frontend Engineer",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "Computer Engineering Student",
    "Portfolio Website",
  ],

  authors: [{ name: "Premsagar Deshmane" }],
  creator: "Premsagar Deshmane",

  icons: {
    icon: "/profile.png",
  },

  openGraph: {
    type: "website",
    url: "https://yourdomain.com",
    siteName: "Premsagar Deshmane",
    title: "Premsagar Deshmane | Frontend & AI Engineer",
    description:
      "Portfolio of Premsagar Deshmane — Frontend, AI, and system-focused engineering.",
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

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Premsagar Deshmane",
              url: "https://yourdomain.com",
              jobTitle: "Frontend & AI Engineer",
              sameAs: [
                "https://www.linkedin.com/in/your-linkedin",
                "https://github.com/your-github",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "SNJB College of Engineering",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
