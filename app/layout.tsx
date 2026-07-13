import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d0a1a",
};

export const metadata: Metadata = {
  title: "Adarsh Alex Balmuchu",
  description: "Marketer by craft. Entrepreneur by instinct. Always building something worth noticing.",
  openGraph: {
    title: "Adarsh Alex Balmuchu",
    description: "Marketer by craft. Entrepreneur by instinct. Always building something worth noticing.",
    url: "https://adarshalexbalmuchu.github.io",
    siteName: "Adarsh Alex Balmuchu",
    images: [
      {
        url: "https://adarshalexbalmuchu.github.io/about-me.webp",
        width: 1200,
        height: 630,
        alt: "Adarsh Alex Balmuchu",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Alex Balmuchu",
    description: "Marketer by craft. Entrepreneur by instinct. Always building something worth noticing.",
    images: ["https://adarshalexbalmuchu.github.io/about-me.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col">
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
