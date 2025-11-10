"use client";

export default function CategoryNav({ activeCategory, onCategoryChange }) {
  const categories = [
    "Promotional Blogs",
    "Distribution Blogs",
    "Wholesaler Blogs",
    "Retailer Blogs",
  ];

  return (
    <div className="w-full bg-white border-b-2 border-gray-200 py-8 sticky top-16 md:top-20 z-40 bg-opacity-95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-wrap gap-4 md:gap-5 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-7 py-3.5 rounded-full text-base md:text-lg font-bold transition-all duration-200 whitespace-nowrap ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
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
