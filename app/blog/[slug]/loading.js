export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto lg:flex items-start justify-center gap-8 lg:gap-12 xl:gap-16">
          <div className="max-w-4xl flex-1 w-full">
            {/* Breadcrumb skeleton */}
            <div className="mb-8 h-5 w-64 bg-gray-200 rounded animate-pulse"></div>

            {/* Header skeleton */}
            <div className="mb-10 md:mb-12">
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-gray-200 rounded mb-6 md:mb-8 w-full animate-pulse"></div>
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Image skeleton */}
            <div className="mb-10 md:mb-12 rounded-2xl overflow-hidden">
              <div className="w-full h-72 md:h-96 lg:h-[500px] bg-gray-200 animate-pulse"></div>
            </div>

            {/* Content skeleton */}
            <div className="mb-12 md:mb-16 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>

            {/* Back button skeleton */}
            <div className="mt-12 md:mt-16 pt-8 border-t-2 border-gray-200">
              <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/5 lg:min-w-[280px] min-h-[200px] lg:min-h-[400px] bg-gray-100 rounded p-2 sm:p-4 relative lg:sticky lg:top-24 mt-8 lg:mt-0 animate-pulse">
            <div className="absolute top-0 right-0 bg-gray-200 px-2 sm:px-3 rounded-tr">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

