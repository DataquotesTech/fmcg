import { Playfair_Display, Host_Grotesk } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Host_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fmcginfluencer.com";
const siteName = "FMCG Influencer";

export const metadata = {
  title: {
    default:
      "FMCG Influencer - Helping Influencers Build Their Brand & Community",
    template: "%s | FMCG Influencer",
  },
  description:
    "Expert insights, strategies, and daily updates for FMCG professionals, wholesalers, retailers, distributors, and aspirants. Build your brand and grow your community.",
  keywords: [
    "FMCG",
    "Fast Moving Consumer Goods",
    "FMCG blogs",
    "Professional Blogs",
    "Wholesaler Blogs",
    "Retailer Blogs",
    "Distributor Blogs",
    "Daily Updates",
    "FMCG industry insights",
    "Consumer goods",
  ],
  authors: [{ name: "FMCG Influencer" }],
  creator: "FMCG Influencer",
  publisher: "FMCG Influencer",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title:
      "FMCG Influencer - Helping Influencers Build Their Brand & Community",
    description:
      "Expert insights, strategies, and daily updates for FMCG professionals, wholesalers, retailers, distributors, and aspirants.",
    images: [
      {
        url: `${siteUrl}/fmcg-removebg-preview.png`,
        width: 1200,
        height: 630,
        alt: "FMCG Influencer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "FMCG Influencer - Helping Influencers Build Their Brand & Community",
    description:
      "Expert insights, strategies, and daily updates for FMCG professionals, wholesalers, retailers, distributors, and aspirants.",
    images: [`${siteUrl}/fmcg-removebg-preview.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-sans`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
