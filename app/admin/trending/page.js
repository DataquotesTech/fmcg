"use client";

import { useState, useEffect } from "react";
import { getBlogs, saveBlogs, blogCategories } from "../../data/mockData";

export default function ManageTrending() {
  const [blogs, setBlogs] = useState([]);
  const [selectedTrending, setSelectedTrending] = useState({});

  useEffect(() => {
    const allBlogs = getBlogs();
    setBlogs(allBlogs);

    // Initialize selected trending blogs
    const trending = {};
    blogCategories.forEach((category) => {
      const blog = allBlogs.find((b) => b.trending && b.category === category);
      if (blog) trending[category] = blog.id;
    });
    setSelectedTrending(trending);
  }, []);

  const handleCategoryChange = (category, blogId) => {
    const updatedTrending = { ...selectedTrending, [category]: parseInt(blogId) };

    // Remove trending flag from all blogs in this category
    const updatedBlogs = blogs.map((blog) => {
      if (blog.category === category) {
        return { ...blog, trending: false };
      }
      return blog;
    });

    // Set new trending blog
    if (blogId) {
      const blogIndex = updatedBlogs.findIndex((b) => b.id === parseInt(blogId));
      if (blogIndex !== -1) {
        updatedBlogs[blogIndex].trending = true;
      }
    }

    setSelectedTrending(updatedTrending);
    setBlogs(updatedBlogs);
  };

  const handleSave = () => {
    saveBlogs(blogs);
    alert("Trending blogs updated successfully!");
  };

  const getCategoryBlogs = (category) => {
    return blogs.filter((blog) => blog.category === category);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Manage Trending
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Select one trending blog for each category. Only one blog can be trending per category.
        </p>
      </div>

      <div className="space-y-6 md:space-y-8">
        {blogCategories.map((category) => {
          const categoryBlogs = getCategoryBlogs(category);
          return (
            <div
              key={category}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                {category}
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  Select Trending Blog
                </label>
                <select
                  value={selectedTrending[category] || ""}
                  onChange={(e) => handleCategoryChange(category, e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                >
                  <option value="">-- Select a blog --</option>
                  {categoryBlogs.map((blog) => (
                    <option key={blog.id} value={blog.id}>
                      {blog.title} {blog.trending && "(Currently Trending)"}
                    </option>
                  ))}
                </select>
              </div>
              {categoryBlogs.length === 0 && (
                <p className="text-sm text-gray-500 mt-4">
                  No blogs available in this category. Create blogs first.
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
