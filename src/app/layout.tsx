import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import "./globals.css";

export const preferredRegion = ['sin1'];
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://hakimiindustrial.com'),
  title: {
    default: "Hakimi Industrial Products",
    template: "%s | Hakimi Industrial Products"
  },
  description: "Premium industrial storage solutions, dustbins, crates, and pallets engineered for durability and efficiency. Your trusted partner for industrial organization.",
  keywords: ["Industrial Storage", "Plastic Crates", "Dustbins", "Pallets", "FPO Bins", "Waste Management", "Logistics", "Warehouse Solutions", "Secunderabad"],
  authors: [{ name: "Hakimi Industrial Products" }],
  creator: "Hakimi Industrial Products",
  publisher: "Hakimi Industrial Products",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Hakimi Industrial Products",
    description: "Premium industrial storage solutions, dustbins, and crates.",
    url: 'https://hakimiindustrial.com',
    siteName: 'Hakimi Industrial Products',
    images: [
      {
        url: '/images/logo.png', // Assuming logo is good for OG, or a specific OG image
        width: 800,
        height: 600,
        alt: 'Hakimi Industrial Products Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hakimi Industrial Products",
    description: "Premium industrial storage solutions, dustbins, and crates.",
    images: ['/images/logo.png'], // Fallback to logo
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} flex flex-col min-h-screen bg-background text-foreground antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
