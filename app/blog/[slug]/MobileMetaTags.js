"use client";

import { useEffect } from "react";

export default function MobileMetaTags({ imageUrl, title, description, url }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Function to update or create meta tag
    const updateMetaTag = (property, content, isProperty = true) => {
      const selector = isProperty
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) {
          tag.setAttribute("property", property);
        } else {
          tag.setAttribute("name", property);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Ensure image URL is absolute for mobile sharing
    const absoluteImageUrl = imageUrl?.startsWith("http")
      ? imageUrl
      : `${window.location.origin}${
          imageUrl?.startsWith("/") ? "" : "/"
        }${imageUrl}`;

    // Add/update Open Graph tags for mobile sharing compatibility
    if (absoluteImageUrl) {
      updateMetaTag("og:image", absoluteImageUrl);
      updateMetaTag("og:image:url", absoluteImageUrl);
      updateMetaTag("og:image:secure_url", absoluteImageUrl);
      updateMetaTag("og:image:width", "1200");
      updateMetaTag("og:image:height", "630");
      updateMetaTag(
        "og:image:type",
        absoluteImageUrl.match(/\.png$/i) ? "image/png" : "image/jpeg"
      );
    }

    if (title) {
      updateMetaTag("og:title", title);
    }

    if (description) {
      updateMetaTag("og:description", description);
    }

    if (url) {
      updateMetaTag("og:url", url);
    }

    // Twitter Card tags for mobile
    if (absoluteImageUrl) {
      updateMetaTag("twitter:image", absoluteImageUrl, false);
      updateMetaTag("twitter:image:src", absoluteImageUrl, false);
    }

    // Additional tags for WhatsApp and other mobile apps
    updateMetaTag("og:type", "article");
    updateMetaTag("og:site_name", "FMCG Influencers");
  }, [imageUrl, title, description, url]);

  return null;
}
