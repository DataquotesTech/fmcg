"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getDrafts, deleteDraft } from "../../data/mockData";
import Toast from "../../components/Toast";

export default function DraftsPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const triggerToast = useCallback(
    ({ type = "info", title = "", message = "" }) => {
      setToast({
        id: Date.now(),
        type,
        title,
        message,
      });
    },
    []
  );

  const loadDrafts = useCallback(async () => {
    try {
      const data = await getDrafts();
      setDrafts(data);
    } catch (error) {
      console.error("Error loading drafts:", error);
      triggerToast({
        type: "error",
        title: "Error",
        message: "Unable to load drafts. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, [triggerToast]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      if (!isAuthenticated) {
        router.push("/admin/login");
      } else {
        loadDrafts();
      }
    }
  }, [router, loadDrafts]);

  const handleContinue = (draftId) => {
    router.push(`/admin/create?draftId=${draftId}`);
  };

  const handleDelete = async (draftId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this draft? This action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    setPendingDeleteId(draftId);
    try {
      await deleteDraft(draftId);
      triggerToast({
        type: "success",
        title: "Draft Deleted",
        message: "The draft has been deleted successfully.",
      });
      await loadDrafts();
    } catch (error) {
      console.error("Error deleting draft:", error);
      triggerToast({
        type: "error",
        title: "Error",
        message: "Failed to delete draft. Please try again.",
      });
    } finally {
      setPendingDeleteId(null);
    }
  };

  const filteredDrafts = drafts.filter((draft) => {
    const term = searchTerm.toLowerCase();
    return (
      draft.blogTitle.toLowerCase().includes(term) ||
      draft.authorName.toLowerCase().includes(term) ||
      draft.blogCategory.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            Manage Drafts
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Review, continue editing, or delete saved drafts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/create")}
          className="self-start md:self-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded cursor-pointer hover:bg-primary/80 transition-all font-semibold text-sm sm:text-base"
        >
          Create New Blog
        </button>
      </div>

      <div className="mb-6 sm:mb-8">
        <input
          type="text"
          placeholder="Search drafts by title, author, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
        />
      </div>

      {loading ? (
        <div className="text-center py-16 md:py-20">
          <p className="text-gray-500 text-lg font-medium">Loading drafts...</p>
        </div>
      ) : filteredDrafts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredDrafts.map((draft) => (
            <div
              key={draft.id}
              className="bg-white rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                {draft.blogTitle || "Untitled Draft"}
              </h3>
              <div className="space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-700">Author:</span>{" "}
                  {draft.authorName || "Not set"}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Category:</span>{" "}
                  {draft.blogCategory || "Not set"}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Type:</span>{" "}
                  {draft.blogType || "Not set"}
                </p>
                {draft.updatedAt && (
                  <p className="text-xs text-gray-500">
                    Updated{" "}
                    {new Date(draft.updatedAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleContinue(draft.id)}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-primary text-white rounded cursor-pointer hover:bg-primary/80 text-xs sm:text-sm font-semibold transition-all"
                >
                  Continue Editing
                </button>
                <button
                  onClick={() => handleDelete(draft.id)}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-red-100 text-red-600 rounded cursor-pointer hover:bg-red-200 text-xs sm:text-sm font-semibold transition-all"
                  disabled={pendingDeleteId === draft.id}
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
            <p className="text-gray-500 text-lg font-medium">
              No drafts saved yet.
            </p>
          </div>
        </div>
      )}

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
