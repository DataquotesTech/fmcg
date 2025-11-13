"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RegisterPage() {
  // Replace these URLs with your actual Google Sheet links
  const registrationLinks = {
    professional: "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_1/edit",
    influencer: "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_2/edit",
    wholesaler: "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_3/edit",
    aspirant: "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_4/edit",
    retailer: "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_5/edit",
  };

  const registrationTypes = [
    {
      label: "Register as Professional",
      href: registrationLinks.professional,
      description: "Join as a professional in the FMCG industry",
    },
    {
      label: "Register as Influencer",
      href: registrationLinks.influencer,
      description: "Connect with brands and grow your influence",
    },
    {
      label: "Register as Wholesaler",
      href: registrationLinks.wholesaler,
      description: "Expand your wholesale business network",
    },
    {
      label: "Register as Aspirant",
      href: registrationLinks.aspirant,
      description: "Start your journey in the FMCG space",
    },
    {
      label: "Register as Retailer",
      href: registrationLinks.retailer,
      description: "Join our retail partner network",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Registration Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 px-6 sm:px-8 lg:px-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 md:mb-20">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Choose Your Registration Type
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Select the category that best describes you and join our community
            </p>
          </div>

          {/* Registration Buttons Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
            {registrationTypes.map((type, index) => (
              <a
                key={index}
                href={type.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl sm:rounded-2xl border-2 border-primary p-6 sm:p-8 md:p-10 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors duration-300 shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-secondary group-hover:text-primary transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 group-hover:text-primary transition-colors text-center">
                    {type.label}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 mt-4">
                  {type.description}
                </p>
                <div className="mt-auto w-full">
                  <div className="bg-primary text-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg group-hover:bg-secondary group-hover:text-primary group-hover:border-2 group-hover:border-primary transition-all duration-300">
                    Register Now
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Back Link */}
          <div className="mt-12 md:mt-16 text-center">
            <Link
              href="/"
              className="inline-block text-primary border-2 border-primary px-10 py-4 font-semibold text-lg hover:bg-primary hover:text-secondary transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
