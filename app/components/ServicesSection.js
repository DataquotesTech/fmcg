"use client";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Brand Promotion & Visibility",
      tagline: "Reach the right audience with the right message.",
      description:
        "Promote your brand through targeted campaigns, engaging content, and industry-specific outreach to maximize visibility and engagement.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Channel Partner Scouting",
      tagline: "Connect with the right partners for growth.",
      description:
        "Identify, evaluate, and engage verified distributors, wholesalers, and retailers to expand your market presence effectively.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Sales Development Consulting",
      tagline: "Strategies to accelerate growth.",
      description:
        "Expert guidance to optimize sales execution, field operations, and market performance for sustainable business growth.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Legal & Advisory Consultation",
      tagline: "Safeguard your business with expert advice.",
      description:
        "Receive professional guidance on contracts, agreements, regulatory compliance, and legal matters to protect and grow your business.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Mentorship & Career Guidance",
      tagline: "Unlock your professional potential.",
      description:
        "Structured mentorship and strategic consulting for aspirants and professionals to build skills, networks, and confidence.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"
          />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Guest Lectures & Corporate Sessions",
      tagline: "Learn from industry leaders.",
      description:
        "High-impact knowledge-sharing sessions for colleges, corporate teams, and forums to inspire learning, growth, and development.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-neutral-800">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary text-center mb-8 sm:mb-12 md:mb-16">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-6 sm:p-8 md:p-10 transition-all duration-300 border border-gray-200 hover:border-primary group"
            >
              <div className="text-primary mb-4 sm:mb-6  transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                {service.title}
              </h3>
              {service.tagline && (
                <p className="text-primary font-semibold text-sm sm:text-base mb-3 sm:mb-4">
                  {service.tagline}
                </p>
              )}
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
