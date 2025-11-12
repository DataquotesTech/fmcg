export default function BlogCard({
  image,
  title,
  description,
  featured = false,
  trending = false,
}) {
  return (
    <div className="bg-white rounded overflow-hidden transition-all duration-300 border-2 border-primary group h-full flex flex-col relative">
      {/* Northeast Arrow - Top Right */}
      <div className="absolute top-4 right-4 z-20 bg-primary p-3 rounded-full ">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400  transition-colors group-hover:text-secondary"
        >
          <path
            d="M5 19L19 5M19 5H13M19 5V11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {image && (
        <div className="relative w-full h-64 sm:h-72 overflow-hidden">
          <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-500">
            {image}
          </div>
        </div>
      )}
      <div className="p-8 md:p-10 flex-1 flex flex-col">
        {featured && (
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-4 py-2 rounded-full mb-5 w-fit tracking-wide uppercase">
            Featured
          </span>
        )}
        {trending && (
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-5 w-fit tracking-wide uppercase">
            Trending
          </span>
        )}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight  transition-colors flex-1">
          {title}
        </h3>
        <p className="text-gray-600 text-xs md:text-lg leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
