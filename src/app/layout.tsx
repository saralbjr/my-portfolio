import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CosmicBackground from "@/components/CosmicBackground";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saral Bajracharya | Portfolio",
  description:
    "Professional portfolio of Saral Bajracharya — SEO Specialist & Digital Marketing Strategist. Helping brands grow search traffic, improve keyword rankings, and scale conversions.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: [
    "Saral Bajracharya",
    "SEO Larner",
    "Digital Marketer",
    "Search Engine Optimization",
    "Technical SEO Audits",
    "Local SEO Consultant",
    "Digital Marketing Strategy",
    "Growth Consultant Portfolio",
  ],
  authors: [{ name: "Saral Bajracharya" }],
  openGraph: {
    title: "Saral Bajracharya | SEO & Digital Marketing Learner",
    description:
      "SEO & Digital Marketing Learner. Scaling brand visibility, organic search metrics, and user engagement.",
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
        <ScrollProgressBar />
        <CustomCursor />
        <CosmicBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <Script src="/ai-chat-widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
