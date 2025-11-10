"use client";

import { useState, useEffect } from "react";
import { getBlogs, saveBlogs, blogCategories } from "../../data/mockData";

export default function ManageFeatured() {
  const [blogs, setBlogs] = useState([]);
  const [selectedFeatured, setSelectedFeatured] = useState({});

  useEffect(() => {
    const allBlogs = getBlogs();
    setBlogs(allBlogs);

    // Initialize selected featured blogs
    const featured = {};
    blogCategories.forEach((category) => {
      const blog = allBlogs.find((b) => b.featured && b.category === category);
      if (blog) featured[category] = blog.id;
    });
    setSelectedFeatured(featured);
  }, []);

  const handleCategoryChange = (category, blogId) => {
    const updatedFeatured = { ...selectedFeatured, [category]: parseInt(blogId) };

    // Remove featured flag from all blogs in this category
    const updatedBlogs = blogs.map((blog) => {
      if (blog.category === category) {
        return { ...blog, featured: false };
      }
      return blog;
    });

    // Set new featured blog
    if (blogId) {
      const blogIndex = updatedBlogs.findIndex((b) => b.id === parseInt(blogId));
      if (blogIndex !== -1) {
        updatedBlogs[blogIndex].featured = true;
      }
    }

    setSelectedFeatured(updatedFeatured);
    setBlogs(updatedBlogs);
  };

  const handleSave = () => {
    saveBlogs(blogs);
    alert("Featured blogs updated successfully!");
  };

  const getCategoryBlogs = (category) => {
    return blogs.filter((blog) => blog.category === category);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Manage Featured
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Select one featured blog for each category. Only one blog can be featured per category.
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
                  Select Featured Blog
                </label>
                <select
                  value={selectedFeatured[category] || ""}
                  onChange={(e) => handleCategoryChange(category, e.target.value)}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                >
                  <option value="">-- Select a blog --</option>
                  {categoryBlogs.map((blog) => (
                    <option key={blog.id} value={blog.id}>
                      {blog.title} {blog.featured && "(Currently Featured)"}
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
