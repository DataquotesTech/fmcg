import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getBlogBySlug } from "../../data/mockData";
import BlogImage from "./BlogImage";
import BlogContent from "./BlogContent";
import StructuredData, {
  generateBlogStructuredData,
  generateBreadcrumbStructuredData,
} from "../../components/StructuredData";

// Enable ISR (Incremental Static Regeneration) - revalidate every 60 seconds
export const revalidate = 60;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fmcginfluencer.com";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  // Strip HTML tags from description for meta description
  const plainDescription = blog.description
    ? blog.description.replace(/<[^>]*>/g, "").substring(0, 160)
    : `Read ${blog.title} by ${blog.author} in the ${blog.category} category.`;

  const blogUrl = `${siteUrl}/blog/${blog.slug}`;
  // Use blog image if available and valid URL, otherwise fallback to default logo
  const imageUrl =
    blog.image &&
    (blog.image.startsWith("http://") || blog.image.startsWith("https://"))
      ? blog.image
      : `${siteUrl}/fmcg-removebg-preview.png`;

  return {
    title: blog.title,
    description: plainDescription,
    keywords: [
      blog.category,
      blog.type,
      "FMCG",
      "Fast Moving Consumer Goods",
      blog.title,
    ],
    authors: [{ name: blog.author }],
    openGraph: {
      type: "article",
      url: blogUrl,
      title: blog.title,
      description: plainDescription,
      publishedTime: blog.createdAt,
      authors: [blog.author],
      section: blog.category,
      tags: [blog.category, blog.type],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: plainDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: blogUrl,
    },
  };
}

// This is now a Server Component - data is fetched on the server
export default async function BlogDetail({ params }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;

  if (!slug) {
    console.error("No slug provided in params");
    notFound();
  }

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    console.error("Blog not found for ID:", blogId, "Type:", typeof blogId);
    notFound();
  }

  const getImagePlaceholder = (imageType, index) => {
    // Check if imageType is a URL (starts with http:// or https://)
    if (
      imageType &&
      (imageType.startsWith("http://") || imageType.startsWith("https://"))
    ) {
      return <BlogImage src={imageType} alt={blog?.title || "Blog image"} />;
    }

    const type = imageType || ["orange", "red", "teal"][index % 3];

    if (type === "orange") {
      return (
        <div className="w-full h-full bg-orange-50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-orange-100 to-orange-200"></div>
          <svg
            className="w-20 h-20 text-orange-300 relative z-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
          </svg>
        </div>
      );
    } else if (type === "red") {
      return (
        <div className="w-full h-full bg-linear-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-red-600 to-red-800 opacity-90"></div>
          <div className="relative z-10 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-white opacity-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-white opacity-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-white opacity-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full bg-teal-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-teal-900 to-teal-800"></div>
          <div className="grid grid-cols-2 gap-6 text-teal-300 relative z-10">
            <svg
              className="w-10 h-10 opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <svg
              className="w-10 h-10 opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <svg
              className="w-10 h-10 opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
            </svg>
            <svg
              className="w-10 h-10 opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
        </div>
      );
    }
  };

  const structuredData = generateBlogStructuredData(blog, siteUrl);
  const breadcrumbData = generateBreadcrumbStructuredData(
    [
      { name: "Home", url: "/" },
      { name: "Blogs", url: "/#blogs" },
      { name: blog.title, url: `/blog/${blog.slug}` },
    ],
    siteUrl
  );

  return (
    <div className="min-h-screen bg-white">
      <StructuredData data={structuredData} />
      <StructuredData data={breadcrumbData} />
      <Header />

      <article className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto lg:flex items-start justify-center gap-8 lg:gap-12 xl:gap-16">
          <div className="max-w-4xl flex-1 w-full">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm md:text-base text-gray-600">
              <Link
                href="/"
                className="hover:text-gray-900 transition-colors font-medium"
              >
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/#blogs"
                className="hover:text-gray-900 transition-colors font-medium"
              >
                Blogs
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-semibold">{blog.title}</span>
            </nav>

            {/* Blog Header */}
            <div className="mb-10 md:mb-12">
              <div className="flex flex-wrap gap-3 mb-6">
                {blog.featured && (
                  <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-4 py-2 rounded-full tracking-wide uppercase">
                    Featured
                  </span>
                )}
                {blog.trending && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full tracking-wide uppercase">
                    Trending
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base text-gray-600">
                <span className="font-semibold">By {blog.author}</span>
                <span className="text-gray-400">•</span>
                <span>{blog.category}</span>
                <span className="text-gray-400">•</span>
                <span>{blog.type}</span>
                <span className="text-gray-400">•</span>
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Blog Image */}
            {blog.image && (
              <div className="mb-10 md:mb-12 rounded-2xl overflow-hidden ">
                <div className="w-full h-72 md:h-96 lg:h-[500px]">
                  {getImagePlaceholder(blog.image, blog.id)}
                </div>
              </div>
            )}

            {/* Blog Content */}
            <BlogContent content={blog.content} />

            {/* Back Button */}
            <div className="mt-12 md:mt-16 pt-8 border-t-2 border-gray-200">
              <Link
                href="/#blogs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold "
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Blogs
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/5 lg:min-w-[280px] min-h-[200px] lg:min-h-[400px] bg-gray-100 rounded p-2 sm:p-4 relative lg:sticky lg:top-24 mt-8 lg:mt-0">
            <div className="absolute top-0 right-0 bg-primary px-2 sm:px-3 rounded-tr">
              <h3 className="text-secondary text-xs sm:text-sm font-bold">
                Advertisement
              </h3>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
