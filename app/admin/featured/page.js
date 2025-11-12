"use client";

import { useState, useEffect } from "react";
import { getBlogs, updateBlog, blogCategories } from "../../data/mockData";
import Modal from "../../components/Modal";

export default function ManageFeatured() {
  const [blogs, setBlogs] = useState([]);
  const [selectedFeatured, setSelectedFeatured] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    type: "info",
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const allBlogs = await getBlogs();
      setBlogs(allBlogs);

      // Initialize selected featured blogs
      const featured = {};
      blogCategories.forEach((category) => {
        const blog = allBlogs.find(
          (b) => b.featured && b.category === category
        );
        if (blog) featured[category] = blog.id;
      });
      setSelectedFeatured(featured);
    } catch (error) {
      console.error("Error loading blogs:", error);
    }
  };

  const handleCategoryChange = async (category, blogId) => {
    const updatedFeatured = {
      ...selectedFeatured,
      [category]: parseInt(blogId),
    };
    setSelectedFeatured(updatedFeatured);

    // Remove featured flag from all blogs in this category
    const categoryBlogs = blogs.filter(
      (blog) => blog.category === category && blog.featured
    );
    for (const blog of categoryBlogs) {
      try {
        await updateBlog(blog.id, { ...blog, featured: false });
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    }

    // Set new featured blog
    if (blogId) {
      const blogToFeature = blogs.find((b) => b.id === parseInt(blogId));
      if (blogToFeature) {
        try {
          await updateBlog(blogToFeature.id, {
            ...blogToFeature,
            featured: true,
          });
        } catch (error) {
          console.error("Error updating blog:", error);
        }
      }
    }

    await loadBlogs();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // The updates are already done in handleCategoryChange
      // Just reload to ensure consistency
      await loadBlogs();
      setModalConfig({
        title: "Success",
        message: "Featured blogs updated successfully!",
        type: "success",
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error saving featured blogs:", error);
      setModalConfig({
        title: "Error",
        message: "An error occurred while saving. Please try again.",
        type: "error",
      });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
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
          Select one featured blog for each category. Only one blog can be
          featured per category.
        </p>
      </div>

      <div className="space-y-6 md:space-y-8">
        {blogCategories.map((category) => {
          const categoryBlogs = getCategoryBlogs(category);
          return (
            <div
              key={category}
              className="bg-white rounded  p-4  border-2 border-primary"
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
                  onChange={(e) =>
                    handleCategoryChange(category, e.target.value)
                  }
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
          disabled={loading}
          className="px-8 py-3 bg-primary text-white rounded cursor-pointer hover:bg-primary/70 transition-all font-semibold  hover: transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />
    </div>
  );
}
