import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#C2185B",
};

export const metadata: Metadata = {
  title: "SliceUp — Premium Dried Fruits",
  description: "Premium dehydrated fruits and vegetables from Cyprus. No sugar added, no preservatives. Pure nature, sliced to perfection.",
  keywords: ["dried fruits", "dehydrated", "premium snacks", "Cyprus", "healthy", "SliceUp"],
  authors: [{ name: "SliceUp" }],
  icons: { icon: "/favicon.ico" },
  manifest: "/manifest.json",
  openGraph: {
    title: "SliceUp — Premium Dried Fruits",
    description: "Premium dehydrated fruits and vegetables from Cyprus. Pure nature, sliced to perfection.",
    url: "https://sliceup.cy",
    siteName: "SliceUp",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SliceUp — Premium Dried Fruits" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SliceUp — Premium Dried Fruits",
    description: "Premium dehydrated fruits and vegetables from Cyprus.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
