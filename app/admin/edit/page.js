"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBlogs, saveBlogs, blogTypes, blogCategories } from "../../data/mockData";

export default function EditBlog() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setBlogs(getBlogs());
  }, []);

  const handleEdit = (blog) => {
    setEditingBlog({ ...blog });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedBlogs = blogs.map((blog) =>
      blog.id === editingBlog.id ? editingBlog : blog
    );
    saveBlogs(updatedBlogs);
    setBlogs(updatedBlogs);
    setEditingBlog(null);
    alert("Blog updated successfully!");
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      saveBlogs(updatedBlogs);
      setBlogs(updatedBlogs);
      alert("Blog deleted successfully!");
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (editingBlog) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 md:mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Edit Blog Post
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Edit the blog post details.
            </p>
          </div>
          <button
            onClick={() => setEditingBlog(null)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold shadow-md"
          >
            Back to List
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 md:space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  Author Name
                </label>
                <input
                  type="text"
                  value={editingBlog.author}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, author: e.target.value })
                  }
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, title: e.target.value })
                  }
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  Blog Type
                </label>
                <select
                  value={editingBlog.type}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, type: e.target.value })
                  }
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                >
                  {blogTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  Category
                </label>
                <select
                  value={editingBlog.category}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, category: e.target.value })
                  }
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                >
                  {blogCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-5">
              Blog Content
            </label>
            <textarea
              value={editingBlog.content}
              onChange={(e) =>
                setEditingBlog({ ...editingBlog, content: e.target.value })
              }
              className="w-full px-5 py-5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base"
              rows="14"
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setEditingBlog(null)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Edit Blogs
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Manage and edit your existing blog posts.
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search blogs by title, author, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base shadow-sm"
        />
      </div>

      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                {blog.title}
              </h3>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Author:</span> {blog.author}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Category:</span> {blog.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Type:</span> {blog.type}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 md:py-20">
          <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 border-2 border-dashed border-gray-200">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
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
            <p className="text-gray-500 text-lg font-medium">No blogs found.</p>
          </div>
        </div>
      )}
    </div>
  );
}
