"use client";

import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import Modal from "./Modal";

export default function ImageUpload({ onImageUploaded, onCancel }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    setError(null);
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        setShowErrorModal(true);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        setShowErrorModal(true);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please select an image file");
      setShowErrorModal(true);
      return;
    }

    setUploading(true);
    setError(null);
    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(filePath);

      if (onImageUploaded) {
        onImageUploaded(publicUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
      setShowErrorModal(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        message={error}
        type="error"
      />
      <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Select Image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
        />
        <p className="text-xs text-gray-500 mt-2">
          Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
        </p>
      </div>

      {preview && (
        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Preview
          </label>
          <div className="border-2 border-gray-300 rounded-xl p-4 bg-gray-50">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto max-h-64 mx-auto rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={uploading}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold text-base  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading || !preview}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-base  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
      </div>
    </>
  );
}

