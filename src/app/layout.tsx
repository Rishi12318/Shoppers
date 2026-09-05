import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Amritsari's — Authentic Punjabi Fashion",
    template: "%s | The Amritsari's",
  },
  description:
    "Premium Punjabi suits, juttis, phulkari, and ethnic wear handcrafted from Amritsar. Shop authentic Punjab aesthetics with AI-powered tailoring consultation.",
  keywords: [
    "Punjabi suit",
    "phulkari",
    "jutti",
    "Amritsar fashion",
    "ethnic wear",
    "Indian fashion",
    "custom tailoring",
    "Punjab",
  ],
  authors: [{ name: "The Amritsari's" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The Amritsari's",
    title: "The Amritsari's — Authentic Punjabi Fashion",
    description:
      "Premium Punjabi suits, juttis, phulkari, and ethnic wear handcrafted from Amritsar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#2c1a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
