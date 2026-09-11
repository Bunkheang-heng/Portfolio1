import type { Metadata, Viewport } from "next";
import { Poppins, Sora, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name}'s Portfolio`,
  description: `${site.name} is a ${site.role} based in ${site.location}.`,
  keywords: [site.name, site.role, "Portfolio", site.location],
  authors: [{ name: site.name }],
  icons: {
    icon: "/imgs/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1d1d1d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${poppins.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="stylesheet" href="/css/plugins.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body className={`sub-bg ${sora.className}`}>{children}</body>
    </html>
  );
}
