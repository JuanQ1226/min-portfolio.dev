import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingResumeButton from "@/components/FloatingResumeButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Juan Quintana",
  description:
    "Juan Quintana - Software Engineer. Portfolio showcasing projects, experience, and skills.",
  openGraph: {
    title: "Juan Quintana",
    description:
      "Software Engineer. Portfolio showcasing projects, experience, and skills.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Juan Quintana",
    description:
      "Software Engineer. Portfolio showcasing projects, experience, and skills.",
  },
  authors: [{ name: "Juan Quintana" }],
  keywords: [
    "software engineer",
    "portfolio",
    "web development",
    "react",
    "next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingResumeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
