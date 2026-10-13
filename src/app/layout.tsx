
import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "NLETA | Engineering, Safety & Training",
    template: "%s | NLETA",
  },
  description:
    "Explore NLETA engineering services, lift and escalator safety, technical training, and digital governance.",
  metadataBase: new URL("https://www.nleta.org.in"),
  openGraph: {
    title: "NLETA | Engineering, Safety & Training",
    description:
      "Engineering services, safety awareness and skill development.",
    type: "website",
    siteName: "NLETA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
