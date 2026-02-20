import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saral Bajracharya | Full Stack Developer",
  description:
    "Personal portfolio of Saral Bajracharya — Full Stack Developer specializing in MERN stack, Next.js, and TypeScript. Building clean, performant, and scalable web applications.",
  keywords: [
    "Saral Bajracharya",
    "Full Stack Developer",
    "MERN",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Saral Bajracharya" }],
  openGraph: {
    title: "Saral Bajracharya | Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN stack, Next.js, and TypeScript.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
