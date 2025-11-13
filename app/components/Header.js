"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50  flex items-center justify-center border-b-2 border-primary bg-secondary">
      <div className="w-full ">
        <div className="flex items-center justify-between h-15">
          {/* Logo */}
          <div className="flex border-r-2 h-full items-center justify-center px-6 hover:bg-primary hover:text-secondary transition-all duration-300">
            <div className="shrink-0  px-2 py-2 rounded-2xl">
              <Link href="/" className="text-xl sm:text-3xl font-bold py-10">
               <Image width={300}                 // required
        height={200}                 src="/fmcg-removebg-preview.png" alt="" className="w-23 pt-2"/>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center  text-secondary  h-full relative left-2">
            <div className="flex items-center  text-primary h-full bg-primary border-primary">
              <a
                href="#"
                className="font-semibold text-base lg:text-lg px-6 bg-secondary  hover:bg-primary hover:text-secondary transition-all duration-300 h-full border-x-2 flex items-center justify-self-center"
              >
                <span>Blog</span>
              </a>
              <a
                href="#"
                className="font-semibold text-base lg:text-lg px-6 bg-secondary  hover:bg-primary hover:text-secondary transition-all duration-300 h-full border-r-2 flex items-center justify-self-center"
              >
                <span>Services</span>
              </a>
              <a
                href="#"
                className="font-semibold text-base lg:text-lg px-6 bg-secondary  hover:bg-primary hover:text-secondary transition-all duration-300 h-full border-r-2 flex items-center justify-self-center"
              >
                <span>Network</span>
              </a>
              <a
                href="#"
                className="font-semibold text-base lg:text-lg px-6 bg-secondary  hover:bg-primary hover:text-secondary transition-all duration-300 h-full border-r-2 flex items-center justify-self-center"
              >
                <span>About</span>
              </a>
            </div>
            <div className="flex items-center  h-full bg-primary border-primary border-2 ">
              <a
                href="/register"
                className="font-semibold text-base lg:text-lg px-14 bg-primary  hover:bg-primary hover:text-secondary transition-all duration-300 h-full border-r-2 flex items-center justify-self-center"
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
                href="/register"
                className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center  mt-2"
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
