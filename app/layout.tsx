import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premsagar Deshmane",
  description: "Interactive 3D Portfolio of Premsagar Deshmane, a Creative Developer and AI Engineer.",
  // We can remove the explicit 'icons' block if we use the file convention above.
  // But keeping it as a fallback pointing to public is also fine.
  icons: {
    icon: "/profile.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}