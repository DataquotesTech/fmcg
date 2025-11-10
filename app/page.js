"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryNav from "./components/CategoryNav";
import BlogCard from "./components/BlogCard";
import StatsSection from "./components/StatsSection";
import { getBlogs, blogCategories } from "./data/mockData";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Promotional Blogs");
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [trendingBlog, setTrendingBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Load blogs and set featured/trending
    const loadBlogs = () => {
      const allBlogs = getBlogs();
      setBlogs(allBlogs);

      // Find featured and trending blogs for the active category
      const featured = allBlogs.find(
        (b) => b.featured && b.category === activeCategory
      );
      const trending = allBlogs.find(
        (b) => b.trending && b.category === activeCategory
      );

      setFeaturedBlog(featured || null);
      setTrendingBlog(trending || null);
    };

    loadBlogs();
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Filter blogs by active category and exclude featured/trending
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.category === activeCategory && !blog.featured && !blog.trending
  );

  // Determine blogs per page: 3 if both featured and trending exist, otherwise 6
  const blogsPerPage = featuredBlog && trendingBlog ? 3 : 6;

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of blog section
      const blogsSection = document.getElementById("blogs");
      if (blogsSection) {
        blogsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Show first pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last pages
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const getImagePlaceholder = (imageType, index) => {
    const type = imageType || ["orange", "red", "teal"][index % 3];

    if (type === "orange") {
      return (
        <div
          key={`orange-${index}`}
          className="w-full h-full bg-orange-50 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200"></div>
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
        <div
          key={`red-${index}`}
          className="w-full h-full bg-gray-900 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
          <span
            className="text-3xl md:text-4xl font-bold text-red-500 relative z-10 tracking-wider"
            style={{ textShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
          >
            Marketing
          </span>
        </div>
      );
    } else {
      return (
        <div
          key={`teal-${index}`}
          className="w-full h-full bg-teal-900 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-teal-800"></div>
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 px-6 sm:px-8 lg:px-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-4xl mx-auto space-y-10 md:space-y-12">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-[1.05] tracking-tight">
              Helping Influencer To Build Their Brand & Community
            </h1>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-6">
              <Link
                href="/admin/login"
                className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4.5 rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Register
              </Link>
              <a
                href="#blogs"
                className="w-full sm:w-auto bg-white text-gray-900 px-10 py-4.5 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
              >
                Explore Blogs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNav
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main Content Area */}
      <section
        id="blogs"
        className="w-full py-16 md:py-20 lg:py-24 px-6 sm:px-8 lg:px-10"
      >
        <div className="container mx-auto max-w-7xl">
          {/* Featured & Trending Section - Side by Side if both exist */}
          {(featuredBlog || trendingBlog) && (
            <div className="mb-20 md:mb-24 lg:mb-32">
              {featuredBlog && trendingBlog ? (
                // Both exist - Show side by side as cards
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
                  {/* Featured Blog Card */}
                  <Link
                    href={`/blog/${featuredBlog.id}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative">
                      <div className="absolute top-5 left-5 z-10">
                        <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg tracking-wide uppercase">
                          Featured
                        </span>
                      </div>
                      <div className="w-full h-64 md:h-80 lg:h-96">
                        {getImagePlaceholder(
                          featuredBlog.image,
                          featuredBlog.id
                        )}
                      </div>
                    </div>
                    <div className="p-8 md:p-10">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                        {featuredBlog.title}
                      </h2>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {featuredBlog.description}
                      </p>
                    </div>
                  </Link>

                  {/* Trending Blog Card */}
                  <Link
                    href={`/blog/${trendingBlog.id}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative">
                      <div className="absolute top-5 right-5 z-10">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg tracking-wide uppercase">
                          Trending
                        </span>
                      </div>
                      <div className="w-full h-64 md:h-80 lg:h-96">
                        {getImagePlaceholder(
                          trendingBlog.image,
                          trendingBlog.id
                        )}
                      </div>
                    </div>
                    <div className="p-8 md:p-10">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                        {trendingBlog.title}
                      </h2>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {trendingBlog.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ) : featuredBlog ? (
                // Only Featured - Full Width
                <Link
                  href={`/blog/${featuredBlog.id}`}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center group"
                >
                  {/* Left Side - Text Content */}
                  <div className="space-y-6 md:space-y-8">
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-4 py-2 rounded-full tracking-wide uppercase">
                      Featured
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl lg:text-2xl leading-relaxed">
                      {featuredBlog.description}
                    </p>
                  </div>

                  {/* Right Side - Image */}
                  <div className="w-full h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                    {getImagePlaceholder(featuredBlog.image, featuredBlog.id)}
                  </div>
                </Link>
              ) : (
                // Only Trending - Full Width
                <Link
                  href={`/blog/${trendingBlog.id}`}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center group"
                >
                  {/* Left Side - Image */}
                  <div className="w-full h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                    {getImagePlaceholder(trendingBlog.image, trendingBlog.id)}
                  </div>

                  {/* Right Side - Text Content */}
                  <div className="space-y-6 md:space-y-8">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full tracking-wide uppercase">
                      Trending
                    </span>
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {trendingBlog.title}
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl lg:text-2xl leading-relaxed">
                      {trendingBlog.description}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          )}

          {/* Section Title */}
          {filteredBlogs.length > 0 && (
            <div className="mb-12 md:mb-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Heading of the blog
              </h2>
            </div>
          )}

          {/* General Blog Posts Grid */}
          {filteredBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                {paginatedBlogs.map((blog, index) => (
                  <Link key={blog.id} href={`/blog/${blog.id}`}>
                    <BlogCard
                      image={getImagePlaceholder(
                        blog.image,
                        startIndex + index
                      )}
                      title={blog.title}
                      description={blog.description}
                    />
                  </Link>
                ))}
              </div>

              {/* Pagination - Only show if more blogs than per page limit */}
              {filteredBlogs.length > blogsPerPage && (
                <div className="flex justify-center items-center gap-2 md:gap-3 mt-20 md:mt-24 lg:mt-28 flex-wrap">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-5 md:px-6 py-2.5 md:py-3 text-base font-medium transition-colors rounded-lg ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    prev
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((page, index) => {
                    if (page === "ellipsis") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-3 md:px-4 text-gray-400 text-base"
                        >
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-6 md:px-7 py-2.5 md:py-3 text-base font-semibold rounded-lg transition-all ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-md hover:shadow-lg"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-5 md:px-6 py-2.5 md:py-3 text-base font-medium transition-colors rounded-lg ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 md:py-24">
              <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-12 md:p-16 border-2 border-dashed border-gray-200">
                <svg
                  className="w-20 h-20 mx-auto text-gray-300 mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500 text-xl md:text-2xl font-medium mb-3">
                  No blogs available in this category.
                </p>
                <p className="text-gray-400 text-base">
                  Check back later or try another category.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats/Network Section */}
      <StatsSection />

      <Footer />
    </div>
  );
}
