"use client";

import { useState, useEffect } from "react";
import { getNetworkStats } from "../data/mockData";

export default function StatsSection() {
  const [stats, setStats] = useState({
    professional: "0",
    retailers: "0",
    wholesalers: "0",
    distributors: "0",
    aspirants: "0",
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
      label: "Professional",
      value: stats.professional,
    },
    {
      label: "Retailers",
      value: stats.retailers,
    },
    {
      label: "Wholesalers",
      value: stats.wholesalers,
    },
    {
      label: "Distributors",
      value: stats.distributors,
    },
    {
      label: "Aspirants",
      value: stats.aspirants,
    },
  ];

  return (
    <section
      id="network"
      className="w-full py-20 md:py-24 lg:py-28 bg-neutral-800  px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-self-center flex-col gap-4 sm:gap-5">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary pb-4 sm:pb-6 text-center">
          Our Network
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 w-full">
          {statsArray.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-300 border border-gray-100 text-center"
            >
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-600 pb-6 sm:pb-8 md:pb-10 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
