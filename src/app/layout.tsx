import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nleta.org.in"),

  title: {
    default: "NLETA | Engineering, Safety & Training",
    template: "%s | NLETA",
  },

  description:
    "Explore NLETA engineering services, lift and escalator safety, technical training, and digital governance.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "NLETA | Engineering, Safety & Training",
    description:
      "Engineering services, safety awareness and skill development.",
    type: "website",
    siteName: "NLETA",
    url: "https://www.nleta.org.in",
    images: [
      {
        url: "/nleta-logo.jpg",
        alt: "NLETA Logo",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "NLETA | Engineering, Safety & Training",
    description:
      "Engineering services, safety awareness and skill development.",
    images: ["/nleta-logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
