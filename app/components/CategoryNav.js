"use client";

import { blogCategories } from "../data/mockData";

export default function CategoryNav({ activeCategory, onCategoryChange }) {
  const categories = blogCategories;

  return (
    <div className="w-full py-4 sm:py-6 md:py-15 z-40 px-2 sm:px-4">
      <div className="container mx-auto max-w-7xl border-2 border-primary">
        <div className="flex flex-wrap overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3 h-full text-xs sm:text-sm md:text-sm xl:text-md 2xl:text-lg font-bold transition-all duration-200 whitespace-nowrap flex-1 min-w-[120px] sm:min-w-[140px] ${
                activeCategory === category
                  ? "bg-primary text-white scale-105"
                  : "bg-gray-50 text-gray-600 hover:bg-primary/20 hover:text-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
