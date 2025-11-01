import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/ripple.css";
import CodeCatcher from "./CodeCatcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TapSocial \u2014 Your identity. One tap away.",
  description: "Turn followers into real connections with TapSocial.",
  metadataBase: new URL("https://www.tapsocial.me"),
  openGraph: {
    title: "TapSocial \u2014 One Tap. All You.",
    description: "Turn followers into real connections.",
    url: "https://www.tapsocial.me",
    siteName: "TapSocial",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CodeCatcher />
        {children}
      </body>
    </html>
  );
}
