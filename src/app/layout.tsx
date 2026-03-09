import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    description: "Full Stack Developer specializing in MERN stack, Next.js, and TypeScript.",
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
      <body className={`${poppins.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
