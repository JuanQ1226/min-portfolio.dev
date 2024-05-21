import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { NextUIProvider } from "@nextui-org/react";
import NavBar from "@/components/Navbar";
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
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <NavBar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
