// Structured Data (JSON-LD) component for SEO
export default function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helper function to generate BlogPosting structured data
export function generateBlogStructuredData(blog, siteUrl) {
  const blogUrl = `${siteUrl}/blog/${blog.slug || blog.id}`;
  const imageUrl =
    blog.image &&
    (blog.image.startsWith("http://") || blog.image.startsWith("https://"))
      ? blog.image
      : `${siteUrl}/fmcg-removebg-preview.png`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description
      ? blog.description.replace(/<[^>]*>/g, "").substring(0, 200)
      : blog.title,
    image: imageUrl,
    datePublished: blog.createdAt,
    dateModified: blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "FMCG Influencer",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    articleSection: blog.category,
    keywords: [blog.category, blog.type, "FMCG", "Fast Moving Consumer Goods"],
  };
}

// Helper function to generate Website structured data
export function generateWebsiteStructuredData(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FMCG Influencer",
    url: siteUrl,
    description:
      "Expert insights, strategies, and daily updates for FMCG professionals, wholesalers, retailers, distributors, and aspirants.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Helper function to generate BreadcrumbList structured data
export function generateBreadcrumbStructuredData(items, siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

// Helper function to generate CollectionPage structured data for categories
export function generateCategoryStructuredData(category, siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} - FMCG Influencer`,
    description: `Browse ${category} articles and insights for FMCG professionals.`,
    url: `${siteUrl}/#blogs`,
    mainEntity: {
      "@type": "ItemList",
      name: category,
    },
  };
}
