export default function BlogCard({
  image,
  title,
  description,
  featured = false,
  trending = false,
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group h-full flex flex-col">
      {image && (
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
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
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors flex-1">
          {title}
        </h3>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}
