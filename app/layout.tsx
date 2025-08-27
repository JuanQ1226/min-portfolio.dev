import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingResumeButton from "@/components/FloatingResumeButton";

export const metadata: Metadata = {
  title: "Juan Quintana",
  description: "Juan Quintana's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Footer />
          <FloatingResumeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
