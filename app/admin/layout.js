"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show admin header on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin/create", label: "Create Blog" },
    { href: "/admin/edit", label: "Edit Blog" },
    { href: "/admin/network", label: "Manage Network" },
    { href: "/admin/trending", label: "Manage Trending" },
    { href: "/admin/featured", label: "Manage Featured" },
  ];

  return (
    <div className="min-h-screen">
      {/* Admin Header - Matching main Header style */}
      <header className="w-full sticky top-0 z-50 flex items-center justify-center border-b-2 border-primary bg-secondary">
        <div className="w-full">
          <div className="flex items-center justify-between h-15">
            {/* Logo */}
            <div className="flex border-r-2 h-full items-center justify-center px-6 hover:bg-primary hover:text-secondary transition-all duration-300">
              <div className="shrink-0 px-2 py-2 rounded-2xl">
                <Link
                  href="/admin/create"
                  className="text-xl sm:text-3xl font-bold py-10"
                >
                  Admin Panel
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center text-secondary h-full relative left-2">
              <div className="flex items-center text-primary h-full bg-primary border-primary">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-semibold text-base lg:text-lg px-6 transition-all duration-300 h-full flex items-center justify-self-center ${
                      index === 0 ? "border-x-2" : "border-r-2"
                    } ${
                      pathname === item.href
                        ? "bg-primary text-secondary"
                        : "bg-secondary hover:bg-primary hover:text-secondary"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="flex items-center h-full bg-primary border-primary border-2">
                <Link
                  href="/"
                  className="font-semibold text-base lg:text-lg px-14 bg-primary hover:bg-primary hover:text-secondary transition-all duration-300 h-full border-r-2 flex items-center justify-self-center"
                >
                  View Site
                </Link>
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

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-6 border-t-2 border-gray-200">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-semibold py-3 transition-colors text-base ${
                      pathname === item.href
                        ? "text-primary bg-secondary"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900 font-semibold py-3 transition-colors text-base"
                >
                  View Site
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
