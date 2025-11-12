"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog, blogTypes, blogCategories } from "../../data/mockData";
import RichTextEditor from "../../components/RichTextEditor";
import Modal from "../../components/Modal";
import { supabase } from "../../../lib/supabase";
import Image from "next/image";

export default function CreateBlog() {
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      if (!isAuthenticated) {
        router.push("/admin/login");
      }
    }
  }, [router]);
  const [authorName, setAuthorName] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [blogContent, setBlogContent] = useState("");
  const [blogType, setBlogType] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    type: "info",
  });

  const handleContentChange = (content) => {
    setBlogContent(content);
    // Calculate word count from HTML content (strip HTML tags)
    const textContent = content.replace(/<[^>]*>/g, " ").trim();
    setWordCount(
      textContent.split(/\s+/).filter((word) => word.length > 0).length
    );
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setModalConfig({
        title: "Error",
        message: "Please select an image file",
        type: "error",
      });
      setShowModal(true);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setModalConfig({
        title: "Error",
        message: "Image size should be less than 5MB",
        type: "error",
      });
      setShowModal(true);
      return;
    }

    setImageFile(file);

    // Create preview only (don't upload yet)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    if (!imageFile) {
      return imageUrl || "orange"; // Return existing URL or default
    }

    setUploadingImage(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}_${Date.now()}.${fileExt}`;
      // Don't include bucket name in path - it's already specified in .from()
      const filePath = fileName;

      const { data, error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, imageFile, {
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

      console.log("Image uploaded successfully:", publicUrl);
      setImageUrl(publicUrl);
      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    // For HTML content, check if there's actual text content (not just HTML tags)
    const textContent = blogContent.replace(/<[^>]*>/g, " ").trim();
    if (
      !authorName ||
      !blogTitle ||
      !textContent ||
      !blogType ||
      !blogCategory
    ) {
      setModalConfig({
        title: "Validation Error",
        message: "Please fill in all required fields.",
        type: "error",
      });
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      // Upload image first if a file was selected
      // If no image provided, randomly select from orange, red, or teal
      const getRandomImage = () => {
        const options = ["orange", "red", "teal"];
        return options[Math.floor(Math.random() * options.length)];
      };

      let finalImageUrl = imageUrl || getRandomImage();
      if (imageFile) {
        try {
          finalImageUrl = await uploadImage();
        } catch (uploadError) {
          setModalConfig({
            title: "Upload Error",
            message:
              uploadError.message ||
              "Failed to upload image. Please try again.",
            type: "error",
          });
          setShowModal(true);
          setLoading(false);
          return;
        }
      }

      await createBlog({
        title: blogTitle,
        content: blogContent,
        author: authorName,
        category: blogCategory,
        type: blogType,
        image: finalImageUrl,
        featured: false,
        trending: false,
      });

      setModalConfig({
        title: "Success",
        message: "Blog created successfully!",
        type: "success",
      });
      setShowModal(true);

      // Reset form
      setAuthorName("");
      setBlogTitle("");
      setImageFile(null);
      setImagePreview(null);
      setImageUrl("");
      setBlogContent("");
      setBlogType("");
      setBlogCategory("");
      setWordCount(0);

      // Wait a bit before redirecting to show success message
      setTimeout(() => {
        router.push("/admin/edit");
      }, 1500);
    } catch (error) {
      console.error("Error creating blog:", error);
      let errorMessage = "An error occurred while creating the blog. ";
      if (error.message) {
        errorMessage += error.message;
      } else if (error.originalError) {
        errorMessage +=
          error.originalError.message ||
          "Please check your Supabase configuration.";
      } else {
        errorMessage += "Please try again.";
      }

      // Check for duplicate key error specifically
      if (error.message && error.message.includes("duplicate key")) {
        errorMessage =
          "Blog ID conflict. Please run the SQL fix: SELECT setval('blogs_id_seq', (SELECT MAX(id) FROM blogs));";
      }

      setModalConfig({
        title: "Error",
        message: errorMessage,
        type: "error",
      });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
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
        <div className="bg-white rounded  p-8 md:p-10 border border-gray-200">
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
        <div className="bg-white rounded   p-8 md:p-10 border border-gray-200">
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

        {/* Card 3: Featured Image */}
        <div className="bg-white rounded   p-8 md:p-10 border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-4">
            Featured Image
          </label>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                disabled={uploadingImage}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-10 md:p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {imagePreview ? (
                  <div className="w-full">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-auto max-h-64 mx-auto rounded-lg mb-4"
                    />
                    <p className="text-sm text-gray-600 font-medium">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <>
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
                      {uploadingImage
                        ? "Uploading..."
                        : "Click to select image (will upload on publish)"}
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </>
                )}
              </label>
            </div>
            {imageUrl && (
              <p className="text-xs text-gray-500">
                Image uploaded successfully: {imageUrl.substring(0, 50)}...
              </p>
            )}
          </div>
        </div>

        {/* Card 4: Blog Content */}
        <div className="bg-white rounded   p-8 md:p-10 border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-5">
            Blog Content
          </label>

          {/* Rich Text Editor */}
          <RichTextEditor
            value={blogContent}
            onChange={handleContentChange}
            placeholder="Start writing your amazing story..."
          />

          {/* Footer */}
          <div className="flex justify-end items-center mt-5 text-sm text-gray-500">
            <span className="font-semibold">{wordCount} words</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/edit")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200 transition-all font-semibold text-base "
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-primary text-white rounded cursor-pointer hover:bg-primary/70 transition-all font-semibold text-base  hover: transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </form>

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
