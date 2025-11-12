import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-2 border-gray-200 mt-20 md:mt-28 lg:mt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {/* Left Column - FMCG Influencer */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
              FMCG Influencer
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-sm">
              Inspiration and insights for creators, thinkers, and innovators.
            </p>
          </div>

          {/* Middle Column - Quick Links & Legal */}
          <div className="space-y-8 md:space-y-10">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors"
                  >
                    All Posts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-5">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Follow Us */}
          <div className="flex flex-col justify-between">
            <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-5">
              Follow Us
            </h3>
            <div className="flex space-x-4 md:space-x-5">
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </a>
            </div>
            </div>

            <div>
            <Link
                href="/admin/login"
                className="w-full font-semibold text-sm underline text-secondary hover:text-primary"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t-2 border-gray-200 text-center">
          <p className="text-gray-600 text-sm md:text-base">
            © 2023 FMCG Influencer. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
