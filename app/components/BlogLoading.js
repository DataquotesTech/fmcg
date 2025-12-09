export default function BlogLoading() {
  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skeleton for featured/trending section */}
        <div className="mb-20 md:mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded overflow-hidden border-2 border-gray-200 animate-pulse"
              >
                <div className="w-full h-64 md:h-80 lg:h-80 bg-gray-200"></div>
                <div className="p-8 md:p-10">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-5"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton for blog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded overflow-hidden border-2 border-gray-200 animate-pulse h-full flex flex-col"
            >
              <div className="w-full h-64 sm:h-72 bg-gray-200"></div>
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="h-4 w-24 bg-gray-200 rounded mb-5"></div>
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4 flex-1"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

