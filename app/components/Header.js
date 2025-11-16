"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scrolling Offer Text */}
      <div className="w-full bg-blue-950/90 text-secondary py-1 overflow-hidden relative">
        <div className="flex animate-scroll whitespace-nowrap items-center">
          <span className="font-semibold text-xs mx-8">
            🎉 Special Offer: Register now and get exclusive access to premium
            content!
          </span>
          <span className="font-semibold text-xs  se mx-8">
            🎉 Special Offer: Register now and get exclusive access to premium
            content!
          </span>
          <span className="font-semibold text-xs  mx-8">
            🎉 Special Offer: Register now and get exclusive access to premium
            content!
          </span>
          <span className="font-semibold text-xs  mx-8">
            🎉 Special Offer: Register now and get exclusive access to premium
            content!
          </span>
          <span className="font-semibold text-xs  mx-8">
            🎉 Special Offer: Register now and get exclusive access to premium
            content!
          </span>
        </div>
      </div>
      <header className="w-full sticky top-0 z-50  flex items-center justify-center border-b border-primary/10 bg-white">
        <div className="w-full ">
          <div className="flex items-center justify-between h-15">
            {/* Logo */}
            <div className="flex h-full items-center justify-center px-3 sm:px-4 md:px-6 hover:text-secondary transition-all duration-300">
              <div className="shrink-0 px-1 sm:px-2 py-1 sm:py-2 rounded-2xl">
                <Link href="/" className="text-xl sm:text-3xl font-bold">
                  <Image
                    width={300}
                    height={200}
                    src="/fmcg-removebg-preview.png"
                    alt="FMCG Logo"
                    className="w-16 sm:w-19 md:w-22 lg:w-24 h-auto pt-1 sm:pt-2"
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center text-secondary h-full relative left-1 md:left-2">
              <div className="flex items-center text-primary h-full">
                <a
                  href="#blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("blogs");
                  }}
                  className="font-semibold text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6 hover:underline hover:text-black transition-all duration-300 h-full flex items-center justify-self-center cursor-pointer"
                >
                  <span>Blog</span>
                </a>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("services");
                  }}
                  className="font-semibold text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6 hover:underline hover:text-black transition-all duration-300 h-full flex items-center justify-self-center cursor-pointer"
                >
                  <span>Services</span>
                </a>
                <a
                  href="#network"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("network");
                  }}
                  className="font-semibold text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6 hover:underline hover:text-black transition-all duration-300 h-full flex items-center justify-self-center cursor-pointer"
                >
                  <span>Network</span>
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                  className="font-semibold text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6 hover:underline hover:text-black transition-all duration-300 h-full flex items-center justify-self-center cursor-pointer"
                >
                  <span>About</span>
                </a>
              </div>
              <div className="flex items-center h-full bg-primary border-primary border-2">
                <a
                  href="/register"
                  className="font-semibold text-sm md:text-base lg:text-lg px-6 md:px-10 lg:px-14 bg-primary hover:bg-primary hover:text-secondary transition-all duration-300 h-full border-r-2 flex items-center justify-self-center"
                >
                  Register
                </a>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Full-Screen Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-white">
              {/* Close Button - Top Right */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col h-full px-6 py-20">
                {/* Logo */}
                <div className="mb-12 flex justify-center">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold"
                  >
                    <Image
                      width={200}
                      height={150}
                      src="/fmcg-removebg-preview.png"
                      alt="FMCG Logo"
                      className="w-32 h-auto"
                    />
                  </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col justify-center space-y-6">
                  <a
                    href="#blogs"
                    className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("blogs");
                    }}
                  >
                    Blog
                  </a>
                  <a
                    href="#services"
                    className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("services");
                    }}
                  >
                    Services
                  </a>
                  <a
                    href="#network"
                    className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("network");
                    }}
                  >
                    Network
                  </a>
                  <a
                    href="#about"
                    className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors py-3 border-b-2 border-transparent hover:border-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about");
                    }}
                  >
                    About
                  </a>
                </nav>

                {/* Register Button */}
                <div className="mb-8">
                  <a
                    href="/register"
                    className="block w-full bg-primary text-secondary px-6 py-4 rounded-xl hover:bg-primary/90 transition-colors font-bold text-lg text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </a>
                </div>

                {/* Social Links */}
                <div className="border-t-2 border-gray-200 pt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
                    Follow Us
                  </h3>
                  <div className="flex justify-center space-x-6">
                    {/* Twitter */}
                    <a
                      href="#"
                      className="w-14 h-14 flex items-center justify-center text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-all"
                      aria-label="Twitter"
                    >
                      <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a
                      href="#"
                      className="w-14 h-14 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                      aria-label="Facebook"
                    >
                      <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    {/* Instagram */}
                    <a
                      href="#"
                      className="w-14 h-14 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.467.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href="#"
                      className="w-14 h-14 flex items-center justify-center text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
