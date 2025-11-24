"use client";

import { useState, useEffect } from "react";
import { getNetworkStats, saveNetworkStats } from "../../data/mockData";
import Toast from "../../components/Toast";

export default function ManageNetwork() {
  const [stats, setStats] = useState({
    professional: "",
    retailers: "",
    wholesalers: "",
    distributors: "",
    aspirants: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadNetworkStats = async () => {
      try {
        const networkStats = await getNetworkStats();
        setStats(networkStats);
      } catch (error) {
        console.error("Error loading network stats:", error);
      }
    };
    loadNetworkStats();
  }, []);

  const handleChange = (field, value) => {
    setStats({ ...stats, [field]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveNetworkStats(stats);
      setToast({
        title: "Success",
        message: "Network stats updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving network stats:", error);
      setToast({
        title: "Error",
        message:
          error.message || "An error occurred while saving. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
          Manage Network
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Update network statistics that appear on the landing page.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 sm:space-y-8">
        <div className="bg-white rounded p-4 sm:p-6 border-2 border-primary">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Professional
              </label>
              <input
                type="text"
                value={stats.professional}
                onChange={(e) => handleChange("professional", e.target.value)}
                placeholder="e.g., 1,500"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Engagements
              </label>
              <input
                type="text"
                value={stats.retailers}
                onChange={(e) => handleChange("retailers", e.target.value)}
                placeholder="e.g., 2,000"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Trade Partners
              </label>
              <input
                type="text"
                value={stats.wholesalers}
                onChange={(e) => handleChange("wholesalers", e.target.value)}
                placeholder="e.g., 1,200"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Distributors
              </label>
              <input
                type="text"
                value={stats.distributors}
                onChange={(e) => handleChange("distributors", e.target.value)}
                placeholder="e.g., 800"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Aspirants
              </label>
              <input
                type="text"
                value={stats.aspirants}
                onChange={(e) => handleChange("aspirants", e.target.value)}
                placeholder="e.g., 3,500"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white rounded hover:bg-primary/70 transition-all font-semibold text-sm sm:text-base transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Preview */}
      <div className="mt-8 sm:mt-10 rounded p-4 sm:p-6 border border-primary bg-primary px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-secondary pb-2 sm:pb-3">
          Preview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-4 sm:mb-6 uppercase tracking-wide">
              Professional
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">
              {stats.professional}
            </p>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-4 sm:mb-6 uppercase tracking-wide">
              Engagements
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">
              {stats.retailers}
            </p>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-4 sm:mb-6 uppercase tracking-wide">
              Trade Partners
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">
              {stats.wholesalers}
            </p>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-4 sm:mb-6 uppercase tracking-wide">
              Distributors
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">
              {stats.distributors}
            </p>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-4 sm:mb-6 uppercase tracking-wide">
              Aspirants
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">
              {stats.aspirants}
            </p>
          </div>
        </div>
      </div>

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
