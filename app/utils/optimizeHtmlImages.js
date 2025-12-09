// Utility function to optimize images in HTML content
export function optimizeHtmlImages(html) {
  if (!html) return html;

  // Add loading="lazy", decoding="async", and fetchpriority="high" for first image
  let imageCount = 0;

  return html.replace(/<img([^>]*)>/gi, (match, attributes) => {
    imageCount++;

    // Skip if already has loading attribute
    if (attributes.includes("loading=")) {
      return match;
    }

    // Add loading="lazy" for all images except the first one
    const loadingAttr = imageCount === 1 ? 'loading="eager"' : 'loading="lazy"';

    // Add decoding="async" for better performance
    const decodingAttr = attributes.includes("decoding=")
      ? ""
      : 'decoding="async"';

    // Add fetchpriority for first image
    const fetchPriorityAttr = imageCount === 1 ? 'fetchpriority="high"' : "";

    // Combine attributes
    const newAttributes = [
      attributes.trim(),
      loadingAttr,
      decodingAttr,
      fetchPriorityAttr,
    ]
      .filter(Boolean)
      .join(" ");

    return `<img ${newAttributes}>`;
  });
}
