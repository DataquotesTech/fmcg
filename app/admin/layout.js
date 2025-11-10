"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/admin/create", label: "Create Blog" },
    { href: "/admin/edit", label: "Edit Blog" },
    { href: "/admin/network", label: "Manage Network" },
    { href: "/admin/trending", label: "Manage Trending" },
    { href: "/admin/featured", label: "Manage Featured" },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Top Dock Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin/create"
                className="text-xl md:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Admin Panel
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side - Logout and Home */}
            <div className="flex items-center gap-3 md:gap-4">
              <Link
                href="/"
                className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                View Site
              </Link>
              <Link
                href="/admin/login"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                Logout
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      pathname === item.href
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  View Site
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
