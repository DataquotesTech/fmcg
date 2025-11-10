"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-7xl">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              FMCG Influencer.com
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 xl:space-x-12">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-semibold text-base lg:text-lg transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-semibold text-base lg:text-lg transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-semibold text-base lg:text-lg transition-colors"
            >
              Network
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-semibold text-base lg:text-lg transition-colors"
            >
              About
            </a>
            <a
              href="/admin/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md hover:shadow-lg text-base lg:text-lg"
            >
              Register
            </a>
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-6 border-t-2 border-gray-200">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-semibold py-3 transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-semibold py-3 transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-semibold py-3 transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Network
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-semibold py-3 transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/admin/login"
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center shadow-md mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
