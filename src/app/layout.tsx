import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prodyogiki '26 · ISTE NIT Hamirpur",
  description: "The annual technical festival of NIT Hamirpur.",
  keywords: ["prodyogiki", "prody", "ISTE", "NIT Hamirpur", "technical festival"],
  openGraph: {
    title: "Prodyogiki '26",
    description: "The annual technical festival of NIT Hamirpur.",
    url: "https://prodyogiki.nith.ac.in",
    siteName: "Prodyogiki '26",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prodyogiki '26",
    description: "The annual technical festival of NIT Hamirpur.",
  },
  icons: {
    icon: "/icon.webp",
    apple: "/icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          background: "var(--bg-primary)",
          color: "var(--foreground)",
          minHeight: "100vh",
          width: "100%",
          overflow: "auto",
        }}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
