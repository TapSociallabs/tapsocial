import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "TapSocial — Your identity. One tap away.",
  description:
    "Turn followers into real connections with TapSocial profiles built to convert.",
  openGraph: {
    title: "TapSocial — One Tap. All You.",
    description: "Turn followers into real connections.",
    url: "https://www.tapsocial.me",
    siteName: "TapSocial",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TapSocial — Your identity. One tap away.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@tapsocial",
    images: ["/og-default.png"],
  },
};
