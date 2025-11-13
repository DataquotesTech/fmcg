"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getBlogs,
  updateBlog,
  deleteBlog,
  blogTypes,
  blogCategories,
} from "../../data/mockData";
import RichTextEditor from "../../components/RichTextEditor";
import Toast from "../../components/Toast";
import { supabase } from "../../../lib/supabase";
import Image from "next/image";

// Extract first image URL from HTML content
const extractFirstImageFromContent = (htmlContent) => {
  if (!htmlContent) return null;
  
  // Try to find img tag with src attribute
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }
  
  // Try to find YouTube iframe (for video thumbnails)
  const youtubeMatch = htmlContent.match(/youtube\.com\/embed\/([^"'\s?]+)/i);
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
  }
  
  return null;
};

export default function EditBlog() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toast, setToast] = useState(null);

  // Check authentication
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      if (!isAuthenticated) {
        router.push("/admin/login");
        return;
      }
      loadBlogs();
    }
  }, [router]);

  const loadBlogs = async () => {
    try {
      const allBlogs = await getBlogs({ includeContent: true });
      setBlogs(allBlogs);
    } catch (error) {
      console.error("Error loading blogs:", error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog({ ...blog });
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setToast({
        title: "Error",
        message: "Please select an image file",
        type: "error",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setToast({
        title: "Error",
        message: "Image size should be less than 5MB",
        type: "error",
      });
      return;
    }

    setUploadingImage(true);

    // Upload to Supabase
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}_${Date.now()}.${fileExt}`;
      // Don't include bucket name in path - it's already specified in .from()
      const filePath = fileName;

      const { data, error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error details:", uploadError);
        // Show more specific error message
        let errorMessage = "Failed to upload image. ";
        if (uploadError.message) {
          errorMessage += uploadError.message;
        } else if (uploadError.error) {
          errorMessage += uploadError.error;
        } else {
          errorMessage += "Please check your Supabase storage setup.";
        }
        throw new Error(errorMessage);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(filePath);

      setEditingBlog({ ...editingBlog, image: publicUrl });
      setToast({
        title: "Success",
        message: "Image uploaded successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setToast({
        title: "Upload Error",
        message:
          error.message ||
          "Failed to upload image. Please check:\n1. Storage bucket 'blog-images' exists\n2. Storage policies are configured\n3. You are logged in as admin",
        type: "error",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validate required fields
    // For HTML content, check if there's actual text content (not just HTML tags)
    const textContent = editingBlog.content.replace(/<[^>]*>/g, " ").trim();
    if (
      !editingBlog.author ||
      !editingBlog.title ||
      !textContent ||
      !editingBlog.type ||
      !editingBlog.category
    ) {
      setToast({
        title: "Validation Error",
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      // If no image is set, try to extract first image from content
      let finalImage = editingBlog.image;
      if (!finalImage || finalImage === "orange" || finalImage === "red" || finalImage === "teal") {
        const contentImage = extractFirstImageFromContent(editingBlog.content);
        if (contentImage) {
          finalImage = contentImage;
        }
      }
      
      const result = await updateBlog(editingBlog.id, {
        title: editingBlog.title,
        content: editingBlog.content,
        description: editingBlog.description,
        author: editingBlog.author,
        category: editingBlog.category,
        type: editingBlog.type,
        image: finalImage,
        featured: editingBlog.featured,
        trending: editingBlog.trending,
      });

      console.log("Blog updated successfully:", result);

      await loadBlogs();
      setEditingBlog(null);
      setToast({
        title: "Success",
        message: "Blog updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating blog:", error);
      let errorMessage = "An error occurred while updating the blog. ";
      if (error.message) {
        errorMessage += error.message;
      } else if (error.error) {
        errorMessage += error.error;
      } else {
        errorMessage +=
          "Please check your Supabase configuration and try again.";
      }
      setToast({
        title: "Error",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await deleteBlog(id);
      await loadBlogs();
      if (editingBlog && editingBlog.id === id) {
        setEditingBlog(null);
      }
      setToast({
        title: "Success",
        message: "Blog deleted successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      setToast({
        title: "Error",
        message:
          "An error occurred while deleting the blog. Please try again.",
        type: "error",
      });
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 md:mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Edit Blog Post
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Edit the blog post details.
            </p>
          </div>
          <button
            onClick={() => setEditingBlog(null)}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-secondary rounded cursor-pointer hover:bg-primary/70 transition-all font-semibold text-sm sm:text-base border-2 border-primary"
          >
            Back to List
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 sm:space-y-6 md:space-y-8">
          <div className="bg-white rounded p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200">
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

          <div className="bg-white rounded p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  Blog Type
                </label>
                <select
                  value={editingBlog.type || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, type: e.target.value })
                  }
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  required
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
                  value={editingBlog.category || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, category: e.target.value })
                  }
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  required
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

          <div className="bg-white rounded  p-8 md:p-10 border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Featured Image
            </label>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Upload New Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={uploadingImage}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  />
                  {uploadingImage && (
                    <p className="text-xs text-blue-600 mt-2">Uploading...</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Or Enter Image URL
                  </label>
                  <input
                    type="text"
                    value={editingBlog.image || ""}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, image: e.target.value })
                    }
                    placeholder="orange, red, teal, or image URL"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  />
                </div>
              </div>
              {editingBlog.image &&
                !editingBlog.image.match(/^(orange|red|teal)$/i) && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-600 mb-2">Current Image:</p>
                    <img
                      src={editingBlog.image}
                      alt="Current"
                      className="max-w-full h-auto max-h-48 rounded-lg border-2 border-gray-200"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              <p className="text-xs text-gray-500 mt-2">
                Use &quot;orange&quot;, &quot;red&quot;, or &quot;teal&quot; for
                placeholder images, or upload/enter an image URL
              </p>
            </div>
          </div>

          <div className="bg-white rounded p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-4 sm:mb-5">
              Blog Content
            </label>
            <RichTextEditor
              value={editingBlog.content || ""}
              onChange={(content) => {
                // Generate description from HTML content (strip HTML tags)
                const textContent = content.replace(/<[^>]*>/g, " ").trim();
                const description =
                  textContent.substring(0, 150) +
                  (textContent.length > 150 ? "..." : "");

                // If no image is set (or using default), try to extract first image from content
                let updatedImage = editingBlog.image;
                if (!updatedImage || updatedImage === "orange" || updatedImage === "red" || updatedImage === "teal") {
                  const contentImage = extractFirstImageFromContent(content);
                  if (contentImage) {
                    updatedImage = contentImage;
                  }
                }

                setEditingBlog({
                  ...editingBlog,
                  content: content,
                  description: description,
                  image: updatedImage,
                });
              }}
              placeholder="Start writing your amazing story..."
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              onClick={() => setEditingBlog(null)}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-100 cursor-pointer text-gray-700 rounded hover:bg-gray-200 transition-all font-semibold text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white rounded cursor-pointer hover:bg-primary/70 transition-all font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Edit Blogs
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Manage and edit your existing blog posts.
        </p>
      </div>

      <div className="mb-6 sm:mb-8">
        <input
          type="text"
          placeholder="Search blogs by title, author, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
        />
      </div>

      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-neutral-800/90 rounded p-6 md:p-8 border border-gray-200 hover: transition-all duration-300"
            >
              <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 line-clamp-2">
                {blog.title}
              </h3>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-secondary/70">
                  <span className="font-semibold">Author:</span> {blog.author}
                </p>
                <p className="text-sm text-secondary/70">
                  <span className="font-semibold">Category:</span>{" "}
                  {blog.category}
                </p>
                <p className="text-sm text-secondary/70">
                  <span className="font-semibold">Type:</span> {blog.type}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-secondary text-primary rounded cursor-pointer hover:bg-secondary/70 text-xs sm:text-sm font-semibold transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600/30 text-white rounded cursor-pointer hover:bg-red-700 text-xs sm:text-sm font-semibold transition-all"
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

      {toast && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
