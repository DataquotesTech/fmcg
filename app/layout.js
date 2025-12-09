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
const siteName = "FMCGInfluencer.com";

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
      "FMCGInfluencer.com - India’s trusted platform for FMCG talent, brands, and business solutions.",
    template: "%s | FMCGInfluencer.com",
  },
  description:
    "India’s trusted platform for FMCG talent, brands, and business solutions.",
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
  authors: [{ name: "FMCGInfluencer.com" }],
  creator: "FMCGInfluencer.com",
  publisher: "FMCGInfluencer.com",
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
      "FMCGInfluencer.com - India’s trusted platform for FMCG talent, brands, and business solutions.",
    description:
      "India’s trusted platform for FMCG talent, brands, and business solutions.",
    images: [
      {
        url: `${siteUrl}/fmcg-removebg-preview.png`,
        width: 1200,
        height: 630,
        alt: "FMCGInfluencer.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "FMCGInfluencer.com - India’s trusted platform for FMCG talent, brands, and business solutions.",
    description:
      "India’s trusted platform for FMCG talent, brands, and business solutions.",
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
      <head suppressHydrationWarning>
        {/* Gatekeeper Consent Management Scripts */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://cmp.gatekeeperconsent.com/min.js"
          data-cfasync="false"
          suppressHydrationWarning
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          data-cfasync="false"
          suppressHydrationWarning
        />
        {/* Ezoic Script */}
        <script
          src="//www.ezojs.com/ezoic/sa.min.js"
          async
          suppressHydrationWarning
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
            `,
          }}
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-sans relative`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
