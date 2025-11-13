"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createBlog,
  blogTypes,
  blogCategories,
  getCurrentUserDraft,
  saveBlogDraft,
  deleteDraft,
  getDraftById,
} from "../../data/mockData";
import RichTextEditor from "../../components/RichTextEditor";
import Toast from "../../components/Toast";
import { supabase } from "../../../lib/supabase";
import Image from "next/image";

const computeWordCount = (content) => {
  const textContent = (content || "").replace(/<[^>]*>/g, " ").trim();
  return textContent.split(/\s+/).filter((word) => word.length > 0).length;
};

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

export default function CreateBlog() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const [savingDraft, setSavingDraft] = useState(false);
  const [draftId, setDraftId] = useState(null);
  const [initialDraftChecked, setInitialDraftChecked] = useState(false);
  const draftIdParam = searchParams.get("draftId");
  const [toast, setToast] = useState(null);

  const triggerToast = ({ type = "info", title = "", message = "" }) => {
    setToast({
      id: Date.now(),
      type,
      title,
      message,
    });
  };

  const handleContentChange = (content) => {
    setBlogContent(content);
    // Calculate word count from HTML content (strip HTML tags)
    setWordCount(computeWordCount(content));
    
    // If no featured image is set, try to extract first image from content
    if (!imageUrl && !imageFile) {
      const contentImage = extractFirstImageFromContent(content);
      if (contentImage) {
        setImageUrl(contentImage);
        // Create a preview if it's a URL
        if (contentImage.startsWith("http://") || contentImage.startsWith("https://")) {
          setImagePreview(contentImage);
        }
      }
    }
  };

  const restoreDraft = useCallback((draft) => {
    if (!draft) {
      return;
    }

    setDraftId(draft.id || null);
    setAuthorName(draft.authorName || draft.author_name || "");
    setBlogTitle(draft.blogTitle || draft.blog_title || "");
    setBlogContent(draft.blogContent || draft.blog_content || "");
    setBlogType(draft.blogType || draft.blog_type || "");
    setBlogCategory(draft.blogCategory || draft.blog_category || "");
    setImageUrl(draft.imageUrl || draft.image_url || "");
    setImagePreview(draft.imagePreview || draft.image_preview || null);
    setImageFile(null);
    setWordCount(
      typeof draft.wordCount === "number"
        ? draft.wordCount
        : computeWordCount(draft.blogContent || draft.blog_content || "")
    );
  }, []);

  const handleSaveDraft = async () => {
    if (savingDraft || loading) {
      return;
    }

    setSavingDraft(true);
    try {
      const savedDraft = await saveBlogDraft({
        id: draftId,
        authorName,
        blogTitle,
        blogContent,
        blogType,
        blogCategory,
        imageUrl,
        imagePreview,
        wordCount,
      });

      setDraftId(savedDraft?.id || null);

      const updatedAt = savedDraft?.updatedAt
        ? new Date(savedDraft.updatedAt).toLocaleString()
        : null;

      triggerToast({
        type: "success",
        title: "Draft Saved",
        message: updatedAt
          ? `Your draft is safely stored. Last updated on ${updatedAt}.`
          : "Your draft is safely stored.",
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      triggerToast({
        type: "error",
        title: "Unable to Save Draft",
        message:
          error?.message ||
          "We couldn't save your draft. Please check your connection and try again.",
      });
    } finally {
      setSavingDraft(false);
    }
  };

  useEffect(() => {
    if (initialDraftChecked) {
      return;
    }

    const loadDraft = async () => {
      try {
        if (draftIdParam) {
          const draft = await getDraftById(draftIdParam);

          if (draft) {
            restoreDraft(draft);
            triggerToast({
              type: "info",
              title: "Draft Loaded",
              message: "You're now editing the selected draft.",
            });
          } else {
            triggerToast({
              type: "error",
              title: "Draft Not Found",
              message:
                "We couldn't locate that draft. It may have been deleted.",
            });
          }
          router.replace("/admin/create");
          return;
        }

        const draft = await getCurrentUserDraft();

        if (draft) {
          const updatedLabel = draft.updatedAt
            ? new Date(draft.updatedAt).toLocaleString()
            : null;

          const shouldLoad = window.confirm(
            updatedLabel
              ? `We found a saved draft from ${updatedLabel}. Would you like to continue editing it?`
              : "We found a saved draft. Would you like to continue editing it?"
          );

          if (shouldLoad) {
            restoreDraft(draft);
            triggerToast({
              type: "info",
              title: "Draft Loaded",
              message: "Your saved draft has been restored.",
            });
          } else {
            try {
              await deleteDraft(draft.id);
              setDraftId(null);
              triggerToast({
                type: "info",
                title: "Draft Discarded",
                message: "The saved draft has been removed.",
              });
            } catch (error) {
              console.error("Error discarding draft:", error);
              triggerToast({
                type: "error",
                title: "Draft Error",
                message: "We couldn't discard the draft. Please try again.",
              });
            }
          }
        }
      } catch (error) {
        console.error("Error loading draft:", error);
        triggerToast({
          type: "error",
          title: "Draft Error",
          message:
            "We had trouble loading your drafts. Please refresh and try again.",
        });
      } finally {
        setInitialDraftChecked(true);
      }
    };

    loadDraft();
  }, [draftIdParam, initialDraftChecked, router, restoreDraft]);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      triggerToast({
        type: "error",
        title: "Invalid File",
        message: "Please select an image file.",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      triggerToast({
        type: "error",
        title: "Image Too Large",
        message: "Image size should be less than 5MB.",
      });
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
      triggerToast({
        type: "error",
        title: "Validation Error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    setLoading(true);
    try {
      // Upload image first if a file was selected
      // If no image provided, try to extract from content, otherwise randomly select
      const getRandomImage = () => {
        const options = ["orange", "red", "teal"];
        return options[Math.floor(Math.random() * options.length)];
      };

      let finalImageUrl = imageUrl;
      
      // If no featured image is set, try to extract first image from content
      if (!finalImageUrl && !imageFile) {
        const contentImage = extractFirstImageFromContent(blogContent);
        if (contentImage) {
          finalImageUrl = contentImage;
          setImageUrl(contentImage); // Update state for consistency
        }
      }
      
      // If still no image, use random default
      if (!finalImageUrl && !imageFile) {
        finalImageUrl = getRandomImage();
      }
      
      // Upload featured image if a file was selected
      if (imageFile) {
        try {
          finalImageUrl = await uploadImage();
        } catch (uploadError) {
          triggerToast({
            type: "error",
            title: "Upload Error",
            message:
              uploadError?.message ||
              "Failed to upload image. Please try again.",
          });
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

      if (draftId) {
        try {
          await deleteDraft(draftId);
          setDraftId(null);
        } catch (error) {
          console.error("Error clearing draft after publish:", error);
        }
      }

      triggerToast({
        type: "success",
        title: "Success",
        message: "Blog created successfully!",
      });

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

      triggerToast({
        type: "error",
        title: "Error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Create New Blog Post
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Create a new blog post and publish it to your website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/drafts")}
          className="self-start md:self-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-secondary text-primary rounded cursor-pointer hover:bg-secondary/80 transition-all font-semibold text-sm sm:text-base border-2 border-secondary"
        >
          View Drafts
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
        {/* Card 1: Author Name & Blog Post Title */}
        <div className="bg-white rounded p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200">
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
        <div className="bg-white rounded p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200">
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
        <div className="bg-white rounded p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200">
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
                  <div className="w-full h-full">
                    <Image
                      src={imagePreview}
                      width={1000}
                      height={1000}
                      alt="Preview"
                      className="max-w-full h-auto max-h-64 mx-auto rounded-lg mb-4 w-full object-cover"
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
        <div className="bg-white rounded p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-200">
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
            type="button"
            onClick={handleSaveDraft}
            disabled={loading || savingDraft}
            className="px-6 py-3 bg-primary/10 text-primary rounded cursor-pointer hover:bg-primary/20 transition-all font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {savingDraft ? "Saving..." : "Save Draft"}
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

      {toast ? (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      ) : null}
    </div>
  );
}
