"use client";

import { useState, useEffect } from "react";
import { getNetworkStats, saveNetworkStats } from "../../data/mockData";

export default function ManageNetwork() {
  const [stats, setStats] = useState({
    blogsHosted: "",
    happyCustomers: "",
    serversRunning: "",
  });

  useEffect(() => {
    const networkStats = getNetworkStats();
    setStats(networkStats);
  }, []);

  const handleChange = (field, value) => {
    setStats({ ...stats, [field]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveNetworkStats(stats);
    alert("Network stats updated successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
          Manage Network
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Update network statistics that appear on the landing page.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Blogs Hosted
              </label>
              <input
                type="text"
                value={stats.blogsHosted}
                onChange={(e) => handleChange("blogsHosted", e.target.value)}
                placeholder="e.g., 15,000+"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Happy Customers
              </label>
              <input
                type="text"
                value={stats.happyCustomers}
                onChange={(e) => handleChange("happyCustomers", e.target.value)}
                placeholder="e.g., 25,000+"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Servers Running
              </label>
              <input
                type="text"
                value={stats.serversRunning}
                onChange={(e) => handleChange("serversRunning", e.target.value)}
                placeholder="e.g., 1,200+"
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Preview */}
      <div className="mt-10 bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-2xl p-10 text-center shadow-lg">
            <p className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wide">
              Blogs Hosted
            </p>
            <p className="text-5xl md:text-6xl font-bold text-gray-900">
              {stats.blogsHosted}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-10 text-center shadow-lg">
            <p className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wide">
              Happy Customers
            </p>
            <p className="text-5xl md:text-6xl font-bold text-gray-900">
              {stats.happyCustomers}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-10 text-center shadow-lg">
            <p className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wide">
              Servers Running
            </p>
            <p className="text-5xl md:text-6xl font-bold text-gray-900">
              {stats.serversRunning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
