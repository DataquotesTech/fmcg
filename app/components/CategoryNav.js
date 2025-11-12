"use client";

import { blogCategories } from "../data/mockData";

export default function CategoryNav({ activeCategory, onCategoryChange }) {
  const categories = blogCategories;

  return (
    <div className="w-full py-8 z-40 ">
      <div className="container mx-auto max-w-7xl border-2 border-primary">
        <div className="flex flex-wrap overflow-x-auto  scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-7 py-3 h-full text-base md:text-lg font-bold transition-all duration-200 whitespace-nowrap flex-1 ${
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
