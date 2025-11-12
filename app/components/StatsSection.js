"use client";

import { useState, useEffect } from "react";
import { getNetworkStats } from "../data/mockData";

export default function StatsSection() {
  const [stats, setStats] = useState({
    blogsHosted: "15,000+",
    happyCustomers: "25,000+",
    serversRunning: "1,200+",
  });

  useEffect(() => {
    const loadNetworkStats = async () => {
      try {
        const networkStats = await getNetworkStats();
        if (networkStats) {
          setStats(networkStats);
        }
      } catch (error) {
        console.error("Error loading network stats:", error);
        // Keep default stats if loading fails
      }
    };
    loadNetworkStats();
  }, []);

  const statsArray = [
    {
      label: "Blogs Hosted",
      value: stats.blogsHosted,
    },
    {
      label: "Happy Customers",
      value: stats.happyCustomers,
    },
    {
      label: "Servers Running",
      value: stats.serversRunning,
    },
  ];

  return (
    <section className="w-full py-20 md:py-24 lg:py-28 bg-neutral-800  px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl flex items-center justify-self-center flex-col gap-5">
        <h2 className="text-5xl font-semibold text-secondary pb-6">Our Network</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {statsArray.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-12 md:p-14 lg:p-16 transition-all duration-300 border border-gray-100 text-center"
            >
              <p className="text-base md:text-lg font-semibold text-gray-600 mb-8 md:mb-10 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-5xl md:text-6xl  font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
