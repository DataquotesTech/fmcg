import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FMCG Influencer - Helping Influencers Build Their Brand & Community",
  description:
    "Inspiration and insights for creators, thinkers, and innovators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
