"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getBlogs, saveBlogs, blogTypes, blogCategories } from "../../data/mockData";

export default function CreateBlog() {
  const router = useRouter();
  const [authorName, setAuthorName] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogType, setBlogType] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleContentChange = (e) => {
    const content = e.target.value;
    setBlogContent(content);
    setWordCount(
      content
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogs = getBlogs();
    const newBlog = {
      id: Date.now(),
      title: blogTitle,
      description: blogContent.substring(0, 150) + "...",
      content: blogContent,
      author: authorName,
      category: blogCategory,
      type: blogType,
      image: imageTitle || "/api/placeholder/800/400",
      createdAt: new Date().toISOString().split("T")[0],
      featured: false,
      trending: false,
    };
    blogs.push(newBlog);
    saveBlogs(blogs);
    alert("Blog created successfully!");
    router.push("/admin/edit");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Create New Blog Post
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Create a new blog post and publish it to your website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {/* Card 1: Author Name & Blog Post Title */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter author's name"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Blog Post Title
              </label>
              <input
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Enter your title here"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-base"
                required
              />
            </div>
          </div>
        </div>

        {/* Card 2: Blog Type & Category */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Blog Type
              </label>
              <select
                value={blogType}
                onChange={(e) => setBlogType(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-base"
                required
              >
                <option value="">Select Blog Type</option>
                {blogTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Blog Category
              </label>
              <select
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-base"
                required
              >
                <option value="">Select Category</option>
                {blogCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Card 3: Featured Image & Image Title */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Featured Image URL
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 md:p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                <svg
                  className="w-14 h-14 mx-auto text-gray-400 mb-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Image URL or path
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Image Title/URL
              </label>
              <input
                type="text"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                placeholder="Enter image URL or title"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-base"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Blog Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-5">
            Blog Content
          </label>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-t-xl border-b-2 border-gray-200 mb-0 overflow-x-auto">
            <button type="button" className="p-2.5 hover:bg-gray-200 rounded-lg transition-colors">
              <span className="font-bold text-base">B</span>
            </button>
            <button type="button" className="p-2.5 hover:bg-gray-200 rounded-lg transition-colors">
              <span className="italic text-base">I</span>
            </button>
            <button type="button" className="p-2.5 hover:bg-gray-200 rounded-lg transition-colors">
              <span className="underline text-base">U</span>
            </button>
            <div className="w-px h-8 bg-gray-300 mx-1"></div>
            <button type="button" className="p-2.5 hover:bg-gray-200 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={blogContent}
            onChange={handleContentChange}
            placeholder="Start writing your amazing story..."
            className="w-full px-5 py-5 border-2 border-gray-300 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base bg-white transition-all"
            rows="14"
            required
          />

          {/* Footer */}
          <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
            <span>Draft saved at {new Date().toLocaleTimeString()}</span>
            <span className="font-semibold">{wordCount} words</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/edit")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold text-base shadow-md hover:shadow-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
}
