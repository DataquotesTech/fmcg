"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Try Supabase Auth first
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        // Fallback to hardcoded credentials for backward compatibility
        if (email === "FMCG@gmail.com" && password === "123456") {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("isAuthenticated", "true");
            sessionStorage.setItem("adminEmail", email);
          }
          router.push("/admin/create");
          return;
        }
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      // Check if user is an admin
      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", authData.user.id)
        .eq("is_active", true)
        .single();

      if (adminError || !adminUser) {
        // If not in admin_users table, still allow if using hardcoded credentials
        if (email === "FMCG@gmail.com" && password === "123456") {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("isAuthenticated", "true");
            sessionStorage.setItem("adminEmail", email);
          }
          await supabase.auth.signOut();
          router.push("/admin/create");
          return;
        }
        await supabase.auth.signOut();
        setError("You don't have admin access.");
        setLoading(false);
        return;
      }

      // Store authentication in sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("adminEmail", email);
        sessionStorage.setItem("adminId", authData.user.id);
      }

      // Redirect to admin panel on successful login
      router.push("/admin/create");
    } catch (err) {
      console.error("Login error:", err);
      // Fallback to hardcoded credentials
      if (email === "FMCG@gmail.com" && password === "123456") {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("isAuthenticated", "true");
          sessionStorage.setItem("adminEmail", email);
        }
        router.push("/admin/create");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-screen">
      <div className="w-full max-w-2xl border-2 border-primary p-6 sm:p-8 md:p-10 lg:p-12">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
          Admin Login
        </h1>
        <p className="text-gray-600 text-center text-sm sm:text-base mb-8 sm:mb-10">
          Welcome back, please enter your details.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-semibold text-center">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 mb-3"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700 mb-3"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <svg
                  className={`h-5 w-5 ${
                    showPassword ? "text-gray-600" : "text-gray-400"
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {showPassword ? (
                    <>
                      <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </>
                  ) : (
                    <>
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Forgot Password
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Forgot your password?
            </a>
          </div> */}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-secondary py-4 rounded-xl hover:bg-primary/70 cursor-pointer hover:text-secondary transition-all font-bold text-base md:text-lg  transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-xs md:text-sm mt-8">
          © 2026 FMCG Influencer. All Rights Reserved.
        </p>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm md:text-base text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
