import type { Metadata } from "next";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";

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
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Inter:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
