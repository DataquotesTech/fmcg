"use client";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "Tech Influencer",
      content:
        "This platform has transformed how I create and share content. The tools and community support are incredible!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Digital Marketer",
      company: "Marketing Pro",
      content:
        "The analytics and insights provided here have helped me grow my audience by 300% in just 3 months.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Brand Strategist",
      company: "Brand Builders",
      content:
        "Best platform for influencers looking to build a strong brand presence. Highly recommend!",
      rating: 5,
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Social Media Manager",
      company: "Social Experts",
      content:
        "The community here is amazing and the resources are top-notch. This is a game-changer for content creators.",
      rating: 5,
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Influencer",
      company: "Lifestyle Blog",
      content:
        "I've tried many platforms, but this one stands out. The support team is responsive and the features are exactly what I needed.",
      rating: 5,
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Content Strategist",
      company: "Creative Agency",
      content:
        "Outstanding platform with excellent tools for content creation and audience engagement. Worth every penny!",
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 md:mb-16">
          What Our Users Say
        </h2>
        <div className="relative">
          <div className="flex animate-scroll-testimonials whitespace-nowrap items-stretch">
            {/* First set of testimonials */}
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="inline-block align-top w-[85vw] sm:w-[360px] md:w-[440px] lg:w-[480px] mx-4 bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 text-wrap">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <p className="font-semibold text-gray-900 text-base md:text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial) => (
              <div
                key={`duplicate-${testimonial.id}`}
                className="inline-block align-top w-[85vw] sm:w-[360px] md:w-[440px] lg:w-[480px] mx-4 bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 text-wrap">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <p className="font-semibold text-gray-900 text-base md:text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
            {/* Third set for seamless loop */}
            {testimonials.map((testimonial) => (
              <div
                key={`triplicate-${testimonial.id}`}
                className="inline-block align-top w-[85vw] sm:w-[360px] md:w-[440px] lg:w-[480px] mx-4 bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 text-wrap">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <p className="font-semibold text-gray-900 text-base md:text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
