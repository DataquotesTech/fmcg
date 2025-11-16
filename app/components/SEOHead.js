"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Client component to update document title and meta tags for category pages
// Since the homepage is a client component, we use this to update SEO dynamically
export default function SEOHead({ category, description }) {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fmcg-influencer.com";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Update document title
    if (category) {
      document.title = `${category} | FMCG Influencer`;
    }

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      description ||
        `Browse ${category} articles and insights for FMCG professionals. Expert strategies and daily updates.`
    );

    // Update Open Graph tags
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    if (category) {
      updateOGTag("og:title", `${category} | FMCG Influencer`);
      updateOGTag(
        "og:description",
        description ||
          `Browse ${category} articles and insights for FMCG professionals.`
      );
      updateOGTag("og:url", `${siteUrl}${pathname}`);
      updateOGTag("og:type", "website");
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${siteUrl}${pathname}`);
  }, [category, description, pathname, siteUrl]);

  return null;
}

