"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getBlogs } from "../../data/mockData";

export default function BlogDetail() {
  const params = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogs = getBlogs();
    const foundBlog = blogs.find((b) => b.id === parseInt(params.id));
    setBlog(foundBlog);
  }, [params.id]);

  const getImagePlaceholder = (imageType, index) => {
    const type = imageType || ["orange", "red", "teal"][index % 3];

    if (type === "orange") {
      return (
        <div className="w-full h-full bg-orange-50 flex items-center justify-center relative overflow-hidden">
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
        <div className="w-full h-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
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
        <div className="w-full h-full bg-teal-900 flex items-center justify-center relative overflow-hidden">
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

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 md:py-24 text-center max-w-4xl">
          <div className="bg-gray-50 rounded-2xl p-12 md:p-16 border-2 border-dashed border-gray-200">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blog Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The blog you're looking for doesn't exist.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
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
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
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
            <div className="mb-10 md:mb-12 rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-72 md:h-96 lg:h-[500px]">
                {getImagePlaceholder(blog.image, blog.id)}
              </div>
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg md:prose-xl max-w-none mb-12 md:mb-16">
            <div className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 md:mt-16 pt-8 border-t-2 border-gray-200">
            <Link
              href="/#blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold shadow-md hover:shadow-lg"
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
      </article>

      <Footer />
    </div>
  );
}
