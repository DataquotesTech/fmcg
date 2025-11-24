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

const seoKeywords = [
  "FMCG industry trends",
  "FMCG marketing strategy",
  "General trade vs modern trade",
  "Rural marketing FMCG",
  "FMCG distribution channels",
  "Retailer margin FMCG",
  "FMCG supply chain",
  "Consumer behaviour FMCG",
  "FMCG sales techniques",
  "Why ₹1 sachets work",
  "FMCG product placement",
  "In-store promotion FMCG",
  "Merchandising FMCG",
  "FMCG pricing strategy",
  "Trade promotions FMCG",
  "FMCG demand generation",
  "FMCG branding",
  "D2C FMCG brands",
  "E-commerce FMCG growth",
  "FMCG packaging strategy",
  "FMCG inventory management",
  "FMCG distributor management",
  "FMCG retail execution",
  "Visibility drives FMCG",
  "Beat plan for FMCG",
  "FMCG sales KPIs",
  "FMCG retail audit",
  "Modern trade activation FMCG",
  "FMCG market research",
  "FMCG digital marketing",
  "FMCG influencer marketing",
  "Rural distribution FMCG",
  "FMCG product sampling",
  "MT vs GT FMCG",
  "FMCG outlet coverage",
  "FMCG planogram",
  "Secondary sales FMCG",
  "Primary sales FMCG",
  "FMCG sales funnel",
  "Perfect store FMCG",
  "FMCG retailer loyalty",
  "New product launch FMCG",
  "FMCG pricing psychology",
  "Consumer promotions FMCG",
  "General trade FMCG",
  "Distributor ROI FMCG",
  "FMCG territory planning",
  "FMCG sales forecast",
  "Seasonality in FMCG",
  "FMCG POS materials",
  "Trade marketing FMCG",
  "FMCG social media strategy",
  "FMCG competition analysis",
  "FMCG market share",
  "FMCG wholesale market",
  "FMCG GTM strategy",
  "Rural consumer insights",
  "FMCG value packs",
  "Supermarket promotions FMCG",
  "Retail expansion FMCG",
  "Emerging FMCG trends India",
  "FMCG logistics India",
  "Semi-urban FMCG growth",
  "FMCG category management",
  "Impulse buying FMCG",
  "FMCG store activation",
  "Retail schemes FMCG",
  "Shelf share FMCG",
  "FMCG outlet classification",
  "Retail analytics FMCG",
  "Brand building FMCG",
  "Shopper marketing FMCG",
  "Distributor onboarding FMCG",
  "FMCG beat optimisation",
  "FMCG route-to-market",
  "Channel conflict FMCG",
  "Visibility budget FMCG",
  "General trade challenges",
  "Rural market potential FMCG",
  "FMCG field sales tips",
  "FMCG lead generation",
  "Consumer insights FMCG",
  "E-commerce FMCG discounts",
  "FMCG brand loyalty",
  "FMCG assortment planning",
  "Retailer relationship FMCG",
  "FMCG demand planning",
  "Brand visibility FMCG",
  "FMCG growth drivers",
  "Emerging brands FMCG",
  "FMCG innovation India",
  "Food FMCG trends",
  "Personal care FMCG trends",
  "Household FMCG category",
  "Beverage FMCG strategy",
  "Organic FMCG products",
  "Sustainable FMCG packaging",
  "Low-unit packs FMCG",
];

export const metadata = {
  title: {
    default:
      "FMCG Influencer - Helping Influencers Build Their Brand & Community",
    template: "%s | FMCG Influencer",
  },
  description:
    "Expert strategies and Insights for FMCG professionals, trade partners, engagements, distributors, and aspirants. Build your brand and grow your community.",
  keywords: [
    "FMCG",
    "Fast Moving Consumer Goods",
    "FMCG blogs",
    "Professional Blogs",
    "Trade Partners Blogs",
    "Engagements",
    "Distributor Blogs",
    "Insights",
    "FMCG industry insights",
    "Consumer goods",
    ...seoKeywords,
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
      "Expert strategies and Insights for FMCG professionals, trade partners, engagements, distributors, and aspirants.",
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
      "Expert strategies and Insights for FMCG professionals, trade partners, engagements, distributors, and aspirants.",
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
        className={`${playfairDisplay.variable} ${inter.variable} font-sans relative`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
